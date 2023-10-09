"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

type Props = {
	quantity: number;
	itemId: string;
};
export const IncrementProductQuantity = ({ itemId, quantity }: Props) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	const incrementProductQuantity = async () => {
		const incrementedOptimisticQuantity = optimisticQuantity + 1;
		setOptimisticQuantity(incrementedOptimisticQuantity);
		await changeItemQuantity(itemId, incrementedOptimisticQuantity);
	};

	return (
		<form action="">
			<span>{optimisticQuantity}</span>
			<button
				formAction={incrementProductQuantity}
				className="ml-2 h-8 w-8 rounded-md border-none bg-slate-100"
			>
				+
			</button>
		</form>
	);
};
