import { Card, Image, Text, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchOrders, getUserData } from "../../ApiService";
import { getToken } from "../../constant";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = getToken();

  useEffect(() => {
    async function fetchUserOrders() {
      const user = await getUserData();

      const userOrders = await fetchOrders(user.data.id);
      setOrders(userOrders);
    }
    fetchUserOrders();
  }, [token]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Your Orders</h1>
      {orders.map((order: any) => (
        <Card key={order.id} style={{ width: "80%", marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text size="xl">Order ID: {order.id}</Text>
            <Text size="lg">Total Price: ${order.totalPrice}</Text>
            <Text size="lg">Status: {order.status}</Text>
            <Divider style={{ width: "100%" }} />
            <div style={{ marginTop: "20px" }}>
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  style={{ display: "flex", marginBottom: "10px" }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Image
                      src={item.dish.image}
                      alt={item.dish.name}
                      width={100}
                    />
                  </div>
                  <div>
                    <Text size="lg">{item.dish.name}</Text>
                    <Text size="sm">Price: ${item.price}</Text>
                    <Text size="sm">Quantity: {item.quantity}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
