"use client";

import { type UrlObject } from "url";
import { type Route } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

type Props<T extends string> = {
	href: Route<T> | UrlObject;
	exact?: boolean;
	children: ReactNode;
};

function getHrefString<T extends string>(href: Route<T> | UrlObject) {
	if (typeof href === "object" && "href" in href) return href.href;
	else return href;
}

export const ActiveLink = <T extends string>({ href, children, exact }: Props<T>) => {
	const pathname = usePathname();
	const hrefString = getHrefString(href);

	const isActive = exact ? pathname === hrefString : pathname.startsWith("/");

	const styles = cn("px-4 py-2 text-xl transition-colors hover:border-b-2  hover:border-blue-300", {
		"border-b-2 border-blue-300": isActive,
	});

	return (
		<Link href={href} className={styles} aria-current={isActive || undefined}>
			{children}
		</Link>
	);
};
