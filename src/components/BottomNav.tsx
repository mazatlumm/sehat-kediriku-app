import React from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaBaby, FaUtensils, FaFemale } from "react-icons/fa";
import { keyframes } from "@emotion/react";

const navItems = [
  { label: "Home", icon: FaHome, path: "/" },
  { label: "Maps", icon: FaMapMarkerAlt, path: "/maps" },
  { label: "Pregnancy", icon: FaFemale, path: "/pregnancy" },
  { label: "Baby", icon: FaBaby, path: "/baby" },
  { label: "Nutrition", icon: FaUtensils, path: "/nutritions" },
];

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`;

export default function BottomNav() {
  const navBg = "gray.900";
  const navBorderColor = "gray.800";
  const activeColor = "cyan.300";
  const inactiveColor = "white";
  const boxShadow = "0px 0px 15px rgba(0, 0, 0, 0.5)";
  
  const location = useLocation();

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bg={navBg}
      borderTop="1px solid"
      borderColor={navBorderColor}
      zIndex={1000}
      py={2}
      boxShadow={boxShadow}
      style={{
        boxShadow: `0 -5px 15px rgba(0,0,0,0.5)`,
      }}
    >
      <Flex justify="space-around" align="center">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            // Perbaikan: Hapus style yang mengandalkan isActive untuk warna
            style={{
              textAlign: "center",
              textDecoration: "none",
              transition: "color 0.3s ease-in-out, transform 0.2s ease-in-out",
              transform: location.pathname === item.path ? "scale(1.1)" : "scale(1)",
            }}
          >
            <Flex
              flexDirection="column"
              align="center"
              gap={0}
              py={0}
            >
              <IconButton
                aria-label={item.label}
                icon={<item.icon />}
                size="md"
                variant="ghost"
                // Perbaikan: Atur warna langsung di sini
                color={location.pathname === item.path ? activeColor : inactiveColor}
                _hover={{
                  color: activeColor,
                  bg: "gray.800",
                  transform: "translateY(-3px)",
                  boxShadow: "inset 2px 2px 5px #12161E, inset -2px -2px 5px #282E3A",
                  animation: `${floating} 1.5s ease-in-out infinite`,
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
              />
              <Text 
                fontSize="xs" 
                fontWeight="bold"
                // Perbaikan: Atur warna teks langsung
                color={location.pathname === item.path ? activeColor : inactiveColor}
              >
                {item.label}
              </Text>
            </Flex>
          </NavLink>
        ))}
      </Flex>
    </Box>
  );
}