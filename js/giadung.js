// js/filter.js
document.addEventListener("DOMContentLoaded", () => {
  const filterLinks = document.querySelectorAll("#filter-list a");
  const products = document.querySelectorAll(".product-box");
  const section2 = document.querySelector(".section-2"); // Nếu sau này bạn muốn dùng video/giới thiệu

  filterLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Xóa trạng thái active cũ
      filterLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-series");

      // Ẩn/hiện sản phẩm theo filter
      products.forEach((product) => {
        // Lấy className sản phẩm (chuyển về chữ thường để khớp dễ hơn)
        const productClass = product.className.toLowerCase();

        if (filterValue === "all") {
          product.style.display = "block";
        } else if (
          (filterValue === "may-loc-khong-khi" &&
            productClass.includes("maylockhongkhi")) ||
          (filterValue === "ro-bot-hut-bui" &&
            productClass.includes("mayhutbui")) ||
          (filterValue === "noi-dien" && productClass.includes("noicomdien")) ||
          (filterValue === "may-hut" &&
            productClass.includes("mayhutchankhong")) ||
          (filterValue === "may-ep" && productClass.includes("mayep")) ||
          (filterValue === "am-dun-nuoc" &&
            productClass.includes("amdunnuoc")) ||
          (filterValue === "may-say" && productClass.includes("maysay")) ||
          (filterValue === "may-xay" && productClass.includes("mayxay"))
        ) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  });
});
