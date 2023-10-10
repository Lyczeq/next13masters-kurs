"use client";

import { removeItem } from "./actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
type Props = {
	itemId: string;
};

export const RemoveButton = ({ itemId }: Props) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<button
			className="text-red-300 disabled:text-gray-400"
			disabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
		>
			Remove
		</button>
	);
};
