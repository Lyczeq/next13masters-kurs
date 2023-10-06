import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ProductListItemCoverImage } from "@/components/atoms/ProductListItemCoverImage";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartCreateFragment,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	ProductsGetListDocument,
	ProductsGetRelatedProductsByCategoryDocument,
} from "@/gql/graphql";
import { AddToCartButton } from "@/components/atoms/AddToCartButton";
import { ProductListItem } from "@/components/molecules/ProductListItem";
type Params = {
	params: {
		productId: string;
	};
};

type Props = Params;

export async function generateStaticParams() {
	const a = await executeGraphql(ProductsGetListDocument, {});
	return a.products.map((product) => product.id);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: params.productId });

	return {
		title: product?.name,
		description: product?.description,
	};
}

type P = {
	category: string;
};

async function RelatedProducts({ category }: P) {
	const { products } = await executeGraphql(ProductsGetRelatedProductsByCategoryDocument, {
		categoryName: category,
	});

	return (
		<ul
			className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
			data-testid="related-products"
		>
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
}

export default async function SingleProductPage({ params }: Props) {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: params.productId });

	if (!product) {
		throw notFound();
	}

	async function addToCartAction() {
		"use server";

		const cart = await getOrCreateCart();
		cookies().set("cartId", cart.id);
		await addToCart(cart.id, params.productId);
	}

	return (
		<div className="flex flex-col gap-20">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="flex justify-center bg-slate-300 p-4">
					{product.images[0] && (
						<ProductListItemCoverImage src={product.images[0].url} alt={product.name} />
					)}
				</div>
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold">{product.name}</h1>
					{product.categories[0] && <p>{product.categories[0].name}</p>}
					<p>{product.description}</p>

					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
				</div>
			</div>
			{product.categories[0] && (
				<div className="flex flex-col gap-6">
					<h2 className="text-xl font-semibold">Related products</h2>
					<RelatedProducts category={product.categories[0].name} />
				</div>
			)}
		</div>
	);
}
async function getOrCreateCart(): Promise<CartCreateFragment> {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await getCartById(cartId);
		if (cart.order) {
			return cart.order;
		}
	}
	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Failed to create order!");
	}
	return cart.createOrder;
}
function getCartById(cartId: string) {
	return executeGraphql(CartGetByIdDocument, {
		id: cartId,
	});
}
function createCart() {
	return executeGraphql(CartCreateDocument);
}
async function addToCart(orderId: string, productId: string) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});
	if (!product) {
		throw new Error("Product not found");
	}

	await executeGraphql(CartAddProductDocument, {
		orderId,
		productId,
		total: product.price,
	});
}
