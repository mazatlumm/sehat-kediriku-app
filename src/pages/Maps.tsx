import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import HomeBackground from "../assets/images/background.png";

export default function Maps() {
  const [selectedFacility, setSelectedFacility] = useState("all");

  const bgColor = "gray.900";
  const headingColor = "cyan.300";
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
      pb="100px" // Padding bawah untuk BottomNav
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
            Temukan Puskesmas, Klinik, dan Rumah Sakit terdekat.
          </Text>
        </Box>

        {/* Dropdown untuk memilih jenis fasilitas */}
        <FormControl
          w="full"
          maxW="md"
          textAlign="left"
        >
          <FormLabel htmlFor="facility-type" color="whiteAlpha.800" fontWeight="bold">
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
            <option value="all">Semua</option>
            <option value="rumahsakit">Rumah Sakit</option>
            <option value="klinik">Klinik</option>
            <option value="puskesmas">Puskesmas</option>
            <option value="apotek">Apotek</option>
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
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <Text color="whiteAlpha.800" fontSize="md">
            Anda memilih: **{selectedFacility}**
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}