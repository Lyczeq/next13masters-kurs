import { type Product } from "@/types";
import { ProductsList } from "@/components/organisms/ProductsList";

async function getAllProducts() {
	const url = "https://naszsklep-api.vercel.app/api/products?take=20";
	const response = await fetch(url);
	return response.json() as Promise<Product[]>;
}

export default async function Products() {
	const products = await getAllProducts();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12">
			<ProductsList products={products} />
		</main>
	);
}
