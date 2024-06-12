import { useState } from "react";

const initalSignupState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cpassword: "",
};

const initialSignInState = {
  email: "",
  password: "",
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ?? false
  );
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({ ...initialSignInState });
  const [signUpForm, setSignupForm] = useState({ ...initialSignInState });
  const [signUpErrors, setSignUpErrors] = useState({});

  const handleSignUpFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupForm({
      ...signUpForm,
      [name]: value,
    });
  };

  const handleSignInChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignInForm({
      ...signInForm,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const errors = {};
    if (!signUpForm.firstName) errors.firstName = "First Name is required";
    if (!signUpForm.email) errors.email = "Email is required";
    if (!signUpForm.password) errors.password = "Password is required";
    if (signUpForm.password && signUpForm.password.length < 8)
      errors.password = "Password must have minimum 8 Charaters";
    if (!signUpForm.cpassword)
      errors.cpassword = "Confimr Password is required";
    if (
      signUpForm.password &&
      signUpForm.cpassword &&
      signUpForm.cpassword !== signUpForm.password
    )
      errors.cpassword = "Password and Confirm Password should be same";
    setSignUpErrors(errors);
    if (Object.keys(errors).length === 0) {
      // API call to sign up
      console.log("api call");
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (signInForm.email && signInForm.password) {
      // API call to sign in
    }
  }

  return {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    handleSignUpFormChange,
    signUpForm,
    handleSignUp,
    signUpErrors,
    signInForm,
    handleSignInChange,
    handleSignIn
  };
};

export default useAuth;
