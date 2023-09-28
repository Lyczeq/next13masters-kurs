import { ProductsList } from "@/components/organisms/ProductsList";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListDocument } from "@/gql/graphql";

// const TAKE = 10;

// export async function generateStaticParams() {
// 	const url = `https://naszsklep-api.vercel.app/api/products`;
// 	const response = await fetch(url);
// 	const products = (await response.json()) as Product[];
// 	const productsCount = products.length;
// 	const pagesCount = Math.ceil(productsCount / TAKE);
// 	return [...Array(pagesCount).keys()].map((number) => ({ pageNumber: number.toString() }));
// }

export default async function Products() {
	const { products } = await executeGraphql(ProductsGetListDocument);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			<ProductsList products={products} />
		</main>
	);
}
