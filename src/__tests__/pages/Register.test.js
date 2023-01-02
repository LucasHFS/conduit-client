/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../mocks/server.js";

import Register from "../Register";
import { act } from "react-dom/test-utils";
import { API_URL } from "../../services/api.js";
import { AuthProvider } from "../../hooks/useAuth";

describe("Register", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("when success", () => {
    it("creates an account and redirects to login", async () => {
      server.use(
        rest.post(`${API_URL}/users`, (req, res, ctx) => {
          return res(ctx.status(200));
        })
      );

      act(() => {
        render(
          <AuthProvider>
            <Register />
          </AuthProvider>,
          { wrapper: BrowserRouter }
        );
      });

      const usernameInput = screen.getByPlaceholderText(/Username/i);
      const emailInput = screen.getByPlaceholderText(/Email/i);
      const passwordInput = screen.getByPlaceholderText(/Password/i);

      userEvent.type(usernameInput, "lucas");
      userEvent.type(emailInput, "lucas@gmail.com");
      userEvent.type(passwordInput, "P@ssword1");

      await act(async () => {
        await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
      });

      expect(screen.queryByTestId("error-list")).not.toBeInTheDocument();
    });
  });

  describe("when validation error is returned", () => {
    it("returns validation error", async () => {
      server.use(
        rest.post(`${API_URL}/users`, (req, res, ctx) =>
          res(
            ctx.status(422),
            ctx.json({
              errors: {
                email: ["has already been taken"],
                username: ["has already been taken"],
              },
            })
          )
        )
      );

      act(() => {
        render(
          <AuthProvider>
            <Register />
          </AuthProvider>,
          { wrapper: BrowserRouter }
        );
      });

      const usernameInput = screen.getByPlaceholderText(/Username/i);
      const emailInput = screen.getByPlaceholderText(/Email/i);
      const passwordInput = screen.getByPlaceholderText(/Password/i);

      userEvent.type(usernameInput, "lucas");
      userEvent.type(emailInput, "lucas@gmail.com");
      userEvent.type(passwordInput, "P@ssword1");

      userEvent.click(screen.getByRole("button", { name: /sign up/i }));

      expect(
        await screen.findByText("username has already been taken")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("email has already been taken")
      ).toBeInTheDocument();
    });
  });

  describe("when unexpected error is returned", () => {
    it("returns unexpected error", async () => {
      server.use(
        rest.post(`${API_URL}/users`, (req, res, ctx) => res(ctx.status(500)))
      );

      act(() => {
        render(
          <AuthProvider>
            <Register />
          </AuthProvider>,
          { wrapper: BrowserRouter }
        );
      });

      const usernameInput = screen.getByPlaceholderText(/Username/i);
      const emailInput = screen.getByPlaceholderText(/Email/i);
      const passwordInput = screen.getByPlaceholderText(/Password/i);

      userEvent.type(usernameInput, "lucas");
      userEvent.type(emailInput, "lucas@gmail.com");
      userEvent.type(passwordInput, "P@ssword1");

      userEvent.click(screen.getByRole("button", { name: /sign up/i }));

      expect(await screen.findByText("internal error!")).toBeInTheDocument();
    });
  });
});
