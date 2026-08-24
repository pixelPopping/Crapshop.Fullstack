import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const categories = [
    "t-shirt",
    "laptop",
    "keyboard",
  ];

  test("toont de zoekbalk", () => {
    render(
      <SearchBar
        inputValue=""
        inputCallback={jest.fn()}
        selectedCategory="t-shirt"
        onCategoryChange={jest.fn()}
        categories={categories}
        showCategories={false}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      "Search on product..."
    );

    expect(searchInput).toBeInTheDocument();
  });

  test("toont de huidige zoekwaarde", () => {
    render(
      <SearchBar
        inputValue="laptop"
        inputCallback={jest.fn()}
        selectedCategory="t-shirt"
        onCategoryChange={jest.fn()}
        categories={categories}
        showCategories={false}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      "Search on product..."
    );

    expect(searchInput).toHaveValue("laptop");
  });

  test("roept inputCallback aan wanneer de gebruiker tekst invoert", () => {
    const inputCallback = jest.fn();

    render(
      <SearchBar
        inputValue=""
        inputCallback={inputCallback}
        selectedCategory="t-shirt"
        onCategoryChange={jest.fn()}
        categories={categories}
        showCategories={false}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      "Search on product..."
    );

    fireEvent.change(searchInput, {
      target: {
        value: "laptop",
      },
    });

    expect(inputCallback).toHaveBeenCalledTimes(1);
    expect(inputCallback).toHaveBeenCalledWith(
      "laptop"
    );
  });

  test("toont de categorieën wanneer showCategories true is", () => {
    render(
      <SearchBar
        inputValue=""
        inputCallback={jest.fn()}
        selectedCategory="t-shirt"
        onCategoryChange={jest.fn()}
        categories={categories}
        showCategories={true}
      />
    );

    const categorySelect =
      screen.getByRole("combobox");

    expect(categorySelect).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "t-shirt",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "laptop",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "keyboard",
      })
    ).toBeInTheDocument();
  });

  test("selecteert de juiste huidige categorie", () => {
    render(
      <SearchBar
        inputValue=""
        inputCallback={jest.fn()}
        selectedCategory="laptop"
        onCategoryChange={jest.fn()}
        categories={categories}
        showCategories={true}
      />
    );

    const categorySelect =
      screen.getByRole("combobox");

    expect(categorySelect).toHaveValue(
      "laptop"
    );
  });

  test("roept onCategoryChange aan wanneer een andere categorie wordt gekozen", () => {
    const onCategoryChange = jest.fn();

    render(
      <SearchBar
        inputValue=""
        inputCallback={jest.fn()}
        selectedCategory="t-shirt"
        onCategoryChange={onCategoryChange}
        categories={categories}
        showCategories={true}
      />
    );

    const categorySelect =
      screen.getByRole("combobox");

    fireEvent.change(categorySelect, {
      target: {
        value: "keyboard",
      },
    });

    expect(
      onCategoryChange
    ).toHaveBeenCalledTimes(1);

    expect(
      onCategoryChange
    ).toHaveBeenCalledWith("keyboard");
  });

  test("toont de categorie-select niet wanneer showCategories false is", () => {
    render(
      <SearchBar
        inputValue=""
        inputCallback={jest.fn()}
        selectedCategory="t-shirt"
        onCategoryChange={jest.fn()}
        categories={categories}
        showCategories={false}
      />
    );

    expect(
      screen.queryByRole("combobox")
    ).not.toBeInTheDocument();
  });
});