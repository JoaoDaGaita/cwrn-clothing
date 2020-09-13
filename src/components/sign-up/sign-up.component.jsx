import React, { useState, useEffect } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

const SingUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.toString() !== confirmPassword.toString()) {
      alert("passwords don't macth");
      return;
    }

    try {
      let user = await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          if (userCredentials.user) {
            userCredentials.user.updateProfile({
              displayName: displayName.toString(),
            });
          }
        });

      await createUserProfileDocument(user);
      setConfirmPassword("");
      setDisplayName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDisplayName(displayName);
  }, [displayName]);

  useEffect(() => {
    setEmail(email);
  }, [email]);

  useEffect(() => {
    setPassword(password);
  }, [password]);

  useEffect(() => {
    setConfirmPassword(confirmPassword);
  }, [confirmPassword]);

  const handleChangeName = (event) => {
    setDisplayName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChangeName}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};
export default SingUp;
