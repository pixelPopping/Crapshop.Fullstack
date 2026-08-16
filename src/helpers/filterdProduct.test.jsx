import filterProducts from "./filteredProducts";

describe("filterProducts", () => {
  const products = [
    {
      id: 1,
      title: "T-Shirt",
      category: "t-shirt",
      price: 20,
    },
    {
      id: 2,
      title: "Laptop",
      category: "laptop",
      price: 800,
    },
    {
      id: 3,
      title: "Keyboard",
      category: "keyboard",
      price: 50,
    },
    {
      id: 4,
      title: "Gaming T-Shirt",
      category: "t-shirt",
      price: 30,
    },
  ];

  test("vindt een product op basis van de zoekterm", () => {
    const result = filterProducts(
      products,
      "Laptop"
    );

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Laptop");
  });

  test("zoekt hoofdletterongevoelig", () => {
    const result = filterProducts(
      products,
      "lApToP"
    );

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Laptop");
  });

  test("filtert producten op categorie", () => {
    const result = filterProducts(
      products,
      "",
      "t-shirt"
    );

    expect(result).toHaveLength(2);
    expect(result[0].category).toBe("t-shirt");
    expect(result[1].category).toBe("t-shirt");
  });

  test("combineert zoekterm en categorie", () => {
    const result = filterProducts(
      products,
      "gaming",
      "t-shirt"
    );

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe(
      "Gaming T-Shirt"
    );
  });

  test("geeft alle producten terug bij Alle categorieën", () => {
    const result = filterProducts(
      products,
      "",
      "Alle categorieën"
    );

    expect(result).toHaveLength(4);
  });

  test("geeft een lege array wanneer er geen match is", () => {
    const result = filterProducts(
      products,
      "television"
    );

    expect(result).toEqual([]);
  });

  test("geeft een lege array wanneer products geen array is", () => {
    const result = filterProducts(
      null,
      "laptop"
    );

    expect(result).toEqual([]);
  });
});