import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import SignUp from "../components/auth/SignUp";
import { register } from "../services/userService";
import {
  signUpMockData,
  signUpUserAlreadyExistsMockData,
} from "../mockData/signup";
import { AppContext } from "../context/AuthContext";
import { notify } from "../components/custom/ToastMessage";

import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

const contextMockValue = {
  isAuthenticated: false,
  handleSignIn: jest.fn(),
  handleSignOut: jest.fn(),
  user: null,
};
jest.mock("../components/custom/ToastMessage", () => ({
  notify: jest.fn(),
}));

jest.mock("../services/userService", () => ({
  register: jest.fn(),
}));

describe("SignUp Component test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //check whether the signup component render correctly 
  it("should render signup component correctly", async () => {
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignUp />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Is Bus Owner")).toBeInTheDocument();
  });

  //check whether the validation error wii show when click on Register button without filling email and password
  it("should show validation error when click on Register button without filling email and password", async () => {
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignUp />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.click(screen.getByText("Register"));
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("Confirm Password is required")
      ).toBeInTheDocument();
    });
  });

  //check whether the validation error shows when passwords are less than 8 characters
  it("should show validation error when passwords are less than 8 characters", async () => {
    register.mockResolvedValue(signUpUserAlreadyExistsMockData);
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignUp />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "shevin12@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "224" },
    });
    fireEvent.click(screen.getByText("Register"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation(link : https://github.com/jaredpalmer/formik/issues/1543#issuecomment-1755444103)
    await waitFor(async () => {
      expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
    });
  });

  //check whether it shows validation error when password and confirm passwords are not same
  it("should show validation error when password and confirm passwords are not same", async () => {
    register.mockResolvedValue(signUpUserAlreadyExistsMockData);
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignUp />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "shevin12@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "123273" },
    });
    fireEvent.click(screen.getByText("Register"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation(link : https://github.com/jaredpalmer/formik/issues/1543#issuecomment-1755444103)
    await waitFor(async () => {
      expect(screen.getByText("Passwords must match")).toBeInTheDocument();
    });
  });

  //check whether the toast error appears if User already exists when signing in with incorrect password
  it("should show toast error of User already exists when signing in with incorrect password", async () => {
    register.mockResolvedValue(signUpUserAlreadyExistsMockData);
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignUp />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "shevin12@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByText("Register"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation(link : https://github.com/jaredpalmer/formik/issues/1543#issuecomment-1755444103)
    await waitFor(async () => {
      expect(notify).toHaveBeenCalledWith("error", "User already exists.");
    });
  });
  
  //check whether the it shows User registered successful message when signing up in with correct details
  it("should show User registered successful message when signing up in with correct details", async () => {
    register.mockResolvedValue(signUpMockData);
    const changeState = jest.fn();
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignUp changeState={changeState} />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "shevin12555@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456668" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "123456668" },
    });
    fireEvent.click(screen.getByText("Register"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation(link : https://github.com/jaredpalmer/formik/issues/1543#issuecomment-1755444103)
    await waitFor(async () => {
      expect(notify).toHaveBeenCalledWith(
        "success",
        "User registered successfully."
      );
    });
  });
});
