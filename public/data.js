var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAddress(ipAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_U1dVROltGOtfOiuRLF8rYyCCJLGay&ipAddress=${ipAddress}`);
            if (!res.ok)
                throw new Error("invalid IP address");
            const data = yield res.json();
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
        }
        catch (err) {
            alert(`${err.message} ${err.message === "Failed to fetch"
                ? ", this could be due to bad network ⚠."
                : ""}`);
        }
    });
}
export function getInitialAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_U1dVROltGOtfOiuRLF8rYyCCJLGay&ipAddress`);
        const data = yield res.json();
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
    });
}
