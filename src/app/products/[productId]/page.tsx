type Props = {
	params: {
		productId: string;
	};
};

export default function SingleProductPage({ params }: Props) {
	return <div>{JSON.stringify(params)}</div>;
}
