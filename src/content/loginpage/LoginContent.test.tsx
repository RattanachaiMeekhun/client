import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import LoginContent from "./LoginContent";
import { AuthenticationContextProvider } from "../../context/AuthenticationContext";

// const server = setupServer(
//   rest.get("/api", (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         status: "success",
//       })
//     );
//   })
// );

// beforeAll(() => server.listen());
// afterAll(() => server.resetHandlers());
// afterAll(() => server.close());

describe("LoginContent", () => {
  it("Should require Username and Password.", async () => {
    render(
      <BrowserRouter>
        <AuthenticationContextProvider>
          <LoginContent />
        </AuthenticationContextProvider>
      </BrowserRouter>
    );
    const signinBtn = screen.getByText("Sign-in");
    expect(signinBtn).toBeDefined();
    fireEvent.click(signinBtn);
    await waitFor(() => {
      const errUser = screen.getByRole("err-username");
      const errPass = screen.getByRole("err-password");
      expect(errUser).toHaveTextContent("Username is required");
      expect(errPass).toHaveTextContent("Password is required");
    });
  });
});
