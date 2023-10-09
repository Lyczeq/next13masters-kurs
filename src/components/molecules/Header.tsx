import { SearchInput } from "@/components/molecules/SearchInput";
import Link from "next/link";
import { getCartFromCookies } from "@/api/cart";
import { Navbar } from "./Navbar";

export async function Header() {
	const cart = await getCartFromCookies();
	const itemsQuantity = cart?.orderItems.length;

	return (
		<header className="flex max-w-screen-xl items-center gap-10 py-4">
			<Navbar />
			<SearchInput />
			<Link href="/cart" className="flex gap-2">
				<span>Cart </span>
				<strong>{itemsQuantity}</strong>
			</Link>
		</header>
	);
}
