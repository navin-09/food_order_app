import {
  TextInput,
  PasswordInput,
  Anchor,
  Text,
  Container,
  Group,
  Button,
  Card,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../ApiService";
import CustomLoader from "../BaseComponents/Loader/CustomLoader";
import { Logo } from "../../constant";
import { useAuth } from "../../contexts/AuthContext";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "sandula.navin@gmail.com",
    password: "Navin@345",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn(formData);
      console.log(response.data);
      if (response.success) {
        setSubmitStatus("success");
        login(response.accessToken, response.refreshToken);
        navigate("/catalog");
      }
    } catch (error: any) {
      setSubmitStatus("failure");
      setFailureMessage(
        error.response?.data.error || "An error occurred during sign-in."
      );
      console.error("Error signing in:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CustomLoader message="Signing In..."></CustomLoader>;
  }

  return (
    <Container size={420} my={40}>
      <>
        <Card withBorder shadow="md" p={30} mt={30} radius="md" bg={"#ffff"}>
          <div style={{ height: "145px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img alt="AInterviewLogo" src={Logo} height={30} />
            </div>

            <Text ta="center" size="30px" fw={900} mb={30} mt={20}>
              Sign In
            </Text>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Do not have an account yet?{" "}
              <Anchor<"a"> href="/signup" fw={700} size="sm">
                Create account
              </Anchor>
            </Text>
          </div>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            name="email"
            onChange={handleChange}
            defaultValue={formData.email}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="password"
            onChange={handleChange}
            defaultValue={formData.password}
          />
          {submitStatus === "failure" && (
            <span className="text-danger mt-2" style={{ color: "red" }}>
              {failureMessage}
            </span>
          )}
          <Group justify="space-between" mt="lg">
            <p></p>
            <Anchor<"a"> href="/forgot_password" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Sign in
          </Button>
        </Card>
      </>
    </Container>
  );
}
