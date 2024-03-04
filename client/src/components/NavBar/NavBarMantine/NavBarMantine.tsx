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
  HoverCard,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconGardenCart,
  IconLogout,
  IconMenuOrder,
  IconCaravan,
} from "@tabler/icons-react";
import classes from "./NavBar.module.scss";
import { Logo, getToken } from "../../../constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export function NavBar({ children }: any) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { logout } = useAuth();
  const token = getToken();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleNavigationClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box>
      <header className={classes.header} style={{ backgroundColor: "#C7C8CC" }}>
        <Group justify="space-between" h="100%">
          <Group
            typeof="button"
            style={{ cursor: "pointer" }}
            onClick={handleHomeClick}
          >
            <img src={Logo} height={30} width={30} alt="food order app" />
            <Title size={25}>Food Order App</Title>
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

          {!token ? (
            <Group justify="center" px="md">
              <Button variant="default" onClick={handleSignIn}>
                Log in
              </Button>
              <Button onClick={handleSignUp}>Sign up</Button>
            </Group>
          ) : (
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Center inline>
                  <Button rightSection={<IconChevronDown />}>Profile</Button>
                </Center>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ width: 200, overflow: "hidden" }}>
                <Button
                  variant="transparent"
                  leftSection={<IconCaravan />}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  Cart
                </Button>
                <Divider my="sm" />
                <Button
                  variant="transparent"
                  leftSection={<IconMenuOrder />}
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  Orders
                </Button>
                <Divider my="sm" />
                <Button
                  variant="transparent"
                  leftSection={<IconLogout />}
                  onClick={() => {
                    logout();
                    navigate("/home");
                  }}
                >
                  Logout
                </Button>
              </HoverCard.Dropdown>
            </HoverCard>
          )}

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

          <UnstyledButton className={classes.link} onClick={handleHomeClick}>
            Home
          </UnstyledButton>
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

          {!token ? (
            <Group justify="center">
              <Button variant="default" onClick={handleSignIn}>
                Log in
              </Button>
              <Button onClick={handleSignUp}>Sign up</Button>
            </Group>
          ) : (
            <Group justify="center">
              <Button
                leftSection={<IconGardenCart></IconGardenCart>}
                onClick={() => handleNavigationClick("/cart")}
              >
                Cart
              </Button>
              <Button
                leftSection={<IconGardenCart></IconGardenCart>}
                onClick={() => handleNavigationClick("/home")}
              >
                Log Out
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
      <div>{children}</div>
    </Box>
  );
}
