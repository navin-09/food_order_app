import React, { useEffect, useState } from "react";
import { Card, Image, Text, Group, Button } from "@mantine/core";
import classes from "./ArticleCard.module.scss";
import { addDishCart, getUserData } from "../../../ApiService";

type Product = {
  id: string;
  name: string;
  price: number;
  cuisine: string;
  type: string;
  subCategory: string;
  description: string;
  image: string;
  createdAt: { $date: string };
  updatedAt: { $date: string };
};

type ArticleCardProps = {
  product: any;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(
    product.quantityInCart ? product.quantityInCart : 0
  );
  const [user, setUser]: any = useState({});
  // console.log({ product });
  const linkProps = {
    href: "#", // Placeholder link URL
    target: "_blank",
    rel: "noopener noreferrer",
  };
  useEffect(() => {
    async function getuser() {
      const response = await getUserData();
      setUser(response.data);
    }
    getuser();
  }, [quantity]);

  const handleIncrement = async () => {
    setQuantity(quantity + 1);
    addDishCart({
      dishId: product?.id,
      quantity: quantity + 1,
      userId: user.id,
    });
  };

  const handleDecrement = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
      addDishCart({
        dishId: product?.id,
        quantity: quantity - 1,
        userId: user.id,
      });
    }
  };

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      m={10}
      w={290}
      h={450}
    >
      <Card.Section>
        <a {...linkProps}>
          <Image src={product.image} height={280} />
        </a>
      </Card.Section>

      <Text className={classes.title} component="a" {...linkProps}>
        {product.name}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={4}>
        {product.description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Text size="sm">${product.price}</Text>
        <Group gap={8}>
          <Button onClick={handleDecrement}>-</Button>
          <Text>{quantity}</Text>
          <Button onClick={handleIncrement}>+</Button>
        </Group>
      </Group>
    </Card>
  );
};
