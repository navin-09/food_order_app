import React from "react";
import { Card, Image, Text, Group, Center, Avatar } from "@mantine/core";
import classes from "./ArticleCard.module.scss";

type Product = {
  _id: { $oid: string };
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
  product: Product;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ product }) => {
  const linkProps = {
    href: "#", // Placeholder link URL
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      m={10}
      w={270}
      h={470}
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
        <Text size="sm">{product.cuisine}</Text>
        <Text size="sm">{product.type}</Text>
        <Text size="sm">{product.subCategory}</Text>
        <Text size="sm">${product.price}</Text>
        {/* <Group gap={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconHeart
              style={{ width: 16, height: 16 }}
              color={theme.colors.red[6]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconBookmark
              style={{ width: 16, height: 16 }}
              color={theme.colors.yellow[7]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare
              style={{ width: 16, height: 16 }}
              color={theme.colors.blue[6]}
            />
          </ActionIcon>
        </Group> */}
      </Group>
    </Card>
  );
};
