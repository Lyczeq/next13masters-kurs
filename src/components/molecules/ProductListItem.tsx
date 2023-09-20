import Link from "next/link";
import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { type Product } from "@/types";

type Props = {
	product: Product;
};

function formatPrice(price: number) {
	return Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(price);
}

export const ProductListItem = ({ product: { image, category, title, price, id } }: Props) => {
	return (
		<li className="rounded-2xl border bg-slate-300">
			<Link href={`/products/${id}`}>
				<div className="flex flex-col gap-2 p-2">
					<h3>
						{title} | {category}
					</h3>
					<p>{formatPrice(price)}</p>
					<ProductListItemCoverImage src={image} alt={title} />
				</div>
			</Link>
		</li>
	);
};
