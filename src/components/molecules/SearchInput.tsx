"use client";

import { type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "@/utils/debounce";

export function SearchInput() {
	const router = useRouter();
	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		console.log({ value });
		if (!value) {
			console.log("a");
			router.push(`/products/1`);
		}

		router.push(`/search?query=${value}`);
	};

	const delayedSearch = debounce(onSearch);

	return (
		<input
			onChange={delayedSearch}
			role="searchbox"
			className="min-w rounded-xl border px-4 py-2"
			placeholder="Search..."
		/>
	);
}
