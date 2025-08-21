import React from "react";
import { Box, Heading, Text, VStack, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Baby() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="green.500">
        Info Balita
      </Heading>
      <VStack align="start" spacing={3}>
        <Text>Panduan singkat untuk merawat balita:</Text>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.400" />
            ASI Eksklusif 6 bulan pertama
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.400" />
            Imunisasi sesuai jadwal
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.400" />
            Pantau tumbuh kembang anak
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
}
