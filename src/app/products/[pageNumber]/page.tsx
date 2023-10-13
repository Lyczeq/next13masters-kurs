import { ProductsList } from "@/components/organisms/ProductsList";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListDocument } from "@/gql/graphql";
import { PRODUCTS_COUNT_PER_PAGE } from "@/constants";
import { calculateSkipValue } from "@/utils/pagination";

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
	const skip = calculateSkipValue(params.pageNumber);
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			first: PRODUCTS_COUNT_PER_PAGE,
			skip,
			rating: 0,
		},
		next: {
			tags: ["products"],
		},
	});

	// const sortedProducts = products.sort((a, b) => a.price - b.price);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			<ProductsList products={products} />
		</main>
	);
}
