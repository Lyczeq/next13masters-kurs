import { type Product } from "@/types";
import { ProductsList } from "@/components/organisms/ProductsList";

type Params = {
	params: {
		pageNumber: string;
		pagesCount: number;
	};
};

type Props = Params;

const TAKE = 10;

export async function generateStaticParams() {
	const url = `https://naszsklep-api.vercel.app/api/products`;
	const response = await fetch(url);
	const products = (await response.json()) as Product[];
	const productsCount = products.length;
	const pagesCount = Math.ceil(productsCount / TAKE);
	return [...Array(pagesCount).keys()].map((number) => ({ pageNumber: number.toString() }));
}

async function getAllProducts(pageNumber: string) {
	const offset = 10 * Number(pageNumber || 1);

	const url = `https://naszsklep-api.vercel.app/api/products?take=10&offset=${offset}`;

	const response = await fetch(url);
	return response.json() as Promise<Product[]>;
}

export default async function Products({ params }: Props) {
	const products = await getAllProducts(params.pageNumber);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			<ProductsList products={products} />
		</main>
	);
}
