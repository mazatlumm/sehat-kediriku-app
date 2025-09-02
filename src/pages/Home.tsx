import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Image,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import HospitalIcon from "../assets/images/hospital.png";
import HamilIcon from "../assets/images/pregnancy.png";
import ParentsIcon from "../assets/images/parents.png";
import GiziIcon from "../assets/images/nutrition.png";
import HomeBackground from "../assets/images/background.png";

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

export default function Home() {
  const bgColor = "gray.900";
  const cardBgColor = "rgba(45, 55, 72, 0.4)";
  const headingColor = "cyan.300";
  const subHeadingColor = "gray.400";
  const cardShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";

  const menuItems = [
    {
      label: "Lokasi Kesehatan",
      path: "/maps",
      icon: HospitalIcon,
      startColor: "blue.500",
      endColor: "purple.500",
    },
    {
      label: "Ibu Hamil & Balita",
      path: "/baby-and-pregnancy",
      icon: HamilIcon,
      startColor: "pink.500",
      endColor: "red.500",
    },
    {
      label: "Lansia",
      path: "/parents",
      icon: ParentsIcon,
      startColor: "pink.500",
      endColor: "red.500",
    },
    {
      label: "Ilmu Gizi",
      path: "/nutritions",
      icon: GiziIcon,
      startColor: "orange.500",
      endColor: "yellow.500",
    },
  ];

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
      overflow="hidden"
      backgroundImage={`url(${HomeBackground})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
    >
      <VStack spacing={{ base: 6, md: 10 }} w="full" maxW="xl" textAlign="center">
        <Box>
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            mb={2}
            fontWeight="extrabold"
            letterSpacing="tight"
            bgClip="text"
            // Perbaikan: Ubah gradien teks agar lebih cerah dan mencolok
            bgGradient="linear(to-r, #4685E8, #69D2A3)"
          >
            Kediri Sehat
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color={subHeadingColor}>
            Layanan kesehatan cerdas untuk warga Kediri.
          </Text>
        </Box>

        {/* --- Kartu Layanan Glassmorphism --- */}
        <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4} w="full">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              as={Link}
              to={item.path}
              variant="unstyled"
              h={{ base: "140px", md: "180px" }}
              bg={cardBgColor}
              borderRadius="2xl"
              boxShadow={cardShadow}
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.18)"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Image
                src={item.icon}
                alt={item.label}
                boxSize={{ base: "50px", md: "12" }}
                mb={3}
                animation={`${floating} 3s ease-in-out infinite`}
              />
              <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.900">
                {item.label}
              </Text>
            </Button>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}