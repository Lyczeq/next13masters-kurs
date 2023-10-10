import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/api/cart";
import { formatPrice } from "@/utils/currency";
import { IncrementProductQuantity } from "./IncrementProductQuantity";
import { RemoveButton } from "./RemoveButton";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
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
									<IncrementProductQuantity quantity={item.quantity} itemId={item.id} />
								</td>
								<td>{formatPrice(item.product.price)}</td>
								<RemoveButton itemId={item.id} />
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
