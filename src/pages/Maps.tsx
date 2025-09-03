import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import HomeBackground from "../assets/images/background.png";

type Facility = {
  id: number;
  name: string;
  type: "rumahsakit" | "klinik" | "puskesmas" | "apotek";
  position: { lat: number; lng: number };
  address: string;
  phone: string;
};

const facilities: Facility[] = [
  { id: 1, name: "RSUD Gambiran", type: "rumahsakit", position: { lat: -7.8325, lng: 112.0184 }, address: "Jl. Kapten Tendean No.16, Kota Kediri", phone: "(0354) 682339" },
  { id: 2, name: "RS Bhayangkara Kediri", type: "rumahsakit", position: { lat: -7.8181, lng: 112.0156 }, address: "Jl. Kombes Pol. Duryat No.17, Kota Kediri", phone: "(0354) 681995" },
  { id: 3, name: "Klinik Pratama Ar-Rasyid", type: "klinik", position: { lat: -7.8252, lng: 112.0221 }, address: "Jl. Veteran No.25, Kota Kediri", phone: "(0354) 698888" },
  { id: 4, name: "Puskesmas Balowerti", type: "puskesmas", position: { lat: -7.8198, lng: 112.0123 }, address: "Jl. Balowerti II No.45, Kota Kediri", phone: "(0354) 689118" },
  { id: 5, name: "Apotek K24 - Brawijaya", type: "apotek", position: { lat: -7.8205, lng: 112.0195 }, address: "Jl. Brawijaya No.40, Kota Kediri", phone: "0823-3567-8901" },
  { id: 6, name: "RS Baptis Kediri", type: "rumahsakit", position: { lat: -7.8421, lng: 112.0258 }, address: "Jl. Brigjend Pol. IBH Pranoto, Kota Kediri", phone: "(0354) 682170" },
  { id: 7, name: "Klinik Utama NMW", type: "klinik", position: { lat: -7.8155, lng: 112.0253 }, address: "Jl. Hayam Wuruk No.50, Kota Kediri", phone: "(0354) 681122" },
  { id: 8, name: "Puskesmas Pesantren 1", type: "puskesmas", position: { lat: -7.8377, lng: 112.0451 }, address: "Jl. Letjend Suprapto No.58, Kota Kediri", phone: "(0354) 689038" },
  { id: 9, name: "Apotek Kimia Farma", type: "apotek", position: { lat: -7.8236, lng: 112.0142 }, address: "Jl. Dhoho No.120, Kota Kediri", phone: "(0354) 682133" },
  { id: 10, name: "RSIA Citra Keluarga", type: "rumahsakit", position: { lat: -7.8091, lng: 112.0165 }, address: "Jl. KH. Agus Salim No.110, Kota Kediri", phone: "(0354) 7415599" },
];

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function Maps() {
  const [selectedFacility, setSelectedFacility] = useState("all");
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY, libraries: ["marker"] });

  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [key: number]: google.maps.marker.AdvancedMarkerElement }>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const filteredFacilities =
    selectedFacility === "all"
      ? facilities
      : facilities.filter((f) => f.type === selectedFacility);

  // Inisialisasi map
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
    }
    map.addListener("click", () => {
      infoWindowRef.current?.close();
    });
  }, []);

  // Hapus marker saat unmount
  const onUnmount = useCallback(() => {
    mapRef.current = null;
    markersRef.current = {};
    infoWindowRef.current = null;
  }, []);

  // Update marker setiap kali filter berubah
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;

    // Hapus marker lama
    Object.values(markersRef.current).forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = {};

    // Tambah marker baru
    for (const facility of filteredFacilities) {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: facility.position,
        title: facility.name,
      });

      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            facility.address
          )}&travelmode=driving`;

          const contentString = `
            <div style="color: black; max-width: 250px; font-family: Arial, sans-serif;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold;">${facility.name}</h3>
              <p style="margin: 0 0 5px 0; font-size: 14px;">${facility.address}</p>
              <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Telp:</strong> ${facility.phone}</p>
              <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer">
                <button style="
                    background-color: #4685E8;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    width: 100%;
                ">
                  Lihat Rute
                </button>
              </a>
            </div>
          `;
          infoWindowRef.current.setContent(contentString);
          infoWindowRef.current.open(mapRef.current!, marker);
        }
      });

      markersRef.current[facility.id] = marker;
    }
  }, [filteredFacilities, isLoaded]);

  const bgColor = "gray.900";
  const subHeadingColor = "gray.400";
  const cardBgColor = "rgba(45, 55, 72, 0.4)";
  const cardShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";

  return (
    <Box
      minH="93vh"
      w="full"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      p={{ base: 4, md: 8 }}
      pb="100px"
      overflow="hidden"
      backgroundImage={`url(${HomeBackground})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
    >
      <VStack spacing={6} w="full" maxW="xl" textAlign="center">
        <Box>
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            mb={2}
            fontWeight="extrabold"
            letterSpacing="tight"
            bgClip="text"
            bgGradient="linear(to-r, #4685E8, #69D2A3)"
          >
            Lokasi Kesehatan
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color={subHeadingColor}>
            Temukan Puskesmas, Klinik, Rumah Sakit, dan Apotek terdekat.
          </Text>
        </Box>

        <FormControl w="full" maxW="md" textAlign="left">
          <FormLabel
            htmlFor="facility-type"
            color="whiteAlpha.800"
            fontWeight="bold"
          >
            Pilih Tipe Fasilitas
          </FormLabel>
          <Select
            id="facility-type"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            bg={cardBgColor}
            color="white"
            borderColor="rgba(255, 255, 255, 0.18)"
            _hover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
            _focus={{ borderColor: "cyan.300", boxShadow: "0 0 0 1px cyan.300" }}
            backdropFilter="blur(10px)"
          >
            <option style={{ color: "black" }} value="">- Pilih FasKes -</option>
            <option style={{ color: "black" }} value="all">Semua</option>
            <option style={{ color: "black" }} value="rumahsakit">Rumah Sakit</option>
            <option style={{ color: "black" }} value="klinik">Klinik</option>
            <option style={{ color: "black" }} value="puskesmas">Puskesmas</option>
            <option style={{ color: "black" }} value="apotek">Apotek</option>
          </Select>
        </FormControl>

        <Box
          w="full"
          h={{ base: "300px", md: "450px" }}
          bg={cardBgColor}
          borderRadius="2xl"
          boxShadow={cardShadow}
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.18)"
          overflow="hidden"
        >
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: -7.825, lng: 112.020 }}
              zoom={14}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{ disableDefaultUI: false, mapId: "236c572ebfe9c0d1" }}
            />
          ) : (
            <Text color="whiteAlpha.800" fontSize="md" textAlign="center" mt={6}>
              Memuat peta...
            </Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
