export async function getAddress(ipAddress: string) {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_U1dVROltGOtfOiuRLF8rYyCCJLGay&ipAddress=${ipAddress}`
    );

    if (!res.ok) throw new Error("invalid IP address format!");

    const data = await res.json();

    const { ip, location, isp } = data;
    const { city, lat, lng, region, timezone } = location;
    const addressDetails = {
      ip,
      city,
      lat,
      lng,
      region,
      timezone,
      isp,
    };

    return addressDetails;
  } catch (err: any) {
    alert(
      `${err.message} ${
        err.message === "Failed to fetch"
          ? ", this could be due to bad network ⚠."
          : ""
      }`
    );
  }
}
