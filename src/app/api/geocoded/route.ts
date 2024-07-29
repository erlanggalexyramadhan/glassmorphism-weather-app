import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      throw new Error("API key is missing");
    }

    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get("search");

    if (!city) {
      return NextResponse.json(
        { error: "Search parameter 'search' is required" },
        { status: 400 }
      );
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching geocoded data:", error.message);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}