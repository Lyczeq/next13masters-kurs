import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
	const json: unknown = await request.json();

	if (
		typeof json === "object" &&
		json &&
		"productId" in json &&
		typeof json.productId === "string"
	) {
		revalidatePath(`/product/${json.productId}`);
		revalidatePath("/products");
		return NextResponse.json(null, { status: 201 });
	}

	return NextResponse.json({ message: "Invalid body" }, { status: 400 });
}
