import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      console.error("API key is missing");
      return NextResponse.json({ message: "API key is missing" }, { status: 500 });
    }

    console.log("Using API key:", apiKey);

    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=part&appid=${apiKey}`;
    console.log("Request URL:", url);

    const res = await axios.get(url);
    console.log("Response Data:", res.data);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching forecast data", error.message);
    return NextResponse.json({ message: "Error fetching forecast data", error: error.message }, { status: 500 });
  }
}
