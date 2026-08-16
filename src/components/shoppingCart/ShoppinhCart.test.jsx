import {
  render,
  screen,
} from "@testing-library/react";

import ShoppingCart from "./ShoppingCart";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

describe("ShoppingCart", () => {
  test("toont Shopping Bag", () => {
    const price = jest.fn(() => 0);

    render(
      <ShoppingCartContext.Provider
        value={{
          items: [],
          price,
        }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );

    expect(
      screen.getByRole("heading", {
        name: "Shopping Bag",
      })
    ).toBeInTheDocument();
  });

  test("toont Cart is empty wanneer de winkelwagen leeg is", () => {
    const price = jest.fn(() => 0);

    render(
      <ShoppingCartContext.Provider
        value={{
          items: [],
          price,
        }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );

    expect(
      screen.getByText("Cart is empty.")
    ).toBeInTheDocument();
  });

  test("toont producten wanneer de winkelwagen items bevat", () => {
    const price = jest.fn(() => 850);

    const items = [
      {
        id: 1,
        title: "Laptop",
        image: "/images/laptop.jpg",
        price: 800,
      },
      {
        id: 2,
        title: "Keyboard",
        image: "/images/keyboard.jpg",
        price: 50,
      },
    ];

    render(
      <ShoppingCartContext.Provider
        value={{
          items,
          price,
        }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );

    expect(
      screen.getByText("Laptop")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Keyboard")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Cart is empty.")
    ).not.toBeInTheDocument();
  });

  test("toont de prijs van ieder product", () => {
    const price = jest.fn(() => 850);

    const items = [
      {
        id: 1,
        title: "Laptop",
        image: "/images/laptop.jpg",
        price: 800,
      },
      {
        id: 2,
        title: "Keyboard",
        image: "/images/keyboard.jpg",
        price: 50,
      },
    ];

    render(
      <ShoppingCartContext.Provider
        value={{
          items,
          price,
        }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );

    expect(
      screen.getByText("€800.00")
    ).toBeInTheDocument();

    expect(
      screen.getByText("€50.00")
    ).toBeInTheDocument();
  });

  test("roept price aan en toont de totale prijs", () => {
    const price = jest.fn(() => 850);

    render(
      <ShoppingCartContext.Provider
        value={{
          items: [],
          price,
        }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );

    expect(price).toHaveBeenCalled();

    expect(
      screen.getByText("Totaleprice:")
    ).toBeInTheDocument();

    expect(
      screen.getByText("€850.00")
    ).toBeInTheDocument();
  });

  test("toont de afbeeldingen van de producten met de juiste alt tekst", () => {
    const price = jest.fn(() => 850);

    const items = [
      {
        id: 1,
        title: "Laptop",
        image: "/images/laptop.jpg",
        price: 800,
      },
      {
        id: 2,
        title: "Keyboard",
        image: "/images/keyboard.jpg",
        price: 50,
      },
    ];

    render(
      <ShoppingCartContext.Provider
        value={{
          items,
          price,
        }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );

    const laptopImage = screen.getByRole("img", {
      name: "Laptop",
    });

    const keyboardImage = screen.getByRole("img", {
      name: "Keyboard",
    });

    expect(laptopImage).toHaveAttribute(
      "src",
      "/images/laptop.jpg"
    );

    expect(keyboardImage).toHaveAttribute(
      "src",
      "/images/keyboard.jpg"
    );
  });
});