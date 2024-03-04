import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Container, Text, Center, Anchor } from "@mantine/core";

export function RegistrationSuccess() {
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
        <Container size="md">
          <Text component="h3" style={{ fontSize: "30px", margin: "20px 0" }}>
            Thank You for registering click here to{" "}
            <Anchor<"a"> style={{ fontSize: "30px" }} href="/signin" fw={700}>
              Login
            </Anchor>
          </Text>
        </Container>
      </Center>
    </div>
  );
}
