import * as adminModule from "../../utils/admin-actions"; 
import { supabaseAdmin } from "../../utils/supabase/admin";

jest.mock("../../utils/supabase/admin", () => ({
  supabaseAdmin: {
    auth: {
      admin: {
        listUsers: jest.fn(),
        createUser: jest.fn(),
        deleteUser: jest.fn(),
        updateUserById: jest.fn(),
      },
    },
  },
}));

describe("adminUsers server functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("returns mapped users on success", async () => {
      (supabaseAdmin.auth.admin.listUsers as jest.Mock).mockResolvedValue({
        data: {
          users: [
            { id: "1", email: "a@example.com", user_metadata: { role: "admin" } },
            { id: "2", email: null, user_metadata: {} },
          ],
        },
        error: null,
      });

      const users = await adminModule.getAllUsers();
      expect(users).toEqual([
        { id: "1", email: "a@example.com", role: "admin" },
        { id: "2", email: "", role: "steward" },
      ]);
    });

    it("returns empty array on error", async () => {
      (supabaseAdmin.auth.admin.listUsers as jest.Mock).mockResolvedValue({
        data: null,
        error: { message: "Failed" },
      });

      const users = await adminModule.getAllUsers();
      expect(users).toEqual([]);
    });
  });

  describe("addUser", () => {
    it("creates user successfully with default role", async () => {
      (supabaseAdmin.auth.admin.createUser as jest.Mock).mockResolvedValue({ data: {}, error: null });

      const result = await adminModule.addUser({ email: "test@example.com", password: "pass123" });
      expect(result).toEqual({ success: true });
      expect(supabaseAdmin.auth.admin.createUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "pass123",
        user_metadata: { role: "steward" },
      });
    });

    it("creates user with custom role", async () => {
      (supabaseAdmin.auth.admin.createUser as jest.Mock).mockResolvedValue({ data: {}, error: null });

      const result = await adminModule.addUser({ email: "admin@example.com", password: "pass123", role: "admin" });
      expect(result).toEqual({ success: true });
      expect(supabaseAdmin.auth.admin.createUser).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "pass123",
        user_metadata: { role: "admin" },
      });
    });

    it("returns error on Supabase failure", async () => {
      (supabaseAdmin.auth.admin.createUser as jest.Mock).mockResolvedValue({ data: null, error: { message: "Failed" } });

      const result = await adminModule.addUser({ email: "fail@example.com", password: "pass123" });
      expect(result).toEqual({ success: false, error: "Failed" });
    });

    it("returns error on thrown exception", async () => {
      (supabaseAdmin.auth.admin.createUser as jest.Mock).mockImplementation(() => { throw new Error("Boom"); });

      const result = await adminModule.addUser({ email: "error@example.com", password: "pass123" });
      expect(result).toEqual({ success: false, error: "Boom" });
    });
  });

  describe("deleteUser", () => {
    it("deletes user successfully", async () => {
      (supabaseAdmin.auth.admin.deleteUser as jest.Mock).mockResolvedValue({ error: null });

      const result = await adminModule.deleteUser("user1");
      expect(result).toEqual({ success: true });
      expect(supabaseAdmin.auth.admin.deleteUser).toHaveBeenCalledWith("user1");
    });

    it("returns error on Supabase failure", async () => {
      (supabaseAdmin.auth.admin.deleteUser as jest.Mock).mockResolvedValue({ error: { message: "Failed" } });

      const result = await adminModule.deleteUser("user2");
      expect(result).toEqual({ success: false, error: "Failed" });
    });

    it("returns error on thrown exception", async () => {
      (supabaseAdmin.auth.admin.deleteUser as jest.Mock).mockImplementation(() => { throw new Error("Boom"); });

      const result = await adminModule.deleteUser("user3");
      expect(result).toEqual({ success: false, error: "Boom" });
    });
  });

  describe("updateUser", () => {
    it("updates user successfully with password", async () => {
      (supabaseAdmin.auth.admin.updateUserById as jest.Mock).mockResolvedValue({ data: { id: "1" }, error: null });

      const result = await adminModule.updateUser({ id: "1", email: "a@example.com", password: "newpass", role: "admin" });
      expect(result).toEqual({ success: true, data: { id: "1" } });
      expect(supabaseAdmin.auth.admin.updateUserById).toHaveBeenCalledWith("1", {
        email: "a@example.com",
        password: "newpass",
        user_metadata: { role: "admin" },
      });
    });

    it("updates user successfully without password", async () => {
      (supabaseAdmin.auth.admin.updateUserById as jest.Mock).mockResolvedValue({ data: { id: "2" }, error: null });

      const result = await adminModule.updateUser({ id: "2", email: "b@example.com", role: "steward" });
      expect(result).toEqual({ success: true, data: { id: "2" } });
      expect(supabaseAdmin.auth.admin.updateUserById).toHaveBeenCalledWith("2", {
        email: "b@example.com",
        user_metadata: { role: "steward" },
      });
    });

    it("returns error on Supabase failure", async () => {
      (supabaseAdmin.auth.admin.updateUserById as jest.Mock).mockResolvedValue({ data: null, error: { message: "Failed" } });

      const result = await adminModule.updateUser({ id: "3", email: "fail@example.com", role: "steward" });
      expect(result).toEqual({ success: false, error: "Failed" });
    });

    it("returns error on thrown exception", async () => {
      (supabaseAdmin.auth.admin.updateUserById as jest.Mock).mockImplementation(() => { throw new Error("Boom"); });

      const result = await adminModule.updateUser({ id: "4", email: "error@example.com", role: "steward" });
      expect(result).toEqual({ success: false, error: "Boom" });
    });
  });
});
