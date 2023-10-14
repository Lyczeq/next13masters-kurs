"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const FilterByPriceSelect = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const price = searchParams.get("price") ?? undefined;

	const onSelect = (e: any) => {
		const price = e.target.value;
		router.push(`/products/1?price=${price}`);
		router.refresh();
	};

	return (
		<select defaultValue={price} onChange={onSelect}>
			<option data-testid="sort-by-price" value="DESC">
				DESC
			</option>
			<option data-testid="sort-by-price" value="ASC">
				ASC
			</option>
		</select>
	);
};
