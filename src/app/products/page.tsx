import { ProductsList } from "@/components/organisms/ProductsList";

const products = [
	{
		id: "1",
		category: "Sweatshirts",
		name: "Lakers hoodie",
		image: {
			src: "https://www.nameit.com/dw/image/v2/BDTC_PRD/on/demandware.static/-/Sites-pim-catalog/default/dwd90a1b8e/pim-static/NI/13215896/13215896_GreyMelange_003.jpg?sw=900&sh=1200",
			alt: "Lakers hoodie",
		},
		price: 100,
	},
	{
		id: "2",
		category: "Accessories",
		name: "Lakers cap",
		image: {
			src: "https://static.caphunters.pl/36617-large_default/new-era-curved-brim-9twenty-draft-edition-2023-los-angeles-lakers-nba-yellow-adjustable-cap.webp",
			alt: "Lakers cap",
		},
		price: 30,
	},
	{
		id: "3",
		category: "T-shirts",
		name: "Lakers t-shirt",
		image: {
			src: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/263b8bc3-7085-4afa-9682-9a8f4d9936d8/t-shirt-meski-nba-los-angeles-lakers-essential-9S4Wqw.png",
			alt: "Lakers t-shirt",
		},
		price: 200,
	},
	{
		id: "4",
		category: "Shorts",
		name: "Lakers shorts",
		image: {
			src: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/bfe906f3-0ff3-461b-856c-f95536754349/meskie-spodenki-nba-swingman-los-angeles-lakers-icon-edition-DP5K3l.png",
			alt: "Lakers shorts",
		},
		price: 200,
	},
];

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12">
			<ProductsList products={products} />
		</main>
	);
}
