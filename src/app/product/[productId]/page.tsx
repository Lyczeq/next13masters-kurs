import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListItemCoverImage } from "@/components/atoms/ProductListItemCoverImage";
import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductGetByIdDocument,
	ProductsGetListDocument,
	ProductsGetRelatedProductsByCategoryDocument,
} from "@/gql/graphql";
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
