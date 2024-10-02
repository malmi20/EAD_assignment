import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import SignIn from "../components/auth/SignIn";
import { login } from "../services/userService";
import {
  signInIncorrectCredentialsMockData,
  signInMockData,
  signInUserNotFoundMockData,
} from "../mockData/signin";
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
  login: jest.fn(),
}));

describe("SignIn Component test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //check whether if the login component render correctly with sign in, email, password
  it("should render login component correctly", async () => {
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignIn />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  //check whether if it shows the error when click on signin button without filling email and password
  it("should show validation error when click on signin button without filling email and password", async () => {
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignIn />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.click(screen.getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  //check whether if it shows the toast error of Incorrect email or password when signing in with unknown email
  it("should show toast error of Incorrect email or password when signing in with unknown email", async () => {
    login.mockResolvedValue(signInUserNotFoundMockData);
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignIn />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "shevin1244@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345675" },
    });
    fireEvent.click(screen.getByText("Sign In"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation(link : https://github.com/jaredpalmer/formik/issues/1543#issuecomment-1755444103)
    await waitFor(async () => {
      expect(notify).toHaveBeenCalledWith(
        "error",
        "Incorrect username or password."
      );
    });
  });

  //check whether if it shows the toast error of Incorrect email or password when signing in with incorrect password
  it("should show toast error of Incorrect email or password when signing in with incorrect password", async () => {
    login.mockResolvedValue(signInIncorrectCredentialsMockData);
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignIn />
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
    fireEvent.click(screen.getByText("Sign In"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation(link : https://github.com/jaredpalmer/formik/issues/1543#issuecomment-1755444103)
    await waitFor(async () => {
      expect(notify).toHaveBeenCalledWith(
        "error",
        "Incorrect username or password."
      );
    });
  });
  
  //check whether if it shows the successfully login message when signing in with correct password & emails
  it("should show login successful message when signing in with correct password & email", async () => {
    login.mockResolvedValue(signInMockData);
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <SignIn />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "shevin12@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456668" },
    });
    fireEvent.click(screen.getByText("Sign In"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation(link : https://github.com/jaredpalmer/formik/issues/1543#issuecomment-1755444103)
    await waitFor(async () => {
      expect(notify).toHaveBeenCalledWith("success", "Login successful.");
    });
  });
});
