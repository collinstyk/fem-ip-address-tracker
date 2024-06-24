import { getAddress, getInitialAddress } from "./data.js";

class App {
  #map: any;

  #mapZoomLevel: number;
  #maxZoomLevel: number;
  #form;
  #input;
  #displayIpAddress;
  #displayLocation;
  #displayTimezone;
  #displayISP;

  constructor(mapZoomLevel: number, maxZoomLevel: number) {
    this.#mapZoomLevel = mapZoomLevel;
    this.#maxZoomLevel = maxZoomLevel;
    this.#form = document.querySelector("form") as HTMLFormElement;
    this.#input = document.querySelector("form > input") as HTMLInputElement;
    this.#displayIpAddress = document.querySelector(
      ".ip-address > p"
    ) as HTMLParagraphElement;
    this.#displayLocation = document.querySelector(
      ".location > p"
    ) as HTMLParagraphElement;
    this.#displayTimezone = document.querySelector(
      ".timezone > p"
    ) as HTMLParagraphElement;
    this.#displayISP = document.querySelector(
      ".isp > p"
    ) as HTMLParagraphElement;

    this.#getPosition();

    this.#trackIpAddress();
  }

  #loadMap(position: { lat: number; lng: number } /*subject to change*/) {
    const { lat, lng } = position;

    // @ts-ignore
    this.#map = L.map("map").setView([lat, lng], this.#mapZoomLevel);

    // @ts-ignore
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: this.#maxZoomLevel,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);

    // @ts-ignore
    L.marker([lat, lng]).addTo(this.#map);
  }

  #getPosition() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const position = { lat, lng };
        this.#loadMap(position);
      },
      () => {
        alert(
          "Could not get position, but you can search for any IP address to track 😊."
        );
        this.#loadMap({ lat: 51.5, lng: -0.09 });
      }
    );
  }

  #trackIpAddress() {
    getInitialAddress().then((res) => {
      // @ts-ignore
      const { city, ip, isp, lat, lng, region, timezone } = res;

      const locationText = `${city}, ${region}`;

      this.#input.value = ip;

      this.#map.setView([lat, lng], this.#mapZoomLevel);

      this.#displayIpAddress.innerText = ip;
      this.#displayLocation.innerText = locationText;
      this.#displayISP.innerText = isp;
      this.#displayTimezone.innerText = `UTC ${timezone}`;
    });

    this.#form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();

      const ipAddress = this.#input.value;

      this.#input.value = "";

      const data = await getAddress(ipAddress);

      // @ts-ignore
      const { city, ip, isp, lat, lng, region, timezone } = data;

      const locationText = `${city}, ${region}`;

      this.#map.setView([lat, lng], this.#mapZoomLevel);

      // @ts-ignore
      L.marker([lat, lng]).addTo(this.#map);

      this.#displayIpAddress.innerText = ip;
      this.#displayLocation.innerText = locationText;
      this.#displayISP.innerText = isp;
      this.#displayTimezone.innerText = `UTC ${timezone}`;
    });
  }
}

const app = new App(12, 19);
