document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".login-form form");
    if (!form) return;

    const fullname = document.getElementById("fullname");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const agree = document.getElementById("agree");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        // --- 1️⃣ Kiểm tra rỗng ---
        if (fullname.value.trim() === "") {
            showError(fullname, "Họ và tên không được để trống");
            valid = false;
        }

        if (phone.value.trim() === "") {
            showError(phone, "Số điện thoại không được để trống");
            valid = false;
        }

        if (email.value.trim() === "") {
            showError(email, "Email không được để trống");
            valid = false;
        }

        if (password.value.trim() === "") {
            showError(password, "Mật khẩu không được để trống");
            valid = false;
        }

        if (confirmPassword.value.trim() === "") {
            showError(confirmPassword, "Vui lòng nhập lại mật khẩu");
            valid = false;
        }

        // --- 2️⃣ Email hợp lệ ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() !== "" && !emailRegex.test(email.value)) {
            showError(email, "Email không đúng định dạng (vd: example@gmail.com)");
            valid = false;
        }

        // --- 3️⃣ Regex mật khẩu ---
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;
        if (password.value.trim() !== "" && !passwordRegex.test(password.value)) {
            showError(password, "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ và số");
            valid = false;
        }

        // --- 4️⃣ Mật khẩu trùng khớp ---
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Mật khẩu nhập lại không trùng khớp");
            valid = false;
        }

        // --- 5️⃣ Số điện thoại ---
        const phoneRegex = /^(?!00)[0-9]{10,11}$/;
        if (phone.value.trim() !== "" && !phoneRegex.test(phone.value)) {
            showError(phone, "Số điện thoại chỉ gồm 10–11 chữ số và không bắt đầu bằng '00'");
            valid = false;
        }

        // --- 6️⃣ Checkbox ---
        if (!agree.checked) {
            alert("Vui lòng đồng ý với chính sách và điều khoản của cửa hàng");
            valid = false;
        }

        // --- 7️⃣ Nếu hợp lệ → lưu LocalStorage ---
        if (valid) {
            let users = JSON.parse(localStorage.getItem("Users")) || [];

            // Kiểm tra trùng email hoặc sđt
            const exists = users.some(u => u.email === email.value || u.phone === phone.value);
            if (exists) {
                alert("Tài khoản với email hoặc số điện thoại này đã tồn tại!");
                return;
            }

            const newUser = {
                fullname: fullname.value.trim(),
                phone: phone.value.trim(),
                email: email.value.trim(),
                password: password.value.trim(),
            };

            // Lưu mảng Users
            users.push(newUser);
            localStorage.setItem("Users", JSON.stringify(users));

            // Tự động đăng nhập
            localStorage.setItem("CurrentUser", JSON.stringify(newUser));

            alert("Đăng ký thành công! Bạn đã được đăng nhập.");
            form.reset();
            window.location.href = "../index.html";
        }
    });
});
