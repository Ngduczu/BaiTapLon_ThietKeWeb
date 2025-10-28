// --- BƯỚC 1: CƠ SỞ DỮ LIỆU ĐA SẢN PHẨM ---
const database = {
    // ---- SẢN PHẨM CÓ CẢ 2 TÙY CHỌN (IPHONE, IPAD) ----
    "iphone17-promax": {
        name: "iPhone 17 ProMax",
        // Có 'storageOptions': Giá được lấy từ đây
        storageOptions: [
            { name: "256GB", price: "47.799.000đ", oldPrice: "50.999.000đ" },
            { name: "512GB", price: "50.799.000đ", oldPrice: "53.999.000đ" },
            { name: "1TB", price: "53.799.000đ", oldPrice: "56.999.000đ" },
            {name: "2TB", price: "53.799.000đ", oldPrice: "56.999.000đ"}
        ],
        colorOptions: [
            { name: "Xanh", colorCode: "#f77644ff", image: "../assets/images/NguyenDucVu_241230896/product_image/iPhone_image/iphone-17-pro-max_cam.png" },
            { name: "Đen", colorCode: "#3b3b3c", image: "../assets/images/NguyenDucVu_241230896/product_image/iPhone_image/iphone-17-pro-max-tim.png" },
            { name: "Trắng", colorCode: "#f0f0f0", image: "../assets/images/NguyenDucVu_241230896/product_image/iPhone_image/iphone-17-pro-max-white.png" }
        ]
    },
    "ipad-pro-m4": {
        name: "iPad Pro M4 11-inch",
        // Có 'storageOptions': Giá được lấy từ đây
        storageOptions: [
            { name: "256GB", price: "28.999.000đ", oldPrice: "29.999.000đ" },
            { name: "512GB", price: "32.999.000đ", oldPrice: "33.999.000đ" }
        ],
        colorOptions: [
            { name: "Space Black", colorCode: "#505152", image: "../assets/images/NguyenDucVu_241230896/product_image/iPad_image/ipad-pro-black.png" }, // <-- Thay ảnh
            { name: "Silver", colorCode: "#e3e4e6", image: "../assets/images/NguyenDucVu_241230896/product_image/iPad_image/ipad-pro-silver.png" } // <-- Thay ảnh
        ]
    },

    // ---- SẢN PHẨM CHỈ CÓ MÀU (MAC, WATCH) ----
    "macbook-air-m3": {
        name: "Macbook Air M3 13-inch",
        // KHÔNG có 'storageOptions'
        // 'price' và 'oldPrice' được định nghĩa ngay ở gốc
        price: "27.999.000đ",
        oldPrice: "29.999.000đ",
        colorOptions: [
            { name: "Starlight", colorCode: "#f0e6dd", image: "../assets/images/NguyenDucVu_241230896/product_image/Mac_image/mac-starlight.png" }, // <-- Thay ảnh
            { name: "Midnight", colorCode: "#2e3642", image: "../assets/images/NguyenDucVu_241230896/product_image/Mac_image/mac-midnight.png" } // <-- Thay ảnh
        ]
    },
    "apple-watch-s9": {
        name: "Apple Watch Series 9",
        // KHÔNG có 'storageOptions'
        price: "9.999.000đ",
        oldPrice: "10.499.000đ",
        colorOptions: [
            { name: "Pink", colorCode: "#fad7d7", image: "../assets/images/NguyenDucVu_241230896/product_image/Watch_image/watch-pink.png" }, // <-- Thay ảnh
            { name: "Red", colorCode: "#c4102c", image: "../assets/images/NguyenDucVu_241230896/product_image/Watch_image/watch-red.png" } // <-- Thay ảnh
        ]
    }
};

// --- BƯỚC 2: CÁC HÀM CẬP NHẬT GIAO DIỆN (Giữ nguyên) ---

function updatePrice(price, oldPrice) {
    document.getElementById('product-price').textContent = price;
    document.getElementById('product-old-price').textContent = oldPrice;
}

function updateImage(imageUrl, altText) {
    document.getElementById('main-image').src = imageUrl;
    document.getElementById('main-image').alt = altText;
}

