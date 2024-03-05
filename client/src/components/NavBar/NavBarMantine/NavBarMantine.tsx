import {
  Group,
  Button,
  Divider,
  Center,
  Box,
  Title,
  HoverCard,
} from "@mantine/core";
import {
  IconLogout,
  IconMenuOrder,
  IconCaravan,
  IconSettings,
} from "@tabler/icons-react";
import classes from "./NavBar.module.scss";
import { Logo, getToken } from "../../../constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export function NavBar({ children }: any) {
  const { logout } = useAuth();
  const token = getToken();
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
                  <Button rightSection={<IconSettings />}>Settings</Button>
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
        </Group>
      </header>

      <div>{children}</div>
    </Box>
  );
}
