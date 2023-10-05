import { executeGraphql } from "@/api/graphqlApi";
import { ProductsList } from "@/components/organisms/ProductsList";
import { ProductsGetListBySearchInpuDocument } from "@/gql/graphql";

type Props = {
	searchParams: {
		query: string;
	};
};

export default async function SearchPage({ searchParams }: Props) {
	const query = searchParams.query;
	const { products } = await executeGraphql(ProductsGetListBySearchInpuDocument, {
		query,
	});

	return <div>{<ProductsList products={products} />}</div>;
}
