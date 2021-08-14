import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { RegisterFormData, RegisterFormError } from "./RegisterType";
import ReactLoading from "react-loading";
import emailRegex from "../../validators/isEmail";
import { Link } from "react-router-dom";
import { auth } from "../../utils/fbInit";
import * as styles from "./Register.module.css";
import findRegisterFormErrors from "./helper";

const INITIAL_FORM_STATE = { agreeTerm: false } as RegisterFormData;

function Register() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({} as RegisterFormError);

  const setField = (field: string, value: string | boolean) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    setErrors({} as RegisterFormError);
    const newErrors = findRegisterFormErrors(form);
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      return setErrors(newErrors);
    }
    try {
      await auth.createUserWithEmailAndPassword(form.email, form.password);
    } catch (err) {
      setLoading(false);
      const authError = err as firebase.default.auth.Error;
      const ambiguousError =
        authError.code === "auth/email-already-in-use"
          ? "Email already in use"
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
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicCheckbox"
          style={{ display: "flex" }}
        >
          <Form.Check
            type="checkbox"
            className={styles.checkbox}
            onClick={() => setField("agreeTerm", !form.agreeTerm)}
            isInvalid={!!errors.agreeTerm}
          />
          <Form.Label>Agree Term of Services</Form.Label>
          <Form.Control.Feedback type="invalid">
            {errors.agreeTerm}
          </Form.Control.Feedback>
        </Form.Group>
        {errors.server ? (
          <Alert variant="danger" className={styles.error}>
            {errors.server}
          </Alert>
        ) : null}
        <div className={styles.buttons}>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? <ReactLoading type="spin" /> : "Register"}
          </Button>
          <Button variant="link">
            <Link to="/">Login</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
