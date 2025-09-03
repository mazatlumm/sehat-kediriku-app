import React, { useState, useRef } from "react";
import {
    Box,
    Heading,
    Text,
    VStack,
    Button,
    Image,
    Progress,
    Badge,
    Spinner,
    useToast,
} from "@chakra-ui/react";
import HomeBackground from "../assets/images/background.png";

export default function SkinDetector() {
    const bgColor = "gray.900";
    const subHeadingColor = "gray.400";
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const toast = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleFileChange = (selectedFile) => {
        if (!selectedFile) return;
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setResult(null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        handleFileChange(droppedFile);
    };

    const handleSubmit = async () => {
        if (!file) {
            toast({
                title: "Pilih gambar dulu",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("https://skin-disease.alicestech.com/predict", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            toast({
                title: "Terjadi kesalahan",
                description: "Tidak dapat mengirim gambar ke server",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

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
            overflow="hidden"
            backgroundImage={`url(${HomeBackground})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundAttachment="fixed"
        >
            <VStack spacing={6} w="full" maxW="lg" textAlign="center">
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
                        Deteksi Penyakit Kulit
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} color={subHeadingColor}>
                        Upload foto atau arahkan kamera ponsel ke area kulit yang ingin diperiksa.
                    </Text>
                </Box>

                {/* Custom File Upload */}
                <VStack spacing={4} w="full">
                    <Box
                        onClick={() => fileInputRef.current.click()}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        cursor="pointer"
                        border="2px dashed #69D2A3"
                        borderRadius="md"
                        p={8}
                        w="full"
                        maxW="xs"
                        textAlign="center"
                        _hover={{ bg: "gray.800" }}
                    >
                        {preview ? (
                            <Image src={preview} alt="preview" borderRadius="md" />
                        ) : (
                            <Text color={subHeadingColor}>
                                Klik atau seret gambar ke sini untuk upload
                            </Text>
                        )}
                    </Box>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e.target.files[0])}
                    />

                    <Button
                        colorScheme="teal"
                        size="lg"
                        onClick={handleSubmit}
                        isDisabled={loading}
                    >
                        {loading ? <Spinner size="sm" /> : "Deteksi"}
                    </Button>
                </VStack>

                {/* Hasil */}
                {result && (
                    <Box mt={6} textAlign="center">
                        <Badge colorScheme="green" fontSize="xl" p={2} borderRadius="md">
                            {result.class}
                        </Badge>
                        <Text mt={2} fontSize="sm" color={subHeadingColor}>
                            Confidence: {(result.confidence * 100).toFixed(2)}%
                        </Text>
                        <Progress
                            mt={2}
                            value={result.confidence * 100}
                            size="sm"
                            colorScheme="green"
                            borderRadius="md"
                        />
                    </Box>
                )}
            </VStack>
        </Box>
    );
}
