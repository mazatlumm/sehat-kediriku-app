import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Maps() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="blue.600">
        Lokasi Fasilitas Kesehatan
      </Heading>
      <Text color="gray.600">
        Di sini nanti akan ada peta interaktif untuk menemukan Puskesmas,
        Klinik, dan Rumah Sakit terdekat.
      </Text>
    </Box>
  );
}
