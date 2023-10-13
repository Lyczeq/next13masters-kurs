import { ProductsList } from "@/components/organisms/ProductsList";
import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductListItemFragment,
	ProductOrderByInput,
	ProductsGetListDocument,
	ProductsSortByReviewsRatingDocument,
	ReviewOrderByInput,
} from "@/gql/graphql";
import { PRODUCTS_COUNT_PER_PAGE } from "@/constants";
import { calculateSkipValue } from "@/utils/pagination";
import { calculateAverageRating } from "@/utils/reviews";

type Params = {
	params: {
		pageNumber: string;
	};
	searchParams: {
		price?: string;
		rating?: string;
	};
};

type Props = Params;

export default async function Products({ params, searchParams }: Props) {
	const rating = searchParams.rating;

	const sortRatingType: ReviewOrderByInput | undefined =
		rating === "DESC" ? "rating_DESC" : rating === "ASC" ? "rating_ASC" : undefined;

	const isRatingValid = rating === "DESC" || rating === "ASC";

	const skip = calculateSkipValue(params.pageNumber);
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			first: PRODUCTS_COUNT_PER_PAGE,
			skip,
			rating: sortRatingType,
		},
		next: {
			tags: ["products"],
		},
	});

	const sortedProducts = isRatingValid
		? products.sort((a, b) => {
				const calculatedAvgA = calculateAverageRating(a);
				const calculatedAvgB = calculateAverageRating(b);

				return rating === "ASC" ? calculatedAvgA - calculatedAvgB : calculatedAvgB - calculatedAvgA;
		  })
		: products;

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			<ProductsList products={sortedProducts} />
		</main>
	);
}
