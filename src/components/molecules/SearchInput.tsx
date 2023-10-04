"use client";

import { type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export function SearchInput() {
	const router = useRouter();
	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		router.push(`/search?query=${value}`);
	};

	return (
		<input
			onChange={onSearch}
			role="searchbox"
			className="min-w rounded-xl border px-4 py-2"
			placeholder="Search..."
		/>
	);
}
