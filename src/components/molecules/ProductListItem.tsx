import Link from "next/link";
import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { type ProductListItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/utils/currency";

type Props = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({
	product: { images, categories, price, id, name, reviews },
}: Props) => {
	const reviewsCount = reviews.length;

	const averageRating =
		reviews.reduce((accumulator, currentReview) => {
			return (accumulator += currentReview.rating);
		}, 0) / reviewsCount;

	return (
		<li className="rounded-2xl border bg-slate-300">
			<Link href={`/product/${id}`}>
				<div className="flex flex-col gap-2 p-2">
					<h3>{name}</h3>
					{categories.at(0) && <span>{categories[0].name}</span>}
					<p data-testid="product-price">{formatPrice(price)}</p>
					<p data-testid="product-rating">{averageRating}</p>
					{images[0] && <ProductListItemCoverImage src={images[0].url} alt={name} />}
				</div>
			</Link>
		</li>
	);
};
