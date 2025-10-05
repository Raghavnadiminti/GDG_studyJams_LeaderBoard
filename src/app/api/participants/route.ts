import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
   
    await connectDB();

   
    const studyjams = await mongoose.connection
      .collection("Studyjams")
      .find({})
      .toArray();

    return NextResponse.json(studyjams);
  } catch (error) {
    console.error("Error fetching studyjams:", error);
    return NextResponse.json(
      { error: "Failed to fetch studyjams data" },
      { status: 500 }
    );
  }
}
