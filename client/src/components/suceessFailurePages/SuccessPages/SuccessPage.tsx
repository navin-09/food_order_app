import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Container, Text, Center } from "@mantine/core";

export function Success() {
  const [confettiVisible, setConfettiVisible] = useState(true);

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setConfettiVisible(false);
    }, 8000);

    return () => {
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {confettiVisible && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Confetti />
        </div>
      )}
      <Center
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {/* Center is used for centering the content */}
        <Container size="md">
          <Text component="h2" style={{ fontSize: "32px", margin: "20px 0" }}>
            Thank You
          </Text>
          {/* Add any additional success message or HTML content here */}
          {/* For custom HTML, you can directly use dangerouslySetInnerHTML or create components */}
        </Container>
      </Center>
    </div>
  );
}
