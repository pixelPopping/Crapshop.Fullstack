function filterProducts(products, query, selectedCategory) {
  return products.filter((product) => {
    const matchQuery = product.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchCategory =
      selectedCategory === "Alle categorieën" ||
      product.category === selectedCategory;
    return matchQuery && matchCategory;
  });
}

export default filterProducts;
