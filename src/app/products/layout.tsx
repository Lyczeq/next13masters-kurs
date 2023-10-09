import { type PropsWithChildren } from "react";
import { executeGraphql } from "@/api/graphqlApi";
import { Pagination } from "@/components/organisms/Pagination";
import { ProductsGetListDocument } from "@/gql/graphql";

export default async function Products({ children }: PropsWithChildren) {
	const { products } = await executeGraphql({ query: ProductsGetListDocument, variables: {} });

	return <Pagination totalProductsCount={products.length}>{children}</Pagination>;
}
