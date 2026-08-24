import axiosClient from "./axiosClient";

import {
  getProducts,
  getCategories,
  getProduct,
} from "./productsApi";

jest.mock("./axiosClient", () => ({
  get: jest.fn(),
}));

describe("productsApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getProducts haalt alle producten op", async () => {
    const products = [
      {
        id: 1,
        title: "Laptop",
        category: "laptop",
        price: 800,
      },
      {
        id: 2,
        title: "Keyboard",
        category: "keyboard",
        price: 50,
      },
    ];

    const signal = new AbortController().signal;

    axiosClient.get.mockResolvedValue({
      data: products,
    });

    const result = await getProducts(signal);

    expect(axiosClient.get).toHaveBeenCalledTimes(1);

    expect(axiosClient.get).toHaveBeenCalledWith(
      "/products",
      {
        signal,
      }
    );

    expect(result).toEqual(products);
  });

  test("getCategories haalt alle categorieën op", async () => {
    const categories = [
      "t-shirt",
      "laptop",
      "keyboard",
    ];

    const signal = new AbortController().signal;

    axiosClient.get.mockResolvedValue({
      data: categories,
    });

    const result = await getCategories(signal);

    expect(axiosClient.get).toHaveBeenCalledTimes(1);

    expect(axiosClient.get).toHaveBeenCalledWith(
      "/products/categories",
      {
        signal,
      }
    );

    expect(result).toEqual(categories);
  });

  test("getProduct haalt één product op met het juiste id", async () => {
    const product = {
      id: 1,
      title: "Laptop",
      category: "laptop",
      price: 800,
    };

    const signal = new AbortController().signal;

    axiosClient.get.mockResolvedValue({
      data: product,
    });

    const result = await getProduct(
      1,
      signal
    );

    expect(axiosClient.get).toHaveBeenCalledTimes(1);

    expect(axiosClient.get).toHaveBeenCalledWith(
      "/products/1",
      {
        signal,
      }
    );

    expect(result).toEqual(product);
  });

  test("getProducts geeft een error door wanneer axiosClient faalt", async () => {
    const error = new Error("Network error");

    const signal = new AbortController().signal;

    axiosClient.get.mockRejectedValue(error);

    await expect(
      getProducts(signal)
    ).rejects.toThrow("Network error");
  });

  test("getCategories geeft een error door wanneer axiosClient faalt", async () => {
    const error = new Error("Network error");

    const signal = new AbortController().signal;

    axiosClient.get.mockRejectedValue(error);

    await expect(
      getCategories(signal)
    ).rejects.toThrow("Network error");
  });

  test("getProduct geeft een error door wanneer axiosClient faalt", async () => {
    const error = new Error("Network error");

    const signal = new AbortController().signal;

    axiosClient.get.mockRejectedValue(error);

    await expect(
      getProduct(1, signal)
    ).rejects.toThrow("Network error");
  });
});