import { useState } from "react";
import authService from "services/auth";
import { useNavigate } from 'react-router-dom';
import {useToast} from "@chakra-ui/toast";

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
  const navigate = useNavigate();
  const toast = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ?? false
  );
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({ ...initialSignInState });
  const [signUpForm, setSignupForm] = useState({ ...initalSignupState });
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

  const handleSignUp = async (e) => {
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
      const response = await authService.register({ data: signUpForm})
      if (response.status === 201) {
        toast({
          title: 'Successfully Registered.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate('/auth/sign-in')
      } else if (response.status === 400 ) {
        toast({
          title: response?.data?.message ?? 'Please enter valid data',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (signInForm.email && signInForm.password) {
      const response = await authService.login({ data: signInForm})
      if (response.status === 200) {
        toast({
          title: 'Successfully Logged In.',
          status: 'success',
          duration: 3000,
          position: 'top',
          isClosable: true,
        })
        const { token } = response.data
        localStorage.setItem('token', token)
        navigate('/admin')
      } else if (response.status === 400) {
        toast({
          title: 'Invalid Credentials.',
          description: 'Try changing username or password',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
      }
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
