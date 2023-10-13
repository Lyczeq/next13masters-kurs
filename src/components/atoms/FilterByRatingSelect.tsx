"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const FilterByRatingSelect = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const defaultValue = searchParams.get("rating");

	const onSelect = (e: any) => {
		const rating = e.target.value;
		router.push(`/products/1?rating=${rating}`);
		router.refresh();
	};

	return (
		<select defaultValue={defaultValue ?? undefined} onChange={onSelect}>
			{/* <option data-testid="sort-by-rating" value="">
				Sort by rating
			</option> */}

			<option data-testid="sort-by-rating" value="DESC">
				DESC
			</option>
			<option data-testid="sort-by-rating" value="ASC">
				ASC
			</option>
		</select>
	);
};
