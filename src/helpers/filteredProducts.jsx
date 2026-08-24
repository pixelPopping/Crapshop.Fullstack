export default function filterProducts(
  products = [],
  query = "",
  category = "Alle categorieën",
) {
  if (!Array.isArray(products)) {
    return [];
  }

  const searchQuery = query.trim().toLowerCase();
  const selectedCategory = category.trim().toLowerCase();

  return products.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    const productCategory =
      product.category?.toLowerCase() || "";

    const matchesQuery =
      searchQuery === "" ||
      title.includes(searchQuery) ||
      description.includes(searchQuery);

    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "alle categorieën" ||
      productCategory === selectedCategory;

    return matchesQuery && matchesCategory;
  });
}