import { useEffect, useState } from "react";

export type FacilityType = "rumahsakit" | "klinik" | "puskesmas" | "apotek";

export interface Facility {
  id: number;
  name: string;
  type: FacilityType;
  position: { lat: number; lng: number };
  address: string;
  phone?: string;
}

const KEDIRI_COORD = { lat: -7.8166, lng: 112.0113 }; // titik pusat Kediri

export function useMap(apiKey: string) {
  const [facilities, setFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    const fetchPlaces = async (keyword: string, type: FacilityType) => {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        keyword
      )}+in+Kediri&location=${KEDIRI_COORD.lat},${KEDIRI_COORD.lng}&radius=10000&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      return data.results.map((item: any, index: number) => ({
        id: Date.now() + index,
        name: item.name,
        type,
        position: {
          lat: item.geometry.location.lat,
          lng: item.geometry.location.lng,
        },
        address: item.formatted_address,
        phone: item.formatted_phone_number || "",
      }));
    };

    const loadAll = async () => {
      const rs = await fetchPlaces("rumah sakit", "rumahsakit");
      const klinik = await fetchPlaces("klinik", "klinik");
      const puskesmas = await fetchPlaces("puskesmas", "puskesmas");
      const apotek = await fetchPlaces("apotek", "apotek");

      setFacilities([...rs, ...klinik, ...puskesmas, ...apotek]);
    };

    loadAll();
  }, [apiKey]);

  return facilities;
}
