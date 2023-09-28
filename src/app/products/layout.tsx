import { type PropsWithChildren } from "react";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { ProductsGetListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export default async function Products({ children }: PropsWithChildren) {
	const { products } = await executeGraphql(ProductsGetListDocument);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			{children}
			<div>
				<ul className="flex gap-1" aria-label="pagination">
					{[...Array(products).keys()].map((number) => {
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
