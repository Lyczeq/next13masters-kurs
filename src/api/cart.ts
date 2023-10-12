import { cookies } from "next/headers";
import { executeGraphql } from "./graphqlApi";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartCreateFragment,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	CartChangeProductQuantityDocument,
} from "@/gql/graphql";

export async function getOrCreateCart(): Promise<CartCreateFragment> {
	const existingCart = await getCartFromCookies();
	if (existingCart) {
		return existingCart;
	}

	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Failed to create order!");
	}

	cookies().set("cartId", cart.createOrder.id, {
		httpOnly: true,
		sameSite: "lax",
	});

	return cart.createOrder;
}

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			cache: "no-store",
			next: { tags: ["cart"] },
		});
		if (cart.order) {
			return cart.order;
		}
	}
}

export function createCart() {
	return executeGraphql({ query: CartCreateDocument, cache: "no-store" });
}
export async function addToCart(cart: CartCreateFragment, productId: string) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});

	if (!product) {
		throw new Error("Product not found");
	}

	const existingOrderItem = cart.orderItems.find(
		(orderItem) => orderItem.product?.id === productId,
	);

	if (!existingOrderItem?.product) {
		await executeGraphql({
			query: CartAddProductDocument,
			variables: {
				orderId: cart.id,
				productId,
				total: product.price,
			},
		});
	} else {
		await executeGraphql({
			query: CartChangeProductQuantityDocument,
			variables: {
				orderItemId: existingOrderItem.id,
				orderId: cart.id,
				productId,
				total: existingOrderItem.total + existingOrderItem.product.price,
				quantity: existingOrderItem.quantity + 1,
			},
		});
	}
}
