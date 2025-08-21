import React from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaBaby, FaUtensils, FaFemale } from "react-icons/fa";

const navItems = [
  { label: "Home", icon: FaHome, path: "/" },
  { label: "Maps", icon: FaMapMarkerAlt, path: "/maps" },
  { label: "Pregnancy", icon: FaFemale, path: "/pregnancy" },
  { label: "Baby", icon: FaBaby, path: "/baby" },
  { label: "Nutrition", icon: FaUtensils, path: "/nutritions" },
];

export default function BottomNav() {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      zIndex={1000}
      py={2}
      boxShadow="md"
    >
      <Flex justify="space-around" align="center">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            style={({ isActive }) => ({
              textAlign: "center",
              color: isActive ? "#3182ce" : "#4A5568",
              textDecoration: "none",
            })}
          >
            <Flex flexDirection="column" align="center" gap={1}>
              <IconButton
                aria-label={item.label}
                icon={<item.icon />}
                size="sm"
                variant="ghost"
                color="inherit"
              />
              <Text fontSize="xs">{item.label}</Text>
            </Flex>
          </NavLink>
        ))}
      </Flex>
    </Box>
  );
}
