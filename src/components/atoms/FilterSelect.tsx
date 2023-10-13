"use client";

import { revalidatePath, revalidateTag } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactEventHandler } from "react";

export type Item = {
	label: string;
	value: string;
};

type Props = {
	items: Item[];
};

export const FilterSelect = ({ items }: Props) => {
	const router = useRouter();

	const onSelect = (e: any) => {
		const price = e.target.value;
		router.push(`/products/1?price=${price}`);
		router.refresh();
	};

	return (
		<select name="pets" onChange={onSelect} data-testid="sort-by-price">
			{items.map((item) => (
				<option data-testid="product-price" key={item.value} value={item.value}>
					{item.label}
				</option>
			))}
		</select>
	);
};
