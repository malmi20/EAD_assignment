import { fireEvent, render, screen, waitFor  } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import RouteManager from "../pages/RouteManager";
import {
  fetchBusDetails,
  fetchBusRoutes,
  fetchAssignedBusRouteDetails,
} from "../services/busService";
import {
  assignedBusRouteDetailsMockData,
  busDetailsMockData,
  busRoutesMockData,
} from "../mockData/RouteManager";
import { AppContext } from "../context/AuthContext";

import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

const contextMockValue = {
  isAuthenticated: true,
  handleSignIn: jest.fn(),
  handleSignOut: jest.fn(),
  user: null,
};
jest.mock("../components/custom/ToastMessage", () => ({
  notify: jest.fn(),
}));

jest.mock("../services/busService", () => ({
  fetchBusRoutes: jest.fn(),
  fetchBusDetails: jest.fn(),
  fetchAssignedBusRouteDetails: jest.fn(),
  saveAssignedBusRouteDetails: jest.fn(),
}));

describe("RouteManager Component test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //check whether if details of the RouteManager component render correctly
  it("should render RouteManager component correctly", async () => {
    fetchBusDetails.mockResolvedValue(busDetailsMockData);
    fetchBusRoutes.mockResolvedValue(busRoutesMockData);
    fetchAssignedBusRouteDetails.mockResolvedValue(
      assignedBusRouteDetailsMockData
    );
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <RouteManager />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation
    expect(screen.getByText("Routing Management")).toBeInTheDocument();
    expect(screen.getByText("Route")).toBeInTheDocument();
    expect(screen.getByTestId("busno-element")).toBeInTheDocument();
    expect(screen.getByText("Start Date Time")).toBeInTheDocument();
  });

  //check whether it gives an error when click on Add button without filling the details
  it("should show validation error when click on Add button without filling the details", async () => {
    fetchBusDetails.mockResolvedValue(busDetailsMockData);
    fetchBusRoutes.mockResolvedValue(busRoutesMockData);
    fetchAssignedBusRouteDetails.mockResolvedValue(
      assignedBusRouteDetailsMockData
    );
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <RouteManager />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    fireEvent.click(screen.getByText("Add"));
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation
    await waitFor(() => {
      expect(screen.getByText("Route required.")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Bus No required.")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Start Date Time required.")).toBeInTheDocument();
    });
  });

  //check whether if the search option of the routeManager page will be able to search by route id
  it("should able to search by route id", async () => {
    fetchBusDetails.mockResolvedValue(busDetailsMockData);
    fetchBusRoutes.mockResolvedValue(busRoutesMockData);
    fetchAssignedBusRouteDetails.mockResolvedValue(
      assignedBusRouteDetailsMockData
    );
    render(
      <>
        <MemoryRouter>
          <AppContext.Provider value={contextMockValue}>
            <RouteManager />
          </AppContext.Provider>
        </MemoryRouter>
      </>
    );
    await act(() => Promise.resolve()); // Flush microtasks used by Formik validation
    fireEvent.change(screen.getByTestId("search-element"), {
      target: { value: "138" },
    });
    await act(() => Promise.resolve());
    const gridCell = screen.getAllByRole("gridcell");
    // no of column items + action column
    // it will have busNo, routeId, from, to, start_date_time, action
    // 1 row
    expect(gridCell).toHaveLength(6);

    fireEvent.change(screen.getByTestId("search-element"), {
      target: { value: "" },
    });
    await act(() => Promise.resolve());
    const gridCell1 = screen.getAllByRole("gridcell");
    // no of column items + action column
    // it will have busNo, routeId, from, to, start_date_time, action
    // 2 rows
    expect(gridCell1).toHaveLength(12);
  });
});
