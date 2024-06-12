import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { Link } from "react-router-dom";
import useAuth from "hooks/useAuth";

export default function SignUp() {
  const { handleSignUpFormChange, signUpForm, handleSignUp, signUpErrors } = useAuth();

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Please fill up the form to sign up !
        </p>
        {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div> */}
        {/* <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        <form onSubmit={handleSignUp}>
          <div className="item-center flex gap-4">
            <div className="grow">
              <InputField
                variant="auth"
                extra="mb-3"
                label="First Name*"
                placeholder=""
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleSignUpFormChange}
                value={signUpForm.firstName}
                required
                errorMsg={signUpErrors.firstName}
              />
            </div>
            <div className="grow">
              <InputField
                variant="auth"
                extra="mb-3"
                label="Last Name"
                placeholder=""
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleSignUpFormChange}
                value={signUpForm.lastName}
              />
            </div>
          </div>

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="email"
            name="email"
            onChange={handleSignUpFormChange}
            value={signUpForm.email}
            required
            errorMsg={signUpErrors.email}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            name="password"
            onChange={handleSignUpFormChange}
            value={signUpForm.password}
            required
            errorMsg={signUpErrors.password}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Confirm Password*"
            placeholder="Confirm Password"
            id="confirm-password"
            type="password"
            name="cpassword"
            onChange={handleSignUpFormChange}
            value={signUpForm.cpassword}
            required
            errorMsg={signUpErrors.cpassword}
          />

          {/* Checkbox */}
          <div className="my-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox required />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                I agree with the terms and conditions
              </p>
            </div>
          </div>

          <button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 flex items-center">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Already have an account ?
          </span>
          <Link
            to="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
