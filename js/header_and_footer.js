// JavaScript for handling mobile menu toggle and overlay
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".drop-down-menu-for-mobile");
    const overlay = document.querySelector(".overlay");
    const shoppingCart = document.querySelector(".cart-icon");
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

    shoppingCart.addEventListener("click", () => {
        alert('Chức năng giỏ hàng đang trong quá trình phát triển\nXin vui lòng liên hệ lại với nhà phát triển để biết thêm chi tiết');  // Chuyển đến trang giỏ hàng
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const loginDropdown = document.querySelector(".login-dropdown-for-destop");
    const mobileMenu = document.querySelector(".menu-mobile");
    const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
    console.log(currentUser)
    // --- Nếu đã đăng nhập ---
    if (currentUser && Object.keys(currentUser).length > 0) {
        // ===== PHẦN HEADER DESKTOP =====
        if (loginDropdown) {
            loginDropdown.innerHTML = "";

            const infoLink = document.createElement("a");
            infoLink.href = "../pages/account.html";
            infoLink.textContent = "Xem thông tin";

            const logoutLink = document.createElement("a");
            logoutLink.href = "#";
            logoutLink.textContent = "Đăng xuất";

            loginDropdown.appendChild(infoLink);
            loginDropdown.appendChild(logoutLink);

            logoutLink.addEventListener("click", function (e) {
                e.preventDefault();
                if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                    localStorage.removeItem("CurrentUser");
                    alert("Đã đăng xuất thành công!");
                    window.location.reload();
                }
            });
        }

        // ===== PHẦN MENU MOBILE =====
        if (mobileMenu) {
            // Xóa 2 mục "Đăng Nhập" & "Đăng Ký" (nếu có)
            const loginItems = Array.from(mobileMenu.querySelectorAll("li")).filter(li => {
                const text = li.textContent.trim().toLowerCase();
                return text === "đăng nhập" || text === "đăng ký";
            });
            loginItems.forEach(li => li.remove());

            // Thêm "Xem thông tin" và "Đăng xuất"
            const infoLi = document.createElement("li");
            const logoutLi = document.createElement("li");

            const infoLink = document.createElement("a");
            infoLink.href = "../pages/account.html";
            infoLink.classList.add("menu-mobile-link");
            infoLink.textContent = "Xem thông tin";

            const logoutLink = document.createElement("a");
            logoutLink.href = "#";
            logoutLink.classList.add("menu-mobile-link");
            logoutLink.textContent = "Đăng xuất";

            infoLi.appendChild(infoLink);
            logoutLi.appendChild(logoutLink);

            mobileMenu.appendChild(infoLi);
            mobileMenu.appendChild(logoutLi);

            logoutLink.addEventListener("click", function (e) {
                e.preventDefault();
                if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                    localStorage.removeItem("CurrentUser");
                    alert("Đã đăng xuất thành công!");
                    window.location.reload();
                }
            });
        }

        // ===== TUỲ CHỌN: HIỂN THỊ TÊN USER =====
        const loginIcon = document.getElementById("login-icon-img");
        if (loginIcon) {
            loginIcon.insertAdjacentHTML(
                "afterend",
                `<span class="welcome-text">Xin chào, ${currentUser.fullname}</span>`
            );
            loginIcon.style.display = "none"
        }
    }
});
