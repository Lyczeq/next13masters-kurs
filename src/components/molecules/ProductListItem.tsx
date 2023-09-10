import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { type Product } from "@/types";

type Props = {
	product: Product;
};

function formatPrice(price: number) {
	return Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(price);
}

export const ProductListItem = ({ product: { image, category, name, price } }: Props) => {
	return (
		<li className="flex flex-col gap-2 rounded-2xl border bg-slate-300 p-2">
			<h3>
				{name} | {category}
			</h3>
			<p>{formatPrice(price)}</p>
			<ProductListItemCoverImage {...image} />
		</li>
	);
};
