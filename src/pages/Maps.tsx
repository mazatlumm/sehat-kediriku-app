import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import HomeBackground from "../assets/images/background.png";

export default function Maps() {
  const bgColor = "gray.900";
  const headingColor = "cyan.300";
  const subHeadingColor = "gray.400";
  const cardBgColor = "rgba(45, 55, 72, 0.4)";
  const cardShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
  
  return (
    <Box
      minH="100vh"
      w="full"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      p={{ base: 4, md: 8 }}
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
            Peta Google Maps akan muncul di sini.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}