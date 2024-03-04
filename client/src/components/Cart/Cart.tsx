import { Card, Image, Text, Group, Button, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchCartData, getUserData } from "../../ApiService";
import { getToken } from "../../constant";

export const CartDetails = () => {
  const token = getToken();
  const [cartItems, setCart]: any = useState([]);

  useEffect(() => {
    async function getDishes() {
      const user = await getUserData();
      const cartData = await fetchCartData(user.data.id);
      setCart(cartData.items);
    }
    getDishes();
  }, [token]);

  const totalPrice = cartItems.reduce(
    (acc: any, item: any) => acc + item.dish.price * item.quantity,
    0
  );

  return (
    <Grid>
      <h1>Your Cart</h1>
      <Grid.Col span={4}>
        {cartItems.map((item: any) => (
          <Card key={item.id} shadow="sm">
            <Card.Section>
              <Image src={item.dish.image} height={180} />
            </Card.Section>
            <Text size="lg">{item.dish.name}</Text>
            <Text size="sm">{item.dish.description}</Text>
            <Group justify="space-between">
              <Text size="sm">${item.dish.price}</Text>
              <Group>
                <Button>-</Button>
                <Text>{item.quantity}</Text>
                <Button>+</Button>
              </Group>
            </Group>
          </Card>
        ))}
      </Grid.Col>
      <Grid.Col span={2}>
        <Text size="lg" style={{ fontWeight: "bold", textAlign: "center" }}>
          Total: ${totalPrice}
        </Text>
        <Button variant="filled" fullWidth>
          Pay Now
        </Button>
      </Grid.Col>
    </Grid>
  );
};
