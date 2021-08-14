import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterFormError } from "./RegisterType";
import ReactLoading from "react-loading";
import emailRegex from "../../validators/isEmail";
import { Link } from "react-router-dom";
import { auth } from "../../utils/fbInit";

function Register() {
  const [form, setForm] = useState({} as RegisterFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterFormError>(
    {} as RegisterFormError
  );
  const setField = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const findFormErrors = () => {
    const { email, password } = form;
    const newErrors = {} as LoginFormError;
    if (!email || email === "") newErrors.email = "Required";
    else if (!emailRegex.test(email))
      newErrors.email = "Please enter valid email";
    if (!password || password === "") newErrors.password = "Required";
    return newErrors;
  };
  console.log(errors);
  const handleSubmit = async () => {
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      return setErrors(newErrors);
    }
    try {
      await auth.signInWithEmailAndPassword(form.email, form.password);
    } catch (err) {
      const authError = err as firebase.default.auth.Error;
      const ambiguousError =
        authError.code === "auth/user-not-found" ||
        authError.code === "auth/wrong-password"
          ? "Invalid email or password"
          : "";
      setErrors({
        ...errors,
        server: ambiguousError || "Something went wrong",
      });
    }
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            size="lg"
            required
            type="email"
            onChange={(e) => setField("email", e.target.value)}
            placeholder="Enter email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            onChange={(e) => setField("password", e.target.value)}
            placeholder="Password"
            isInvalid={!!errors.password}
          />
        </Form.Group>
        {errors.server ? (
          <Alert variant="danger" className={styles.error}>
            {errors.server}
          </Alert>
        ) : null}
        <div className={styles.buttons}>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? <ReactLoading type="spin" /> : "Login"}
          </Button>
          <Button variant="link">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
