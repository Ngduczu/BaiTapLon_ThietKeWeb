// js/filter.js
document.addEventListener("DOMContentLoaded", () => {
  const filterLinks = document.querySelectorAll("#filter-list a");
  const products = document.querySelectorAll(".product-box");
  const section2 = document.querySelector(".section-2"); // phần giới thiệu + video

  filterLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Bỏ trạng thái active cũ
      filterLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-series");

      // Lọc sản phẩm
      products.forEach((product) => {
        if (filterValue === "all") {
          product.style.display = "block";
        } else if (product.classList.contains(`MacBook-${filterValue}`)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });

      // Ẩn hoặc hiện section2
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
