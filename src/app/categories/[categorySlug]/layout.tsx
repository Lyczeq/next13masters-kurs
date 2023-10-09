import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { ProductsGetCategoryBySlugDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";
import { Pagination } from "@/components/organisms/Pagination";

type Params = {
	params: { categorySlug: string };
};

type Props = Params & {
	children: ReactNode;
};

export default async function Products({ children, params }: Props) {
	const { categories } = await executeGraphql({
		query: ProductsGetCategoryBySlugDocument,
		variables: {
			slug: params.categorySlug,
		},
	});

	if (!categories[0]?.products.length) {
		throw notFound();
	}

	return (
		<section className="flex flex-col gap-4">
			<h1 className="text-center text-2xl font-bold">{categories[0].name}</h1>
			<Pagination totalProductsCount={categories[0].products.length}>{children}</Pagination>;
		</section>
	);
}
