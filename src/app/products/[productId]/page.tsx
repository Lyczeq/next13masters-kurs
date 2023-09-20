import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type Product } from "@/types";

type Props = {
	params: {
		productId: string;
	};
};

async function getSingleProduct(productId: string) {
	const url = `https://naszsklep-api.vercel.app/api/products/${productId}`;

	const response = await fetch(url);
	return response.json() as Promise<Product>;
}

export default async function SingleProductPage({ params }: Props) {
	const product = await getSingleProduct(params.productId);

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<ProductListItem product={product} />
			<p>{product.description}</p>
		</div>
	);
}
