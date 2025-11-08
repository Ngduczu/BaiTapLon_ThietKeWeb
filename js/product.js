
//  BƯỚC 1: ĐỌC FILE JSON
async function loadDatabase() {
    try {
        const response = await fetch("../data/data.json");
        if (!response.ok) throw new Error("Không thể tải dữ liệu sản phẩm!");
        return await response.json();
    } catch (error) {
        console.error("Lỗi tải JSON:", error);
        return null;
    }
}


//  BƯỚC 2: CÁC HÀM CẬP NHẬT UI

function updatePrice(price, oldPrice) {
    document.getElementById('product-price').textContent = price;
    document.getElementById('product-old-price').textContent = oldPrice;
}

function updateImage(imageUrl, altText) {
    document.getElementById('main-image').src = imageUrl;
    document.getElementById('main-image').alt = altText;
}

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


//  BƯỚC 3: HIỂN THỊ SẢN PHẨM THEO DỮ LIỆU JSON

function loadProduct(product) {
    // 1. Tên sản phẩm
    document.getElementById('product-name').textContent = product.name;

    // 2. Các vùng HTML
    const storageContainer = document.getElementById('storage-options');
    const storageSection = storageContainer.parentElement;
    const colorContainer = document.getElementById('color-options');
    const colorSection = colorContainer.parentElement;

    // 3. Dung lượng
    if (product.storageOptions && product.storageOptions.length > 0) {
        storageSection.style.display = 'block';
        storageContainer.innerHTML = '';

        product.storageOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'storage-button';
            button.textContent = option.name;
            button.dataset.price = option.price;
            button.dataset.oldPrice = option.oldPrice;
            button.addEventListener('click', handleStorageClick);

            if (index === 0) {
                button.classList.add('active');
                updatePrice(option.price, option.oldPrice);
            }

            storageContainer.appendChild(button);
        });
    } else {
        storageSection.style.display = 'none';
        updatePrice(product.price, product.oldPrice);
    }

    // 4. Màu sắc
    if (product.colorOptions && product.colorOptions.length > 0) {
        colorSection.style.display = 'block';
        colorContainer.innerHTML = '';

        product.colorOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'color-swatch';
            button.title = option.name;
            button.style.backgroundColor = option.colorCode;
            button.dataset.image = option.image;
            button.addEventListener('click', handleColorClick);

            if (index === 0) {
                button.classList.add('active');
                updateImage(option.image, `${product.name} - ${option.name}`);
            }

            colorContainer.appendChild(button);
        });
    } else {
        colorSection.style.display = 'none';
    }
}

//  BƯỚC 4: KHỞI ĐỘNG KHI TẢI TRANG
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); 

    const database = await loadDatabase();
    if (!database) {
        document.querySelector('.product-container').innerHTML =
            '<h1>Lỗi khi tải dữ liệu sản phẩm.</h1>';
        return;
    }

    if (!productId) {
        document.querySelector('.product-container').innerHTML =
            '<h1>Không tìm thấy ID sản phẩm trên URL.</h1>';
            document.getElementById('cmt-section').style.display = 'none';
        return;
    }

    const product = database[productId];
    if (product) {
        loadProduct(product);
    } else {
        document.querySelector('.product-container').innerHTML =
            `<h1>Không tìm thấy sản phẩm với ID: ${productId}</h1>`;
        getElementById
    }
});


//  BƯỚC 5: POPUP THANH TOÁN
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('checkout-modal');
    const closeBtn = document.querySelector('.close-btn');
    const buyBtn = document.querySelector('.buy-button');
    const qrSection = document.getElementById('qr-section');
    const cashBtn = document.getElementById('cash-btn');
    const bankBtn = document.getElementById('bank-btn');

    // --- Mở popup khi nhấn MUA NGAY ---
    buyBtn.addEventListener('click', () => {
        const currentUser = localStorage.getItem('CurrentUser');
        if (!currentUser) {
            alert("Vui lòng đăng nhập để tiếp tục mua hàng!");
            window.location.href = "login.html";
            return;
        }

        const name = document.getElementById('product-name').textContent;
        const image = document.getElementById('main-image').src;
        const price = document.getElementById('product-price').textContent;
        const activeStorage = document.querySelector('.storage-button.active');
        const activeColor = document.querySelector('.color-swatch.active');

        document.getElementById('checkout-name').textContent = name;
        document.getElementById('checkout-image').src = image;
        document.getElementById('checkout-price').textContent = price;
        document.getElementById('checkout-storage').textContent =
            activeStorage ? activeStorage.textContent : 'Không có';
        document.getElementById('checkout-color').textContent =
            activeColor ? activeColor.title : 'Không có';

        modal.style.display = 'flex';
    });

    // --- Đóng popup ---
    closeBtn.addEventListener('click', () => (modal.style.display = 'none'));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // --- Chọn phương thức thanh toán ---
    cashBtn.addEventListener('click', () => {
        cashBtn.classList.add('active');
        bankBtn.classList.remove('active');
        qrSection.style.display = 'none';
    });

    bankBtn.addEventListener('click', () => {
        bankBtn.classList.add('active');
        cashBtn.classList.remove('active');
        qrSection.style.display = 'block';
    });

    // --- Xác nhận đơn hàng ---
    document.getElementById('confirm-btn').addEventListener('click', (e) => {
        e.preventDefault();
        let isValid = true;
        let msg = 'Đặt hàng thành công!';
        const phoneRegex = /^0[1-9][1-9][0-9]{7}$/;
        const phoneNumber = document.getElementById("receiver-phone").value.trim();
        const receiverName = document.getElementById('receiver-name').value.trim();
        const receiverAddress = document.getElementById('receiver-address').value.trim();
        const receiverNote = document.getElementById('receiver-note').value.trim();

        if (receiverName === '' || receiverAddress === '' || phoneNumber === '') {
            isValid = false;
            msg = 'Vui lòng điền đầy đủ thông tin nhận hàng';}
        if (isValid && !phoneRegex.test(phoneNumber)) {
            isValid = false;
            msg = 'Số điện thoại không hợp lệ';
        }

        alert(msg);
        if (isValid) modal.style.display = 'none';
        checkoutForm.reset();
    });
});

// --- THÊM VÀO GIỎ HÀNG ---
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.querySelector('.to-cart-button');

    addToCartBtn.addEventListener('click', () => {
        const currentUser = localStorage.getItem('CurrentUser');
        if (!currentUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            window.location.href = "login.html";
            return;
        }

        const name = document.getElementById('product-name').textContent;
        const price = document.getElementById('product-price').textContent;
        const activeStorage = document.querySelector('.storage-button.active');
        const activeColor = document.querySelector('.color-swatch.active');

        const storage = activeStorage ? activeStorage.textContent : '';
        const color = activeColor ? activeColor.title : '';
        const image = document.getElementById('main-image').src;

        // --- Tạo object sản phẩm ---
        const product = {
            name,
            storage,
            color,
            price,
            image,
            quantity: 1
        };

        // --- Lấy dữ liệu giỏ hàng hiện tại từ localStorage ---
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

        // --- Kiểm tra xem sản phẩm đã có trong giỏ chưa ---
        const existing = cart.find(item =>
            item.name === product.name &&
            item.storage === product.storage &&
            item.color === product.color
        );

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push(product);
        }

        // --- Lưu lại vào localStorage ---
        localStorage.setItem('shoppingCart', JSON.stringify(cart));

        alert('🛒 Sản phẩm đã được thêm vào giỏ hàng!');
        console.log("Giỏ hàng hiện tại:", cart);
    });
});
