import Link, { type LinkProps } from "next/link";
import { type PropsWithChildren } from "react";

export const ActiveLink = ({ href, children }: PropsWithChildren<LinkProps>) => {
	return (
		<Link
			href={href}
			className="rounded-2xl px-4 py-2 text-xl transition-colors hover:bg-slate-100"
		>
			{children}
		</Link>
	);
};
