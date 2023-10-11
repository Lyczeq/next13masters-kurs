import { executeGraphql } from "@/api/graphqlApi";
import { ProductGetByIdDocument } from "@/gql/graphql";
import Image from "next/image";
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: { productId: string } }) {
	console.log({ params });

	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: params.productId },
	});

	return new ImageResponse(
		(
			<div tw="bg-slate-300 w-full h-full flex flex-col">
				{product?.images[0].url && (
					<img height={450} src={product?.images[0].url} alt={product.name} />
				)}
				<h1 tw="text-4xl font-bold">{product?.name}</h1>
				<p>{product?.description}</p>
			</div>
		),
	);
}
