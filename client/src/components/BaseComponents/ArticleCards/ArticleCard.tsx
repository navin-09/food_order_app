import React from "react";
import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import classes from "./ArticleCard.module.scss";

// Define a type for the article card props
type ArticleCardProps = {
  title: string;
  imageUrl: string;
  content: string;
  authorName: string;
  authorAvatarUrl: string;
  linkUrl: string;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  imageUrl,
  content,
  authorName,
  authorAvatarUrl,
  linkUrl,
}) => {
  const linkProps = {
    href: linkUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      m={10}
      w={350}
      h={470}
    >
      <Card.Section>
        <a {...linkProps}>
          <Image src={imageUrl} height={280} />
        </a>
      </Card.Section>

      <Text className={classes.title} component="a" {...linkProps}>
        {title}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={4}>
        {content}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar src={authorAvatarUrl} size={24} radius="xl" mr="xs" />
          <Text size="sm" inline>
            {authorName}
          </Text>
        </Center>

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
