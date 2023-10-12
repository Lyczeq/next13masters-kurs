import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListItemCoverImage } from "@/components/atoms/ProductListItemCoverImage";
import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductGetByIdDocument,
	ProductsGetRelatedProductsByCategoryDocument,
	ReviewAddReviewDocument,
	ReviewsGetListByProductIdDocument,
} from "@/gql/graphql";
import { AddToCartButton } from "@/components/atoms/AddToCartButton";
import { ProductListItem } from "@/components/molecules/ProductListItem";
import { addToCart, getOrCreateCart } from "@/api/cart";
import { revalidateTag } from "next/cache";
import { InputHTMLAttributes } from "react";
type Params = {
	params: {
		productId: string;
	};
};

type Props = Params;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: params.productId },
	});

	return {
		title: product?.name,
		description: product?.description,
	};
}

type P = {
	category: string;
};

async function RelatedProducts({ category }: P) {
	const { products } = await executeGraphql({
		query: ProductsGetRelatedProductsByCategoryDocument,
		variables: {
			categoryName: category,
		},
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

type ProductReviewsProps = {
	productId: string;
};

async function ProductReviews({ productId }: ProductReviewsProps) {
	const { reviews } = await executeGraphql({
		query: ReviewsGetListByProductIdDocument,
		variables: {
			productId,
		},
		next: { tags: ["reviews"] },
	});

	return (
		<ul className="flex flex-col gap-2">
			{reviews.map(({ content, email, headline, id, name, rating }) => {
				return (
					<li key={id}>
						<p>Email {email}</p>
						<p>Name {name}</p>
						<p>Headline {headline}</p>
						<p>Content {content}</p>
						<p>Rating {rating}</p>
					</li>
				);
			})}
		</ul>
	);
}

export default async function SingleProductPage({ params }: Props) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: params.productId },
	});

	if (!product) {
		throw notFound();
	}

	async function addToCartAction() {
		"use server";
		const cart = await getOrCreateCart();
		await addToCart(cart, params.productId);
		revalidateTag("cart");
	}

	async function addReviewAction(formData: FormData) {
		"use server";
		console.dir(formData, 999);
		const headline = formData.get("headline")?.toString();
		const content = formData.get("content")?.toString();
		const rating = Number(formData.get("rating"));
		const name = formData.get("name")?.toString();
		const email = formData.get("email")?.toString();

		if (!headline || !content || !rating || !name || !email) {
			return;
		}

		await executeGraphql({
			query: ReviewAddReviewDocument,
			variables: {
				content,
				email,
				headline,
				name,
				productId: params.productId,
				rating,
			},
		});
		revalidateTag("reviews");
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
			<ProductReviews productId={params.productId} />
			<div className="mb-20 flex flex-col gap-1">
				<h3 className="text-center">Left your review!</h3>
				<form
					action={addReviewAction}
					data-testid="add-review-form"
					className="flex w-1/2 flex-col gap-2 self-center"
				>
					<Input type="text" name="headline" required placeholder="Healine" />
					<Input type="text" name="content" required placeholder="Content" />
					<Input type="number" name="rating" required placeholder="Rating" />
					<Input type="text" name="name" required placeholder="Name" />
					<Input type="text" name="email" required placeholder="Email" />
					<button className="rounded-xl border bg-blue-400 py-3" type="submit">
						Submit review
					</button>
				</form>
			</div>
		</div>
	);
}

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return <input className="border border-blue-300 px-1 py-2" {...props} />;
};
