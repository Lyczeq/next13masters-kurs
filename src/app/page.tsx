import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetListDocument } from "@/gql/graphql";
import { CollectionsList } from "@/components/organisms/CollectionsList";

export default async function Home() {
	const { collections } = await executeGraphql(CollectionsGetListDocument);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12">
			<CollectionsList collections={collections} />
		</main>
	);
}
