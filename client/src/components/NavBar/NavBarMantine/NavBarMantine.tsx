import {
  Group,
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./NavBar.module.scss";
import { Logo } from "../../../constant";
import { useNavigate } from "react-router-dom";

export function NavBarMantine({ children }: any) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("signin");
  };
  const handleSignUp = () => {
    navigate("signup");
  };
  function handleClick() {
    navigate("/");
  }
  return (
    <Box>
      <header className={classes.header} style={{ backgroundColor: "#C7C8CC" }}>
        <Group justify="space-between" h="100%">
          <Group
            typeof="button"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <img src={Logo} height={40} width={40} alt="food order app" />
            <Title size={30}>Food Order App</Title>
          </Group>

          <Group
            h="100%"
            gap={0}
            visibleFrom="sm"
            style={{
              width: "500px",
              display: "flex",
              justifyContent: "center",
              borderRadius: 40,
            }}
          ></Group>

          <Group visibleFrom="sm">
            <Button variant="default" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/home" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" onClick={handleSignIn}>
              Log in
            </Button>
            <Button onClick={handleSignUp}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
      <div>{children}</div>
    </Box>
  );
}
