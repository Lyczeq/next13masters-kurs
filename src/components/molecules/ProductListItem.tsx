import Link from "next/link";
import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { type ProductListItemFragment } from "@/gql/graphql";

type Props = {
	product: ProductListItemFragment;
};

function formatPrice(price: number) {
	return Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(price / 100);
}

export const ProductListItem = ({ product: { images, categories, price, id, name } }: Props) => {
	return (
		<li className="rounded-2xl border bg-slate-300">
			<Link href={`/product/${id}`}>
				<div className="flex flex-col gap-2 p-2">
					<h3>{name}</h3>
					{categories.at(0) && <span>{categories[0].name}</span>}
					<p>{formatPrice(price)}</p>
					{images[0] && <ProductListItemCoverImage src={images[0].url} alt={name} />}
				</div>
			</Link>
		</li>
	);
};
