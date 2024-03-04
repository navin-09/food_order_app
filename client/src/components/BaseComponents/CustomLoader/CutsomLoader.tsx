// components/CustomLoader.jsx
import { Center, Loader, Text } from "@mantine/core";

const CustomLoader = ({ message = "Loading..." }) => {
  return (
    <Center style={{ height: "100vh", flexDirection: "column" }}>
      <Loader size="xl" />
      <Text mt="md">{message}</Text>
    </Center>
  );
};

export default CustomLoader;
