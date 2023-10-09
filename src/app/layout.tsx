import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils/cn";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { SearchInput } from "@/components/molecules/SearchInput";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next 13 Masters App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={(cn(inter.className), "flex flex-col items-center px-4")}>
				<header className="flex max-w-screen-xl items-center gap-10 py-4">
					<nav className="w-full">
						<ul className="flex w-full justify-center gap-4">
							<li>
								<ActiveLink href="/" exact>
									Home
								</ActiveLink>
							</li>
							<li>
								<ActiveLink href="/products">All</ActiveLink>
							</li>
							<li>
								<ActiveLink href="/categories/t-shirts/1">T-shirts</ActiveLink>
							</li>
							<li>
								<ActiveLink href="/categories/hoodies/1">Hoodies</ActiveLink>
							</li>{" "}
							<li>
								<ActiveLink href="/categories/accessories/1">Accessories</ActiveLink>
							</li>
						</ul>
					</nav>
					<SearchInput />
					<Link href="/cart">Cart</Link>
				</header>
				{children}
			</body>
		</html>
	);
}
