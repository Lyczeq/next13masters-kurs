import { ProductListItem } from "../molecules/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

type Props = {
	products: ProductListItemFragment[];
};

export const ProductsList = ({ products }: Props) => {
	return (
		<ul
			data-testid="products-list"
			className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
		>
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
};
