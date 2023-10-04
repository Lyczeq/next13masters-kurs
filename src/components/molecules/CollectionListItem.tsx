import Link from "next/link";
import Image from "next/image";
import { type CollectionListItemFragment } from "@/gql/graphql";

type Prop = {
	collection: CollectionListItemFragment;
};

export function CollectionListItem({ collection }: Prop) {
	return (
		<li>
			<Link href={`/collections/${collection.slug}`}>
				<h2 className="text-xl font-bold">{collection.name}</h2>
				<Image src={collection.image.url} alt={collection.name} width={640} height={440} />
			</Link>
		</li>
	);
}
