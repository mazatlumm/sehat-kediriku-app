import React from "react";
import { Box, Heading, Text, VStack, UnorderedList, ListItem } from "@chakra-ui/react";

export default function Nutritions() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="orange.500">
        Ilmu Gizi
      </Heading>
      <VStack align="start" spacing={3}>
        <Text>Beberapa tips gizi sehat:</Text>
        <UnorderedList>
          <ListItem>Perbanyak sayur dan buah</ListItem>
          <ListItem>Kurangi makanan olahan dan gula</ListItem>
          <ListItem>Minum air putih yang cukup</ListItem>
        </UnorderedList>
      </VStack>
    </Box>
  );
}
