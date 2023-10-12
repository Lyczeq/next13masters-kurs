"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity, removeProductFromOrderItem } from "./actions";

type Props = {
	quantity: number;
	itemId: string;
};
export const ChangeProductQuantity = ({ itemId, quantity }: Props) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	const incrementProductQuantity = async () => {
		const incrementedOptimisticQuantity = optimisticQuantity + 1;
		setOptimisticQuantity(incrementedOptimisticQuantity);
		await changeItemQuantity(itemId, incrementedOptimisticQuantity);
	};

	const decrementProductQuantity = async () => {
		if (optimisticQuantity === 1) {
			await removeProductFromOrderItem(itemId);
			return;
		}

		const decrementedOptimisticQuantity = optimisticQuantity - 1;
		setOptimisticQuantity(decrementedOptimisticQuantity);
		await changeItemQuantity(itemId, decrementedOptimisticQuantity);
	};

	return (
		<>
			<span data-testid="quantity">{optimisticQuantity}</span>
			<form>
				<button
					type="submit"
					data-testid="increment"
					formAction={incrementProductQuantity}
					className="ml-2 h-8 w-8 rounded-md border-none bg-slate-100"
				>
					+
				</button>
			</form>
			<form>
				<button
					type="submit"
					data-testid="decrement"
					formAction={decrementProductQuantity}
					className="ml-2 h-8 w-8 rounded-md border-none bg-slate-100"
				>
					-
				</button>
			</form>
		</>
	);
};
