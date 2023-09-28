import { PRODUCTS_COUNT_PER_PAGE } from "@/constants";

export function calculateSkipValue(pageNumberAsString: string): number {
	const pageNumber = Number(pageNumberAsString);

	if (Number.isInteger(pageNumber) && pageNumber > 0) {
		return PRODUCTS_COUNT_PER_PAGE * (pageNumber - 1);
	}
	return 0;
}
