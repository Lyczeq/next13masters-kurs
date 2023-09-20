import { type Route } from "next";
import Link from "next/link";
import { type ReactNode } from "react";

type Props<T extends string> = {
	href: Route<T>;
	exact?: boolean;
	children: ReactNode;
};

export const ActiveLink = <T extends string>({ href, children }: Props<T>) => {
	return (
		<Link
			href={href}
			className="rounded-2xl px-4 py-2 text-xl transition-colors hover:bg-slate-100"
		>
			{children}
		</Link>
	);
};
