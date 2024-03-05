import { Card, Image, Text, Group, Button, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { addDishCart, fetchCartData, getUserData } from "../../ApiService";
import { getToken } from "../../constant";

export const CartDetails = () => {
  const token = getToken();
  const [cartItems, setCart]: any = useState([]);
  const [userId, setuserId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function getDishes() {
      const user = await getUserData();
      setuserId(user.data.id);
      const cartData = await fetchCartData(user.data.id);
      console.log({ cartData });
      setCart(cartData.items);
      calculateTotalPrice(cartData.items);
    }
    getDishes();
  }, [token]);

  const calculateTotalPrice = (items: any[]) => {
    const totalPrice = items.reduce(
      (acc: any, item: any) =>
        acc + (item.dish ? item.dish.price : 1) * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  };

  const handleIncrement = async (item: any) => {
    const updatedQuantity = item.quantity + 1;
    addDishCart({
      dishId: item?.dish?.id,
      quantity: updatedQuantity,
      userId: userId,
    });
    setCart((prevCart: any) => {
      const updatedCart = prevCart.map((cartItem: any) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: updatedQuantity }
          : cartItem
      );
      calculateTotalPrice(updatedCart);
      return updatedCart;
    });
  };

  const handleDecrement = async (item: any) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      addDishCart({
        dishId: item?.dish?.id,
        quantity: updatedQuantity,
        userId: userId,
      });
      setCart((prevCart: any) => {
        const updatedCart = prevCart.map((cartItem: any) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: updatedQuantity }
            : cartItem
        );
        calculateTotalPrice(updatedCart);
        return updatedCart;
      });
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Your Cart</h1>
      <div style={{ display: "flex", flexDirection: "row", margin: 10 }}>
        <Card>
          {cartItems ? (
            cartItems.map((item: any) =>
              item.dish ? (
                <div key={item.id} style={{ marginBottom: "20px" }}>
                  <Group
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div style={{ width: 250, height: 250 }}>
                        <Image src={item.dish?.image} />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        <Text size="lg">
                          <b>Name:</b> {item.dish?.name}
                        </Text>
                      </div>
                      <div>
                        <Text size="sm">
                          <b>Details:</b> {item.dish?.description}
                        </Text>
                      </div>
                      <div>
                        <Text size="sm">
                          <b>Price:</b> ${item.dish?.price}
                        </Text>
                      </div>
                      <div>
                        <Group justify="space-between">
                          <Group>
                            <Button onClick={() => handleDecrement(item)}>
                              -
                            </Button>
                            <Text>{item.quantity}</Text>
                            <Button onClick={() => handleIncrement(item)}>
                              +
                            </Button>
                          </Group>
                        </Group>
                      </div>
                    </div>
                  </Group>
                </div>
              ) : (
                <></>
              )
            )
          ) : (
            <div>No Items in the Cart</div>
          )}
        </Card>
        <Divider></Divider>
        <div>
          <Card w={300}>
            <div>
              <Text
                size="lg"
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                Total: ${totalPrice}
              </Text>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="filled"
                style={{
                  width: 200,
                  marginTop: "20px",
                }}
              >
                Pay Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
