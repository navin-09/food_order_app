import React from "react";
import { Box, Text, Button, Grid } from "@mantine/core";
import { HomeImage, REACT_APP_URL } from "../../constant";

export const SampleHomePage = () => {
  const hanleClick = () => {
    window.location.href = `${REACT_APP_URL}/signin`; // Navigate to different domain
  };
  return (
    <div
      style={{
        backgroundImage: `url(${HomeImage})`,
        backgroundColor: "red",
        backgroundSize: "cover",
        minHeight: "90vh",
        maxHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box style={{ width: "50%", textAlign: "center", color: "white" }}>
          <Text component="h1" size="xl" color="white">
            Craving Delicious Food?
          </Text>
          <Text size="md">
            Order from your favorite restaurants and get it delivered to your
            doorstep.
          </Text>
          <Grid justify="center">
            <Grid.Col span={12}>
              <Button variant="contained" onClick={hanleClick} size="lg">
                Order Now
              </Button>
            </Grid.Col>
            <Grid.Col span={12} mt={10}>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
