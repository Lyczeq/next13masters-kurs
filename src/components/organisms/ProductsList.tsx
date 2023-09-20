import Link from "next/link";
import { ProductListItem } from "../molecules/ProductListItem";
import { type Product } from "@/types";

type Props = {
	products: Product[];
};

export const ProductsList = ({ products }: Props) => {
	return (
		<ul
			data-testid="products-list"
			className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
		>
			{products.map((product) => (
				<Link key={product.id} href={`/products/${product.id}`}>
					<ProductListItem product={product} />
				</Link>
			))}
		</ul>
	);
};
