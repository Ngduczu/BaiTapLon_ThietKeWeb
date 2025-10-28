// js/filter.js
document.addEventListener("DOMContentLoaded", () => {
  const filterLinks = document.querySelectorAll("#filter-list a");
  const products = document.querySelectorAll(".product-box");
  const section2 = document.querySelector(".section-2"); // phần giới thiệu + video

  // Lắng nghe sự kiện click trên từng filter
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
        } else if (product.classList.contains(`iPad-${filterValue}`)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });

      // Ẩn hoặc hiện phần giới thiệu
      if (section2) {
        if (filterValue === "all") {
          section2.style.display = "block";
        } else {
          section2.style.display = "none";
        }
      }
    });
  });

  // ✅ Tự động áp dụng bộ lọc khi có ?filter=... trong URL
  const params = new URLSearchParams(window.location.search);
  const initialFilter = params.get("filter");

  if (initialFilter) {
    const linkToClick = document.querySelector(
      `#filter-list a[data-series="${initialFilter}"]`
    );
    if (linkToClick) {
      linkToClick.click(); // Kích hoạt bộ lọc tương ứng

      // Cuộn xuống phần danh sách sản phẩm cho người dùng thấy ngay
      const productList = document.querySelector(".list-product");
      if (productList) {
        productList.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});
