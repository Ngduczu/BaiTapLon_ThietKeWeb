document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.querySelector('.cart-list');
    const totalPriceElement = document.querySelector('.total-price');
    const paymentButton = document.querySelector('.payment-button');

    // --- Lấy giỏ hàng từ localStorage ---
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // --- Nếu giỏ trống ---
    if (cart.length === 0) {
        cartList.innerHTML = `
            <li class="empty-cart">🛒 Giỏ hàng của bạn đang trống!</li>
        `;
        totalPriceElement.textContent = 'Tổng tiền: 0đ';
        paymentButton.textContent = 'Thanh toán';
        paymentButton.disabled = true;
        return;
    }

    // --- Hàm render sản phẩm ---
    function renderCart() {
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            // Tính giá (bỏ dấu . và đ)
            const priceValue = parseFloat(item.price.replace(/[^\d]/g, ''));
            total += priceValue * item.quantity;

            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <div class="cart-item-left">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                </div>
                <div class="cart-item-info">
                    <div class="product-info">
                        <div class="cart-item-name">
                            <h3>${item.name}</h3>
                        </div>
                        <div class="cart-item-detail">
                            <p>Màu: ${item.color}</p>
                            <p>Dung lượng: ${item.storage}</p>
                            <p>Giá: ${item.price}</p>
                        </div>
                    </div>
                    <div class="quanlity-control-unit">
                        <div class="quantity-control">
                            <button class="decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="increase">+</button>
                        </div>
                            <button class="remove-btn">🗑️ Xóa</button>
                    </div>
                </div>
            `;

            // --- Gắn sự kiện cho các nút ---
            li.querySelector('.increase').addEventListener('click', () => {
                item.quantity++;
                saveAndRender();
            });

            li.querySelector('.decrease').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    if (confirm('Xóa sản phẩm này khỏi giỏ?')) {
                        cart.splice(index, 1);
                    }
                }
                saveAndRender();
            });

            li.querySelector('.remove-btn').addEventListener('click', () => {
                if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                    cart.splice(index, 1);
                    saveAndRender();
                }
            });

            cartList.appendChild(li);
        });

        // --- Hiển thị tổng tiền ---
        totalPriceElement.textContent = `Tổng tiền: ${total.toLocaleString('vi-VN')}đ`;
        paymentButton.textContent = 'Thanh toán (' + cart.length + ' sản phẩm)';
    }

    // --- Hàm lưu + render lại ---
    function saveAndRender() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart();
    }

    renderCart();
});
// ==========================
// FORM THANH TOÁN
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('checkout-modal');
    const closeBtn = document.querySelector('.close-btn');
    const paymentButton = document.querySelector('.payment-button');
    const cashBtn = document.getElementById('cash-btn');
    const bankBtn = document.getElementById('bank-btn');
    const qrSection = document.getElementById('qr-section');
    const checkoutForm = document.getElementById('checkout-form');

    // --- Mở form khi bấm nút thanh toán ---
    paymentButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // --- Đóng form khi bấm dấu X ---
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // --- Đóng khi bấm ngoài vùng form ---
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
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

    // --- Xử lý xác nhận thanh toán ---
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('receiver-name').value.trim();
        const phone = document.getElementById('receiver-phone').value.trim();
        const address = document.getElementById('receiver-address').value.trim();

        if (!name || !phone || !address) {
            alert('⚠️ Vui lòng nhập đầy đủ thông tin nhận hàng!');
            return;
        }

        const method = cashBtn.classList.contains('active')
            ? 'Thanh toán tiền mặt'
            : 'Chuyển khoản ngân hàng';

        alert(`✅ Đơn hàng đã được xác nhận!\n
👤 Người nhận: ${name}
📞 Số điện thoại: ${phone}
📍 Địa chỉ: ${address}
💳 Phương thức: ${method}
\nCảm ơn bạn đã mua hàng ❤️`);

        // --- Xóa giỏ hàng sau khi thanh toán ---
        localStorage.removeItem('shoppingCart');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        location.reload();
    });
});
