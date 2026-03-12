import { NextResponse } from "next/server";

// simple handler that echoes received inquiry or stores it to Sanity
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // TODO: replace with actual submission logic (e.g. send email or save to DB)
    console.log("Received inquiry", data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message || "Error" },
      { status: 500 },
    );
  }
}
