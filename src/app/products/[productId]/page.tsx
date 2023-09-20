import { ProductListItemCoverImage } from "@/components/atoms/ProductListItemCoverImage";
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
		<div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="flex justify-center bg-slate-300 p-4">
					<ProductListItemCoverImage src={product.image} alt={product.title} />
				</div>
				<div className="flex flex-col gap-4">
					<p>
						{product.title} | {product.category}
					</p>
					<p>{product.description}</p>
				</div>
			</div>
		</div>
	);
}
