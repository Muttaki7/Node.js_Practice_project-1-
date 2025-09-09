import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Weather App title", () => {
  render(<App />);
  const heading = screen.getByText(/Weather App/i);
  expect(heading).toBeInTheDocument();
});

test("renders input field", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Enter your city/i);
  expect(input).toBeInTheDocument();
});

test("renders button", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /Get Weather/i });
  expect(button).toBeInTheDocument();
});
