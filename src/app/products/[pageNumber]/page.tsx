import { ProductsList } from "@/components/organisms/ProductsList";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListDocument } from "@/gql/graphql";
import { PRODUCTS_COUNT_PER_PAGE } from "@/constants";
import { calculateSkipValue } from "@/utils/pagination";

// export async function generateStaticParams() {
// 	const url = `https://naszsklep-api.vercel.app/api/products`;
// 	const response = await fetch(url);
// 	const products = (await response.json()) as Product[];
// 	const productsCount = products.length;
// 	const pagesCount = Math.ceil(productsCount / TAKE);
// 	return [...Array(pagesCount).keys()].map((number) => ({ pageNumber: number.toString() }));
// }

type Params = {
	params: {
		pageNumber: string;
	};
	searchParams: {
		price?: string;
	};
};

type Props = Params;

export default async function Products({ params, searchParams }: Props) {
	console.log(searchParams.price);

	const skip = calculateSkipValue(params.pageNumber);
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			first: PRODUCTS_COUNT_PER_PAGE,
			skip,
			price: Number(searchParams.price) || Number.MAX_SAFE_INTEGER,
		},
		next: {
			tags: ["products"],
		},
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			<ProductsList products={products} />
		</main>
	);
}
