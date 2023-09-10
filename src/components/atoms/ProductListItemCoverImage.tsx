type Props = {
	src: string;
	alt: string;
};

export const ProductListItemCoverImage = ({ alt, src }: Props) => {
	return (
		<div className="max-w-80 max-h-80">
			<img src={src} alt={alt} className="h-80 w-80 object-cover" />
		</div>
	);
};
