import { type PropsWithChildren } from "react";
import { ProductsGetAllListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";
import { Pagination } from "@/components/organisms/Pagination";

export default async function Products({ children }: PropsWithChildren) {
	const { products } = await executeGraphql(ProductsGetAllListDocument);

	return <Pagination totalProductsCount={products.length}>{children}</Pagination>;
}
