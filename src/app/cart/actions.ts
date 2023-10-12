"use server";

import { getCartFromCookies } from "@/api/cart";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartCreateFragment,
	CartDeleteOrderItemDocument,
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function changeItemQuantity(itemId: string, quantity: number) {
	await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});
	revalidateTag("cart");
}

export async function removeProductFromOrderItem(itemId: string) {
	await executeGraphql({
		query: CartDeleteOrderItemDocument,
		variables: {
			itemId,
		},
	});
	revalidateTag("cart");
}

export async function removeItem(itemId: string) {
	return executeGraphql({ query: CartRemoveProductDocument, variables: { itemId } });
}

export async function handlePaymentAction() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	const stripeKey = process.env.STRIPE_SECRET_KEY;
	if (!stripeKey) {
		throw new Error("Missing STRIPE_SECRET_KEY env");
	}

	const stripe = new Stripe(stripeKey, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		metadata: {
			cartId: cart.id,
		},
		line_items: (cart.orderItems ?? []).map((orderItem) => ({
			price_data: {
				currency: "usd",

				product_data: {
					name: orderItem.product?.name ?? "",
				},
				unit_amount: orderItem.product?.price ?? 0,
			},
			quantity: orderItem.quantity,
		})),
		success_url: "http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "http://localhost:3000/cart/cancel",
	});
	if (!checkoutSession.url) {
		throw new Error("Something went wrong");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}
