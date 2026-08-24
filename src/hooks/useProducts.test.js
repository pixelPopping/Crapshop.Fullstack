import { renderHook, waitFor } from "@testing-library/react";

import useProducts from "./useProducts";

import {
  getProducts,
  getCategories,
} from "../api/productsApi";

jest.mock("../api/productsApi", () => ({
  getProducts: jest.fn(),
  getCategories: jest.fn(),
}));

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("begint met loading", () => {
    getProducts.mockReturnValue(
      new Promise(() => {})
    );

    getCategories.mockReturnValue(
      new Promise(() => {})
    );

    const { result } = renderHook(() =>
      useProducts()
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.categories).toEqual([
      "Alle categorieën",
    ]);
    expect(result.current.error).toBe("");
  });

  test("haalt producten en categorieën succesvol op", async () => {
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

    const categories = [
      "laptop",
      "keyboard",
      "t-shirt",
    ];

    getProducts.mockResolvedValue(products);
    getCategories.mockResolvedValue(categories);

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(
      products
    );

    expect(result.current.categories).toEqual([
      "Alle categorieën",
      "laptop",
      "keyboard",
      "t-shirt",
    ]);

    expect(result.current.error).toBe("");
  });

  test("roept getProducts en getCategories aan", async () => {
    const products = [
      {
        id: 1,
        title: "Laptop",
        category: "laptop",
        price: 800,
      },
    ];

    const categories = [
      "laptop",
    ];

    getProducts.mockResolvedValue(products);
    getCategories.mockResolvedValue(categories);

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(getCategories).toHaveBeenCalledTimes(1);

    expect(getProducts).toHaveBeenCalledWith(
      expect.any(AbortSignal)
    );

    expect(getCategories).toHaveBeenCalledWith(
      expect.any(AbortSignal)
    );
  });

  test("geeft een error wanneer het ophalen van producten mislukt", async () => {
    getProducts.mockRejectedValue(
      new Error("API error")
    );

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Kon producten niet laden."
    );

    expect(result.current.products).toEqual([]);

    expect(result.current.categories).toEqual([
      "Alle categorieën",
    ]);
  });

  test("zet loading terug naar false wanneer het ophalen mislukt", async () => {
    getProducts.mockRejectedValue(
      new Error("API error")
    );

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
  });
});