document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form form");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // --- VALIDATION ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;

        if (!email) {
            alert("Vui lòng nhập email!");
            return;
        }
        if (!emailRegex.test(email)) {
            alert("Email không hợp lệ! (VD: example@gmail.com)");
            return;
        }

        if (!password) {
            alert("Vui lòng nhập mật khẩu!");
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số!");
            return;
        }

        // --- KIỂM TRA LOCALSTORAGE ---
        const users = JSON.parse(localStorage.getItem("Users")) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (!foundUser) {
            alert("Sai email hoặc mật khẩu. Vui lòng thử lại!");
            return;
        }

        // --- ĐĂNG NHẬP THÀNH CÔNG ---
        localStorage.setItem("CurrentUser", JSON.stringify(foundUser));

        alert(`Xin chào ${foundUser.fullname || "bạn"}! Đăng nhập thành công.`);
        window.location.href = "../index.html";
    });
});
