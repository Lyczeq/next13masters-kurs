import { type ReactNode } from "react";
import { ActiveLink } from "../atoms/ActiveLink";
import { PRODUCTS_COUNT_PER_PAGE } from "@/constants";

type Props = {
	totalProductsCount: number;
	children: ReactNode;
};

export const Pagination = ({ totalProductsCount, children }: Props) => {
	const pageCount = Math.round(totalProductsCount / PRODUCTS_COUNT_PER_PAGE);

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
};
