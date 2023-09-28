import { type PropsWithChildren } from "react";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { ProductsGetAllListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

const TAKE = 4;

export default async function Products({ children }: PropsWithChildren) {
	const { products } = await executeGraphql(ProductsGetAllListDocument);

	const totalCount = products.length;

	const pageCount = Math.round(totalCount / TAKE);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			{children}
			<div>
				<ul className="flex gap-1" aria-label="pagination">
					{[...Array(pageCount).keys()].map((number) => {
						return (
							<li key={number + 1} role="link">
								<ActiveLink href={`/products/${number + 1}`}>{number + 1}</ActiveLink>
							</li>
						);
					})}
				</ul>
			</div>
		</main>
	);
}
