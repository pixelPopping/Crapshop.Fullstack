import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import FavorietenItem from "./FavorietenItem";

import { FavoriteContext } from "../../context/FavoriteContext.jsx";

describe("FavorietenItem", () => {
  const item = {
    id: 1,
    title: "Laptop",
    image: "/images/laptop.jpg",
    price: 800,
    quantity: 2,
  };

  test("toont de productinformatie", () => {
    const removeFavorite = jest.fn();

    render(
      <FavoriteContext.Provider
        value={{ removeFavorite }}
      >
        <FavorietenItem item={item} />
      </FavoriteContext.Provider>
    );

    expect(
      screen.getByText(
        "Laptop – €800 × 2 = €1600.00"
      )
    ).toBeInTheDocument();
  });

  test("toont de productafbeelding", () => {
    const removeFavorite = jest.fn();

    render(
      <FavoriteContext.Provider
        value={{ removeFavorite }}
      >
        <FavorietenItem item={item} />
      </FavoriteContext.Provider>
    );

    const image = screen.getByRole("img", {
      name: "Laptop",
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/images/laptop.jpg"
    );
  });

  test("toont een quantity van 1 wanneer quantity ontbreekt", () => {
    const removeFavorite = jest.fn();

    const itemWithoutQuantity = {
      ...item,
      quantity: undefined,
    };

    render(
      <FavoriteContext.Provider
        value={{ removeFavorite }}
      >
        <FavorietenItem
          item={itemWithoutQuantity}
        />
      </FavoriteContext.Provider>
    );

    expect(
      screen.getByText(
        "Laptop – €800 × 1 = €800.00"
      )
    ).toBeInTheDocument();
  });

  test("toont de Remove knop", () => {
    const removeFavorite = jest.fn();

    render(
      <FavoriteContext.Provider
        value={{ removeFavorite }}
      >
        <FavorietenItem item={item} />
      </FavoriteContext.Provider>
    );

    expect(
      screen.getByRole("button", {
        name: "Remove",
      })
    ).toBeInTheDocument();
  });

  test("roept removeFavorite aan met het juiste product id", () => {
    const removeFavorite = jest.fn();

    render(
      <FavoriteContext.Provider
        value={{ removeFavorite }}
      >
        <FavorietenItem item={item} />
      </FavoriteContext.Provider>
    );

    const removeButton = screen.getByRole(
      "button",
      {
        name: "Remove",
      }
    );

    fireEvent.click(removeButton);

    expect(removeFavorite).toHaveBeenCalledTimes(1);

    expect(removeFavorite).toHaveBeenCalledWith(
      1
    );
  });
});