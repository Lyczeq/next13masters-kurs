import { type PropsWithChildren } from "react";
import { type Product } from "@/types";
import { ActiveLink } from "@/components/atoms/ActiveLink";

const TAKE = 10;

async function getAllProducts() {
	const url = `https://naszsklep-api.vercel.app/api/products`;

	const response = await fetch(url);
	return response.json() as Promise<Product[]>;
}

export default async function Products({ children }: PropsWithChildren) {
	const products = await getAllProducts();
	const productsCount = products.length;
	const pagesCount = Math.ceil(productsCount / TAKE);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-4 p-12">
			{children}
			<div>
				<ul className="flex gap-1" aria-label="pagination">
					{[...Array(pagesCount).keys()].map((number) => {
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
