import React from "react";
import { Box, Heading, Text, VStack, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Pregnancy() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4} color="pink.500">
        Info Ibu Hamil
      </Heading>
      <VStack align="start" spacing={3}>
        <Text>Tips untuk ibu hamil agar sehat dan kuat:</Text>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="pink.400" />
            Konsumsi makanan bergizi
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="pink.400" />
            Rutin periksa kehamilan
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="pink.400" />
            Istirahat yang cukup
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
}
