import { redirect } from "next/navigation";
import Stripe from "stripe";

type Props = {
	searchParams: {
		sessionId?: string;
	};
};

export default async function CartSuccessPage({ searchParams }: Props) {
	if (!searchParams.sessionId) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(searchParams.sessionId);

	return (
		<div className="bg-teal-300 p-16">
			<h2>{session.payment_status}</h2>
		</div>
	);
}
