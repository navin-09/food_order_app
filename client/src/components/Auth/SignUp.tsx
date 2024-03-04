import { Paper, TextInput, Button, Title, Text, Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.scss";
import { useState } from "react";
import { PasswordStrength } from "../BaseComponents/PassowrdValidation";
import CustomLoader from "../BaseComponents/Loader/CustomLoader";
import { signup } from "../../ApiService";

export function SignUp() {
  const [emailError, setEmailError] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await signup(formData);
      console.log({ response });
      navigate("/registrationSuccess");
    } catch (error: any) {
      console.log(error.response);

      if (error?.response?.status === 409) {
        setEmailError("Email already exists. Please choose a different email.");
      } else {
        const errorMessage =
          error.response?.data?.error || "Unexpected error occurred";
        setFailureMessage(errorMessage);
      }
    } finally {
      setLoading(false); // Stop loading after the API call is complete
    }
  };

  return (
    <div className={classes.wrapper}>
      {loading ? (
        <CustomLoader message="Signing Up..." /> // Use CustomLoader with a custom message
      ) : (
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center">
            Sign Up
          </Title>
          <TextInput
            label="Full Name"
            required
            placeholder="full name"
            mb={10}
            name="name"
            onChange={handleChange}
          />
          <TextInput
            required
            label="Email address"
            placeholder="hello@gmail.com"
            mb={10}
            name="email"
            onChange={handleChange}
            error={emailError}
          />

          <PasswordStrength onchange={handleChange} />

          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Sign up
          </Button>
          {failureMessage && (
            <div className="text-danger" style={{ color: "red" }}>
              {failureMessage}
            </div>
          )}
          <Text ta="center" mt="md">
            Don't have an account?{" "}
            <Anchor<"a"> href="/signin" fw={700}>
              Login
            </Anchor>
          </Text>
        </Paper>
      )}
    </div>
  );
}
