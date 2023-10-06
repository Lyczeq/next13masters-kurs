"use client";
import { type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { type ProductDetailsProductSizeColorVariantFragment } from "@/gql/graphql";

type Props = {
	variants: ProductDetailsProductSizeColorVariantFragment[];
	productId: string;
};

export const VariantSelect = ({ variants, productId }: Props) => {
	const router = useRouter();
	const onChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		router.push(`/product/${productId}?variantSize=${value}`);
	};

	return (
		<select name="Variant Select" id="variantSelect" onChange={onChangeOption}>
			{variants.map((variant) => {
				return (
					<option key={variant.size} value={variant.size}>
						{variant.size} {variant.color}
					</option>
				);
			})}
		</select>
	);
};
