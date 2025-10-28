// js/filter.js
document.addEventListener("DOMContentLoaded", () => {
  const filterLinks = document.querySelectorAll("#filter-list a");
  const products = document.querySelectorAll(".product-box");
  const section2 = document.querySelector(".section-2");

  filterLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Xóa active cũ
      filterLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const filterValue = link.getAttribute("data-series");

      // Lọc sản phẩm
      products.forEach((product) => {
        if (filterValue === "all" || product.classList.contains(filterValue)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
      if (section2) {
        if (filterValue === "all") {
          section2.style.display = "block";
        } else {
          section2.style.display = "none";
        }
      }
    });
  });
});
