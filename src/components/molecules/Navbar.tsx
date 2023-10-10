import { ActiveLink } from "@/components/atoms/ActiveLink";

export function Navbar() {
	return (
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
	);
}
