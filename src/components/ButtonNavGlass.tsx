import { Button, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";

const cardBgColor = "rgba(45, 55, 72, 0.4)";
const cardShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";

interface ButtonNavGlassProps {
    title: string;
    to: string;
}

function ButtonNavGlass({ title, to }: ButtonNavGlassProps) {
    return (
        <Button
            as={Link}
            to={to}
            variant="unstyled"
            px={{ base: 4, md: 6 }}
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
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.900">
                {title}
            </Text>
        </Button>
    )
}

export default ButtonNavGlass
