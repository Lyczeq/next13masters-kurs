import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/api/cart";
import { formatPrice } from "@/utils/currency";
import { ChangeProductQuantity } from "./IncrementProductQuantity";
import { RemoveButton } from "./RemoveButton";
import { handlePaymentAction } from "./actions";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	const totalSum = cart.orderItems.reduce(
		(accumulator, currentItem) =>
			(accumulator = accumulator + (currentItem.product?.price ?? 0) * currentItem.quantity),
		0,
	);

	console.log(cart.orderItems);

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<h2>Total {formatPrice(totalSum)}</h2>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.id}>
								<td>{item.product.name}</td>
								<td className="items-center">
									<ChangeProductQuantity quantity={item.quantity} itemId={item.id} />
								</td>
								<td>{formatPrice(item.product.price)}</td>
								<td>
									<RemoveButton itemId={item.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<form action={handlePaymentAction}>
				<button
					type="submit"
					className="rounded-xl border bg-slate-500 px-4 py-2 text-white transition-colors hover:bg-slate-600"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
