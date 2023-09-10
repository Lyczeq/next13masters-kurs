import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12">
			<span>
				Visit{" "}
				<Link className="font-bold underline" href="/products">
					products
				</Link>
			</span>
		</main>
	);
}
