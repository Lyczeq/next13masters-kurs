import { ProductListItemFragment } from "@/gql/graphql";

export const calculateAverageRating = (product: ProductListItemFragment) => {
	const reviewsCount = product.reviews.length;

	const averageRating = product.reviews.reduce((accumulator, currentReview) => {
		return (accumulator += currentReview.rating);
	}, 0);

	return averageRating / (reviewsCount || 1);
};
