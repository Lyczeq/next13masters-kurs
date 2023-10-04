import { CollectionListItem } from "../molecules/CollectionListItem";
import { type CollectionListItemFragment } from "@/gql/graphql";

type Props = {
	collections: CollectionListItemFragment[];
};
export function CollectionsList({ collections }: Props) {
	return (
		<ul className="flex flex-col gap-4">
			{collections.map((collection) => (
				<CollectionListItem key={collection.slug} collection={collection} />
			))}
		</ul>
	);
}