// Hàm xử lý khi bấm nút dung lượng (Giữ nguyên)
function handleStorageClick(event) {
    const clickedButton = event.currentTarget;
    document.querySelectorAll('#storage-options .storage-button').forEach(btn => {
        btn.classList.remove('active');
    });
    clickedButton.classList.add('active');

    const newPrice = clickedButton.dataset.price;
    const newOldPrice = clickedButton.dataset.oldPrice;
    updatePrice(newPrice, newOldPrice);
}

// Hàm xử lý khi bấm nút màu (Giữ nguyên)
function handleColorClick(event) {
    const clickedButton = event.currentTarget;
    document.querySelectorAll('#color-options .color-swatch').forEach(btn => {
        btn.classList.remove('active');
    });
    clickedButton.classList.add('active');

    const newImage = clickedButton.dataset.image;
    const productName = document.getElementById('product-name').textContent;
    updateImage(newImage, `${productName} - ${clickedButton.title}`);
}


// --- BƯỚC 3: HÀM TẢI SẢN PHẨM CHÍNH (ĐÃ NÂNG CẤP) ---

function loadProduct(product) {
    // 1. Tải tên sản phẩm
    document.getElementById('product-name').textContent = product.name;

    // 2. Tìm các khu vực (section)
    // Chúng ta tìm đến thẻ cha của các tùy chọn để ẩn/hiện cả cụm
    const storageContainer = document.getElementById('storage-options');
    const storageSection = storageContainer.parentElement; // Đây là <div class="options-section">
    const colorContainer = document.getElementById('color-options');
    const colorSection = colorContainer.parentElement; // Đây là <div class="options-section">

    // 3. Xử lý TÙY CHỌN DUNG LƯỢNG (Logic mới)
    // Kiểm tra xem sản phẩm có 'storageOptions' không
    if (product.storageOptions && product.storageOptions.length > 0) {
        // Nếu CÓ, hiển thị khu vực và tạo các nút
        storageSection.style.display = 'block'; 
        storageContainer.innerHTML = ''; // Xóa sạch

        product.storageOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'storage-button';
            button.textContent = option.name;
            button.dataset.price = option.price;
            button.dataset.oldPrice = option.oldPrice;
            button.addEventListener('click', handleStorageClick);

            if (index === 0) {
                button.classList.add('active');
                // Cập nhật giá mặc định từ tùy chọn dung lượng đầu tiên
                updatePrice(option.price, option.oldPrice);
            }
            storageContainer.appendChild(button);
        });
    } else {
        // Nếu KHÔNG, ẩn toàn bộ khu vực "Dung lượng"
        storageSection.style.display = 'none'; 
        // Cập nhật giá từ thông tin gốc của sản phẩm
        updatePrice(product.price, product.oldPrice);
    }

    // 4. Xử lý TÙY CHỌN MÀU SẮC (Logic tương tự)
    if (product.colorOptions && product.colorOptions.length > 0) {
        colorSection.style.display = 'block';
        colorContainer.innerHTML = ''; // Xóa sạch

        product.colorOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'color-swatch';
            button.title = option.name;
            button.style.backgroundColor = option.colorCode;
            button.dataset.image = option.image;
            button.addEventListener('click', handleColorClick);

            if (index === 0) {
                button.classList.add('active');
                // Cập nhật ảnh mặc định
                updateImage(option.image, `${product.name} - ${option.name}`);
            }
            colorContainer.appendChild(button);
        });
    } else {
        // Ẩn khu vực màu sắc nếu sản phẩm không có
        colorSection.style.display = 'none';
        // (Nếu không có ảnh, bạn nên đặt một ảnh placeholder cho #main-image)
    }
}

// --- BƯỚC 4: KÍCH HOẠT KHI TẢI TRANG (Giữ nguyên) ---
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Ví dụ: ?id=macbook-air-m3

    if (!productId) {
        document.querySelector('.product-container').innerHTML = '<h1>Không tìm thấy ID sản phẩm trên URL.</h1>';
        return;
    }

    const product = database[productId];

    if (product) {
        loadProduct(product);
    } else {
        document.querySelector('.product-container').innerHTML = `<h1>Không tìm thấy sản phẩm với ID: ${productId}</h1>`;
    }
});