import * as queries from "../../utils/supabase/queries"; // adjust path
import { createServerSupabase } from "../../utils/supabase/server";

jest.mock("../../utils/supabase/server", () => ({
  createServerSupabase: jest.fn(),
}));

describe("Supabase site functions", () => {
  const mockFrom = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (createServerSupabase as jest.Mock).mockReturnValue({
      from: mockFrom,
    });
  });

  describe("getSitesOnline", () => {
    it("returns mapped sites on success", async () => {
      const mockData = [
        { namesite: "Alpha", county: "County1", inspectdate: "2025-11-30" },
        { namesite: "Beta", county: null, inspectdate: null },
      ];

      mockFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      });

      const result = await queries.getSitesOnline();

      expect(result).toEqual([
        { id: 1, namesite: "Alpha", county: "County1", inspectdate: "2025-11-30" },
        { id: 2, namesite: "Beta", county: null, inspectdate: null },
      ]);
    });

    it("throws error if Supabase returns error", async () => {
      mockFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: { message: "Failed" } }),
      });

      await expect(queries.getSitesOnline()).rejects.toThrow("Failed");
    });
  });

  describe("getSiteByName", () => {
    it("returns site filtered by name", async () => {
      const mockData = [{ namesite: "Alpha", county: "County1", inspectdate: "2025-11-30" }];

      mockFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      });

      const result = await queries.getSiteByName("Alpha");
      expect(result).toEqual([{ id: 1, namesite: "Alpha", county: "County1", inspectdate: "2025-11-30" }]);
    });

    it("throws error if Supabase fails", async () => {
      mockFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({ data: null, error: { message: "Error" } }),
      });

      await expect(queries.getSiteByName("Alpha")).rejects.toThrow("Error");
    });
  });

  describe("getInspectionDetailsOnline", () => {
    it("returns mapped inspection details", async () => {
      const mockData = [
        {
          namesite: "Alpha",
          _type: "Type1",
          county: "County1",
          _naregion: "Region1",
          inspectdate: "2025-11-30",
          naturalness_score: "High",
          naturalness_details: "Some details",
          notes: "Notes here",
        },
      ];

      mockFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      });

      const result = await queries.getInspectionDetailsOnline("Alpha");

      expect(result).toEqual([
        {
          id: 1,
          namesite: "Alpha",
          _type: "Type1",
          county: "County1",
          _naregion: "Region1",
          inspectdate: "2025-11-30",
          naturalness_score: "High",
          naturalness_details: "Some details",
          notes: "Notes here",
        },
      ]);
    });

    it("throws error if Supabase fails", async () => {
      mockFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: { message: "Failed" } }),
      });

      await expect(queries.getInspectionDetailsOnline("Alpha")).rejects.toThrow("Failed");
    });
  });
});
