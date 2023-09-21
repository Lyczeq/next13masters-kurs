import { type Product } from "@/types";
import { ProductsList } from "@/components/organisms/ProductsList";

type Params = {
	params: {
		pageNumber: string;
	};
};

type Props = Params;

// export async function generateStaticParams({ params }: Params) {}

async function getAllProducts() {
	// const offset = 10 * Number(pageNumber || 1);

	// const url = `https://naszsklep-api.vercel.app/api/products?take=10&offset=${offset}`;

	const url = "https://naszsklep-api.vercel.app/api/products?take=20";
	const response = await fetch(url);
	return response.json() as Promise<Product[]>;
}

export default async function Products({}: Props) {
	const products = await getAllProducts();
	console.log(products.length);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12">
			<ProductsList products={products} />
		</main>
	);
}
