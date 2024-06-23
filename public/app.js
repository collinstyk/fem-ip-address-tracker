var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _App_instances, _App_map, _App_mapZoomLevel, _App_maxZoomLevel, _App_form, _App_input, _App_loadMap, _App_getPosition, _App_trackIpAddress;
import { getAddress } from "./data.js";
class App {
    constructor(mapZoomLevel, maxZoomLevel) {
        _App_instances.add(this);
        _App_map.set(this, void 0);
        _App_mapZoomLevel.set(this, void 0);
        _App_maxZoomLevel.set(this, void 0);
        _App_form.set(this, void 0);
        _App_input.set(this, void 0);
        __classPrivateFieldSet(this, _App_mapZoomLevel, mapZoomLevel, "f");
        __classPrivateFieldSet(this, _App_maxZoomLevel, maxZoomLevel, "f");
        __classPrivateFieldSet(this, _App_form, document.querySelector("form"), "f");
        __classPrivateFieldSet(this, _App_input, document.querySelector("form > input"), "f");
        __classPrivateFieldGet(this, _App_instances, "m", _App_getPosition).call(this);
        __classPrivateFieldGet(this, _App_instances, "m", _App_trackIpAddress).call(this);
    }
}
_App_map = new WeakMap(), _App_mapZoomLevel = new WeakMap(), _App_maxZoomLevel = new WeakMap(), _App_form = new WeakMap(), _App_input = new WeakMap(), _App_instances = new WeakSet(), _App_loadMap = function _App_loadMap(position /*subject to change*/) {
    const { lat, lng } = position;
    // @ts-ignore
    __classPrivateFieldSet(this, _App_map, L.map("map").setView([lat, lng], __classPrivateFieldGet(this, _App_mapZoomLevel, "f")), "f");
    // @ts-ignore
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: __classPrivateFieldGet(this, _App_maxZoomLevel, "f"),
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(__classPrivateFieldGet(this, _App_map, "f"));
}, _App_getPosition = function _App_getPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const position = { lat, lng };
        __classPrivateFieldGet(this, _App_instances, "m", _App_loadMap).call(this, position),
            () => {
                alert("Could not get position");
                __classPrivateFieldGet(this, _App_instances, "m", _App_loadMap).call(this, { lat: 51.5, lng: -0.09 });
            };
    });
}, _App_trackIpAddress = function _App_trackIpAddress() {
    __classPrivateFieldGet(this, _App_form, "f").addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const ipAddress = __classPrivateFieldGet(this, _App_input, "f").value;
        __classPrivateFieldGet(this, _App_input, "f").value = "";
        getAddress(ipAddress);
    }));
};
const app = new App(13, 19);
