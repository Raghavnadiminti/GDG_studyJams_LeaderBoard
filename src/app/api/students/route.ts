
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB(); 

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

  
    const data = await mongoose.connection
      .collection("Studyjams")
      .findOne({ "User Email":email });

    if (!data) {
      return NextResponse.json(
        { error: "No studyjam found for this email" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(" Error fetching studyjam by email:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
