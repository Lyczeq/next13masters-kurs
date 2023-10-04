import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsList } from "@/components/organisms/ProductsList";
import { ProductsGetListByCollectionSlugDocument } from "@/gql/graphql";

type Params = {
	params: {
		collectionSlug: string;
	};
};

type Props = Params;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { collections } = await executeGraphql(ProductsGetListByCollectionSlugDocument, {
		collectionSlug: params.collectionSlug,
	});

	return {
		title: collections[0].name,
		description: collections[0].description,
	};
}

async function ProductsByCollection({ params }: Props) {
	const { collections } = await executeGraphql(ProductsGetListByCollectionSlugDocument, {
		collectionSlug: params.collectionSlug,
	});

	if (!collections[0].products) {
		throw notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			<h1 className="text-center text-2xl font-bold">{collections[0].name}</h1>
			<ProductsList products={collections[0].products} />
		</main>
	);
}
export default ProductsByCollection;
