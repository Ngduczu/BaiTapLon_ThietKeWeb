// JavaScript for handling mobile menu toggle and overlay
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".drop-down-menu-for-mobile");
    const overlay = document.querySelector(".overlay");

    // Mở menu
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
    });

    // Đóng menu khi click overlay
    overlay.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Cho phép vuốt phải để đóng (UX kiểu mobile)
    let startX = 0;
    mobileMenu.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    mobileMenu.addEventListener("touchmove", e => {
        const deltaX = e.touches[0].clientX - startX;
        if (deltaX > 100) { // vuốt sang phải 100px
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
        }
    });
});
