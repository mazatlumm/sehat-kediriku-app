import React from "react";
import { Box, Heading, SimpleGrid, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4} textAlign="center" color="blue.600">
        Kediri Sehat
      </Heading>
      <Text textAlign="center" mb={6} color="gray.600">
        Pilih layanan kesehatan yang kamu butuhkan
      </Text>
      <SimpleGrid columns={2} spacing={4}>
        <Button as={Link} to="/maps" colorScheme="blue" h="100px">
          Lokasi Kesehatan
        </Button>
        <Button as={Link} to="/pregnancy" colorScheme="pink" h="100px">
          Ibu Hamil
        </Button>
        <Button as={Link} to="/baby" colorScheme="green" h="100px">
          Balita
        </Button>
        <Button as={Link} to="/nutritions" colorScheme="orange" h="100px">
          Ilmu Gizi
        </Button>
      </SimpleGrid>
    </Box>
  );
}
