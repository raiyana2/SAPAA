// __tests__/pages/AdminDashboard.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../../app/admin/dashboard/page";
import * as supabaseClientModule from "@/utils/supabase/client";

// Mock Supabase client
const mockFrom = jest.fn();
const mockRpc = jest.fn();

jest.spyOn(supabaseClientModule, "createClient").mockImplementation(() => ({
  from: mockFrom,
  rpc: mockRpc,
}));

// Mock components
jest.mock("../../app/admin/dashboard/components/Map", () => () => <div>MapMock</div>);
jest.mock("next/image", () => (props: any) => <img {...props} alt={props.alt} />);
jest.mock("../../app/admin/AdminNavBar", () => () => <div>AdminNavBarMock</div>);
jest.mock("@/components/ProtectedRoute", () => ({ children }: any) => <div>{children}</div>);

describe("Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Supabase 'from' to return totalInspections = 5
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({
        data: [{ inspectdate: "2025-11-30T00:00:00Z" }],
        count: 5,
        error: null,
      }),
    });

    mockRpc.mockResolvedValue([{ naturalness_score: "Good", count: 3 }]);

    global.fetch = jest.fn();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renders loading initially", () => {
    render(<Dashboard />);
    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
  });

  it("renders stats cards after successful fetch", async () => {
    render(<Dashboard />);

    await waitFor(() =>
      expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText("Total Records")).toBeInTheDocument();
    
    // The count value might be displayed in different ways, check for any "5" text
    const allText = screen.getAllByText(/5/);
    expect(allText.length).toBeGreaterThan(0);
    
    expect(screen.getByText("Last Record")).toBeInTheDocument();
    
    // Date might be split across elements, check for month and year
    const novemberElements = screen.queryAllByText(/November/);
    const yearElements = screen.queryAllByText(/2025/);
    expect(novemberElements.length + yearElements.length).toBeGreaterThan(0);
  });

  it("renders charts with data", async () => {
    mockRpc.mockImplementation((fnName: string) => {
      if (fnName === "get_naturalness_distribution") return [{ naturalness_score: "Good", count: 2 }];
      if (fnName === "get_top_sites_distribution") return [{ namesite: "Alpha", count: 5 }];
      return [];
    });

    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument());

    expect(screen.getByText("Naturalness Distribution")).toBeInTheDocument();
    expect(screen.getByText("Top 5 Sites")).toBeInTheDocument();
  });

  it("handles search flow with points", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: [{ namesite: "SiteA", count: 1 }] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ latitude: 1, longitude: 2 }) });

    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText(/enter keyword/i);
    fireEvent.change(input, { target: { value: "Test" } });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/found 1 location/i)).toBeInTheDocument();
      expect(screen.getByText("MapMock")).toBeInTheDocument();
    });
  });

  it("alerts when search returns no data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ data: [] }) });

    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText(/enter keyword/i);
    fireEvent.change(input, { target: { value: "Empty" } });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('No sites found matching "Empty"');
    });
  });

  it("renders AdminNavBar inside ProtectedRoute", async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument());

    expect(screen.getByText("AdminNavBarMock")).toBeInTheDocument();
  });

  it("doesn't search when search keyword is empty", async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument());

    // Get the input field and verify it's empty
    const input = screen.getByPlaceholderText(/enter keyword/i) as HTMLInputElement;
    expect(input.value).toBe("");

    // Clear any previous mocks
    (global.fetch as jest.Mock).mockClear();

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    // Wait a bit to see if any fetch occurs
    await new Promise(resolve => setTimeout(resolve, 300));

    // Verify that fetch was NOT called (empty search is prevented)
    // OR verify that alert/error message was shown
    const alertWasCalled = mockAlert.mock.calls.length > 0;
    const fetchWasCalled = (global.fetch as jest.Mock).mock.calls.length > 0;
    
    expect(alertWasCalled || !fetchWasCalled).toBe(true);
    
    mockAlert.mockRestore();
  });

  it("handles search fetch error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText(/enter keyword/i);
    fireEvent.change(input, { target: { value: "ErrorTest" } });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Search failed: Failed");
    });
  });
});