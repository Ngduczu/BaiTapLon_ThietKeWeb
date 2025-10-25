// 🔹 biến toàn cục
const headerHeight = window.innerWidth < 1000 ? 65 : 135;// hoặc document.querySelector("header").offsetHeight;

// 🔹 hàm tiện dụng để cuộn tới section bất kỳ
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

// 🔹 dùng cho nhiều nút
document.getElementById("go-to-apples").addEventListener("click", () => scrollToSection("applenews"));
document.getElementById("go-to-review").addEventListener("click", () => scrollToSection("reviewnews"));
document.getElementById("go-to-explore").addEventListener("click", () => scrollToSection("explorenews"));
document.getElementById("go-to-trick").addEventListener("click", () => scrollToSection("tricknews"));
document.getElementById("go-to-sale").addEventListener("click", () => scrollToSection("salenews"));
document.getElementById("go-to-others").addEventListener("click", () => scrollToSection("othersnews"));
document.getElementById("go-to-iVideo").addEventListener("click", () => scrollToSection("iVideonews"));
