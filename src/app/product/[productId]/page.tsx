import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListItemCoverImage } from "@/components/atoms/ProductListItemCoverImage";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductGetByIdDocument } from "@/gql/graphql";

type Params = {
	params: {
		productId: string;
	};
};

type Props = Params;

// export async function generateStaticParams() {
// 	const url = `https://naszsklep-api.vercel.app/api/products`;
// 	const response = await fetch(url);
// 	const products = (await response.json()) as Product[];
// 	return products.map((product) => product.id);
// }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: params.productId });

	return {
		title: product?.name,
		description: product?.description,
	};
}

export default async function SingleProductPage({ params }: Props) {
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: params.productId });

	if (!product) {
		throw notFound();
	}

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="flex justify-center bg-slate-300 p-4">
					{product.images[0] && (
						<ProductListItemCoverImage src={product.images[0].url} alt={product.name} />
					)}
				</div>
				<div className="flex flex-col gap-4">
					<h1>{product.name}</h1>
					{product.categories[0] && <p>{product.categories[0].name}</p>}
					<p>{product.description}</p>
				</div>
			</div>
		</div>
	);
}
