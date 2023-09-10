import { ProductListItem } from "../molecules/ProductListItem";
import { type Product } from "@/types";

type Props = {
	products: Product[];
};

export const ProductList = ({ products }: Props) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</div>
	);
};
