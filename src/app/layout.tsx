import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils/cn";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { SearchInput } from "@/components/molecules/SearchInput";
import Link from "next/link";
import { getCartFromCookies } from "@/api/cart";
import { Header } from "@/components/molecules/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next 13 Masters App",
};

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={(cn(inter.className), "flex flex-col items-center px-4")}>
				<Header />
				{children}
				{modal}
			</body>
		</html>
	);
}
