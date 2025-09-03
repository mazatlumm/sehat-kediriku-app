import React, { useState, useEffect } from "react";
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
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FaPlay, FaPause, FaStop, FaTrash } from "react-icons/fa";
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

const cleanMarkdownText = (text) => {
  return text
    .replace(/###\s/g, ' ')
    .replace(/##\s/g, ' ')
    .replace(/#\s/g, ' ')
    .replace(/\*\*/g, '')
    .replace(/-\s/g, '')
    .replace(/\*/g, '')
    .replace(/\n/g, ' ');
};

export default function Pregnancy() {
  const [pregnancyWeek, setPregnancyWeek] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("pregnancyAdviceHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage:", e);
    }
  }, []);

  const handleFetchAdvice = async () => {
    if (!pregnancyWeek || isNaN(parseInt(pregnancyWeek))) {
      setError("Masukkan usia kehamilan yang valid.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAdvice("");

    try {
      const prompt = `Berikan saran kesehatan yang rinci dan terstruktur untuk ibu hamil pada minggu ke-${pregnancyWeek}. Gunakan format markdown dengan poin-poin penting seperti: \n\n### Pola Makan \n- Konsumsi makanan seimbang... \n\n### Olahraga yang Aman \n- Lakukan jalan santai... \n\n### Tanda yang Harus Diwaspadai \n- Hubungi dokter jika...`;

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
        const newAdvice = {
          id: Date.now(),
          week: pregnancyWeek,
          date: new Date().toLocaleString(),
          text: data.data,
        };
        const updatedHistory = [newAdvice, ...history];
        setHistory(updatedHistory);
        localStorage.setItem("pregnancyAdviceHistory", JSON.stringify(updatedHistory));
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
        const cleanedText = cleanMarkdownText(advice);
        const utterance = new SpeechSynthesisUtterance(cleanedText);
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

  const handleLoadHistory = (item) => {
    setAdvice(item.text);
    setSelectedHistoryId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("pregnancyAdviceHistory", JSON.stringify(updatedHistory));
    if (selectedHistoryId === id) {
      setAdvice("");
      setSelectedHistoryId(null);
    }
  };

  const bgColor = "gray.900";
  const subHeadingColor = "gray.400";
  const cardBgColor = "rgba(45, 55, 72, 0.4)";
  const cardShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";

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
            Info Ibu Hamil
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color={subHeadingColor}>
            Dapatkan saran kesehatan khusus untuk usia kehamilan Anda.
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
          <FormLabel htmlFor="pregnancy-week" color="whiteAlpha.800" fontWeight="bold">
            Usia Kehamilan (dalam minggu)
          </FormLabel>
          <Input
            id="pregnancy-week"
            type="number"
            value={pregnancyWeek}
            onChange={(e) => setPregnancyWeek(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            borderColor="transparent"
            color="white"
            _hover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
            _focus={{ borderColor: "cyan.300", boxShadow: "0 0 0 1px cyan.300" }}
          />
          <Button
            mt={4}
            w="full"
            colorScheme="cyan"
            isLoading={isLoading}
            onClick={handleFetchAdvice}
          >
            Dapatkan Saran
          </Button>
          {error && <Text color="red.400" mt={2}>{error}</Text>}
        </FormControl>

        {isLoading && (
            <Spinner size="lg" color="cyan.300" mt={4} />
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
                  colorScheme={isSpeaking ? "orange" : "cyan"}
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

        {history.length > 0 && (
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
            mt={6}
          >
            <Heading size="md" color="whiteAlpha.900" mb={4}>
              Riwayat Saran
            </Heading>
            <VStack spacing={4} align="stretch">
              {history.map((item) => (
                <Flex
                  key={item.id}
                  p={4}
                  bg="rgba(255, 255, 255, 0.08)"
                  borderRadius="lg"
                  justifyContent="space-between"
                  alignItems="center"
                  _hover={{ bg: "rgba(255, 255, 255, 0.15)" }}
                  transition="background-color 0.2s"
                  border={selectedHistoryId === item.id ? "2px solid #69D2A3" : "none"}
                >
                  <Box flex="1">
                    <Text fontWeight="bold" color="whiteAlpha.900">
                      Saran untuk usia kehamilan {item.week} minggu
                    </Text>
                    <Text fontSize="sm" color="whiteAlpha.600">
                      {item.date}
                    </Text>
                  </Box>
                  <Flex gap={2}>
                    <IconButton
                      aria-label="Muat saran"
                      icon={<FaPlay />}
                      size="sm"
                      onClick={() => handleLoadHistory(item)}
                      colorScheme="green"
                    />
                    <IconButton
                      aria-label="Hapus saran"
                      icon={<FaTrash />}
                      size="sm"
                      onClick={() => handleDeleteHistory(item.id)}
                      colorScheme="red"
                    />
                  </Flex>
                </Flex>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
}