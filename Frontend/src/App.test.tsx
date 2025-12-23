import { render,screen } from "@testing-library/react";
import App from "./App";

describe("checking app.tsx which is main of react", () => {
  test.skip("checking app.tsx", () => {
    render(<App />);
    const linkElement = screen.getByText("Vite + React");
    expect(linkElement).toBeInTheDocument();
  });
});
