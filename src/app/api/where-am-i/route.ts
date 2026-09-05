import { NextRequest, NextResponse } from "next/server";
import { MY_HOME } from "@/config/location";

type ApiResult = {
  userCity: string | null;
  userCountry: string | null;
  distanceKm: number | null;
  distanceMiles: number | null;
  userLat: number | null;
  userLon: number | null;
  myCity: string;
  myCountry: string;
};

// Haversine formula to calculate distance between two points
const toRad = (v: number) => (v * Math.PI) / 180;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dKm = R * c;
  const dMiles = dKm * 0.621371;
  return { dKm, dMiles };
}

export async function GET(request: NextRequest) {
  // Get IP from headers (works on Vercel and most proxies)
  const xff = request.headers.get("x-forwarded-for");
  const ip = xff ? xff.split(",")[0].trim() : null;

  // Default response if we can't get location
  const defaultResponse: ApiResult = {
    userCity: null,
    userCountry: null,
    distanceKm: null,
    distanceMiles: null,
    userLat: null,
    userLon: null,
    myCity: MY_HOME.city,
    myCountry: MY_HOME.country,
  };

  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    // Localhost - return default
    return NextResponse.json(defaultResponse);
  }

  try {
    // Using ip-api.com (free, no API key needed, 45 requests/minute)
    const geoResp = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,city,country,lat,lon`
    );
    const data = await geoResp.json();

    if (data.status !== "success") {
      return NextResponse.json(defaultResponse);
    }

    const { dKm, dMiles } = haversine(
      MY_HOME.lat,
      MY_HOME.lon,
      data.lat,
      data.lon
    );

    return NextResponse.json({
      userCity: data.city,
      userCountry: data.country,
      distanceKm: Math.round(dKm),
      distanceMiles: Math.round(dMiles),
      userLat: data.lat,
      userLon: data.lon,
      myCity: MY_HOME.city,
      myCountry: MY_HOME.country,
    });
  } catch (err) {
    console.error("Geo lookup error:", err);
    return NextResponse.json(defaultResponse);
  }
}


