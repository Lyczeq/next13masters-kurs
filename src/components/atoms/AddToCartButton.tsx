"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="rounded-xl border bg-slate-300 px-4 py-2 transition-colors hover:bg-slate-400 disabled:cursor-wait"
		>
			Add to cart
		</button>
	);
};
