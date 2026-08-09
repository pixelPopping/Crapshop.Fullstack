export default function filterProducts(products = [], query = "", category = "Alle categorieën") {
  if (!Array.isArray(products)) return [];

  return products.filter((product) => {
    const matchesQuery =
      product.title?.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      category === "Alle categorieën" ||
      product.category === category;

    return matchesQuery && matchesCategory;
  });
}