import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetListDocument, ProductsGetListDocument } from "@/gql/graphql";
import { CollectionsList } from "@/components/organisms/CollectionsList";
import { ProductsList } from "@/components/organisms/ProductsList";

export default async function Home() {
	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { first: 4 },
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12">
			<ProductsList products={products} />
			<CollectionsList collections={collections} />
		</main>
	);
}
