import { type PropsWithChildren } from "react";
import { executeGraphql } from "@/api/graphqlApi";
import { Pagination } from "@/components/organisms/Pagination";
import { ProductsGetListDocument } from "@/gql/graphql";

export default async function Products({ children, ...rest }: PropsWithChildren) {
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {},
		next: { tags: ["products-list"] },
	});

	return <Pagination totalProductsCount={products.length}>{children}</Pagination>;
}
