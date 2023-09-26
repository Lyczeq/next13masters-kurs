import { type Metadata } from "next";
import { ProductListItemCoverImage } from "@/components/atoms/ProductListItemCoverImage";
import { type Product } from "@/types";

type Params = {
	params: {
		productId: string;
	};
};

type Props = Params;

export async function generateStaticParams() {
	const url = `https://naszsklep-api.vercel.app/api/products`;
	const response = await fetch(url);
	const products = (await response.json()) as Product[];
	return products.map((product) => product.id);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const product = await getSingleProduct(params.productId);

	return {
		title: product.title,
		description: product.description,
	};
}

async function getSingleProduct(productId: string) {
	const url = `https://naszsklep-api.vercel.app/api/products/${productId}`;

	const response = await fetch(url);
	return response.json() as Promise<Product>;
}

export default async function SingleProductPage({ params }: Props) {
	const product = await getSingleProduct(params.productId);

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="flex justify-center bg-slate-300 p-4">
					<ProductListItemCoverImage src={product.image} alt={product.title} />
				</div>
				<div className="flex flex-col gap-4">
					<h1>{product.title}</h1>
					<p>{product.category}</p>
					<p>{product.description}</p>
				</div>
			</div>
		</div>
	);
}
