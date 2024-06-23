import { getAddress } from "./data.js";

class App {
  #map: any;
  #mapZoomLevel: number;
  #maxZoomLevel: number;
  #form;
  #input;

  constructor(mapZoomLevel: number, maxZoomLevel: number) {
    this.#mapZoomLevel = mapZoomLevel;
    this.#maxZoomLevel = maxZoomLevel;
    this.#form = document.querySelector("form") as HTMLFormElement;
    this.#input = document.querySelector("form > input") as HTMLInputElement;

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
  }

  #getPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const position = { lat, lng };
      this.#loadMap(position),
        () => {
          alert("Could not get position");
          this.#loadMap({ lat: 51.5, lng: -0.09 });
        };
    });
  }

  #trackIpAddress() {
    this.#form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();

      const ipAddress = this.#input.value;

      this.#input.value = "";

      getAddress(ipAddress);
    });
  }
}

const app = new App(13, 19);
