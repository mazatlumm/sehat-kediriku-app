import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { keyframes } from "@emotion/react";
import ReactMarkdown from 'react-markdown';
import HomeBackground from "../assets/images/background.png";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const customComponents = {
  h3: ({ node, ...props }) => (
    <Heading as="h3" size="md" color="whiteAlpha.900" mt={4} mb={2} {...props} />
  ),
  ul: ({ node, ...props }) => (
    <Box as="ul" pl={4} my={2} color="whiteAlpha.800" {...props} />
  ),
  li: ({ node, ...props }) => (
    <Flex as="li" align="flex-start" mb={1}>
      <Box as={CheckCircleIcon} color="orange.300" mt="5px" mr={2} />
      <Text as="span" color="whiteAlpha.800">
        {props.children}
      </Text>
    </Flex>
  ),
  p: ({ node, ...props }) => (
    <Text mb={2} whiteSpace="pre-wrap" color="whiteAlpha.800" {...props} />
  ),
};

export default function Baby() {
  const [babyAge, setBabyAge] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleFetchAdvice = async () => {
    if (!babyAge || isNaN(parseInt(babyAge))) {
      setError("Masukkan usia bayi yang valid.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAdvice("");

    try {
      const prompt = `Berikan saran kesehatan yang rinci dan terstruktur untuk bayi berusia ${babyAge} bulan. Sertakan poin-poin penting tentang: 1. Pola makan dan MPASI yang direkomendasikan, 2. Tahap perkembangan motorik, 3. Tanda-tanda kesehatan yang baik, dan 4. Tanda bahaya yang harus diwaspadai. Gunakan format markdown dengan bahasa yang mudah dimengerti.`;

      const username = import.meta.env.VITE_BASIC_AUTH_USERNAME;
      const password = import.meta.env.VITE_BASIC_AUTH_PASSWORD;
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch("https://konsisten-api.alicestech.com/v1/ai/chat-kediri-sehat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${base64Credentials}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil saran dari Gemini.");
      }

      const data = await response.json();
      
      if (data.status && data.data) {
        setAdvice(data.data);
      } else {
        throw new Error(data.message || "Gagal mengambil saran.");
      }
      
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = () => {
    const speech = window.speechSynthesis;

    if (speech.speaking && !isPaused) {
        speech.pause();
        setIsPaused(true);
    } else if (speech.speaking && isPaused) {
        speech.resume();
        setIsPaused(false);
    } else {
        speech.cancel();
        const utterance = new SpeechSynthesisUtterance(advice.replace(/###/g, ' '));
        utterance.lang = 'id-ID';
        speech.speak(utterance);
        setIsSpeaking(true);
        setIsPaused(false);
        utterance.onend = () => {
          setIsSpeaking(false);
          setIsPaused(false);
        };
    }
  };

  const handleStop = () => {
    const speech = window.speechSynthesis;
    if (speech.speaking) {
      speech.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

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
      pb="100px"
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
            Info Balita
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color={subHeadingColor}>
            Dapatkan saran kesehatan khusus untuk usia balita Anda.
          </Text>
        </Box>

        <FormControl
          w="full"
          maxW="md"
          textAlign="left"
          bg={cardBgColor}
          borderRadius="2xl"
          boxShadow={cardShadow}
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.18)"
          p={6}
        >
          <FormLabel htmlFor="baby-age" color="whiteAlpha.800" fontWeight="bold">
            Usia Balita (dalam bulan)
          </FormLabel>
          <Input
            id="baby-age"
            type="number"
            value={babyAge}
            onChange={(e) => setBabyAge(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            borderColor="transparent"
            color="white"
            _hover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
            _focus={{ borderColor: "green.300", boxShadow: "0 0 0 1px green.300" }}
          />
          <Button
            mt={4}
            w="full"
            colorScheme="green"
            isLoading={isLoading}
            onClick={handleFetchAdvice}
          >
            Dapatkan Saran
          </Button>
          {error && <Text color="red.400" mt={2}>{error}</Text>}
        </FormControl>

        {isLoading && (
            <Spinner size="lg" color="green.300" mt={4} />
        )}
        
        {advice && (
          <Box
            w="full"
            maxW="xl"
            bg={cardBgColor}
            borderRadius="2xl"
            boxShadow={cardShadow}
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.18)"
            p={6}
            textAlign="left"
            mt={4}
          >
            <Flex justify="space-between" align="center" mb={2}>
              <Heading size="md" color="whiteAlpha.900">Saran Kediri Sehat:</Heading>
              <Flex gap={2}>
                <IconButton 
                  aria-label={isSpeaking && !isPaused ? "Jeda saran" : "Putar saran"}
                  icon={isSpeaking && !isPaused ? <FaPause /> : <FaPlay />}
                  size="sm"
                  onClick={handleSpeak}
                  colorScheme={isSpeaking ? "orange" : "green"}
                  animation={!isSpeaking && advice ? `${bounce} 1s infinite` : "none"}
                />
                <IconButton 
                  aria-label="Stop saran"
                  icon={<FaStop />}
                  size="sm"
                  onClick={handleStop}
                  colorScheme="red"
                  isDisabled={!isSpeaking && !isPaused}
                />
              </Flex>
            </Flex>
            <Box>
                <ReactMarkdown components={customComponents}>
                    {advice}
                </ReactMarkdown>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
}