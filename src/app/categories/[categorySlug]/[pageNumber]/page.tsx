import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsList } from "@/components/organisms/ProductsList";
import { CategoryGetBySlugDocument, ProductsGetCategoryBySlugDocument } from "@/gql/graphql";
import { PRODUCTS_COUNT_PER_PAGE } from "@/constants";
import { calculateSkipValue } from "@/utils/pagination";

type Params = {
	params: {
		pageNumber: string;
		categorySlug: string;
	};
};

type Props = Params;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { categories } = await executeGraphql(CategoryGetBySlugDocument, {
		slug: params.categorySlug,
	});

	return {
		title: categories[0].name,
		description: categories[0].description,
	};
}

async function ProductsByCategory({ params }: Props) {
	const skip = calculateSkipValue(params.pageNumber);
	const { categories } = await executeGraphql(ProductsGetCategoryBySlugDocument, {
		slug: params.categorySlug,
		first: PRODUCTS_COUNT_PER_PAGE,
		skip,
	});

	if (!categories[0]) {
		throw notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			<ProductsList products={categories[0].products} />
		</main>
	);
}
export default ProductsByCategory;
