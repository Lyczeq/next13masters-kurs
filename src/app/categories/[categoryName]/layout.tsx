import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { ProductsGetCategoryBySlugDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";
import { Pagination } from "@/components/organisms/Pagination";

type Params = {
	params: { categoryName: string };
};

type Props = Params & {
	children: ReactNode;
};

export default async function Products({ children, params }: Props) {
	const { categories } = await executeGraphql(ProductsGetCategoryBySlugDocument, {
		slug: params.categoryName,
	});

	if (!categories[0].products.length) {
		throw notFound();
	}

	return <Pagination totalProductsCount={categories[0].products.length}>{children}</Pagination>;
}
