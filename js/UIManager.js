class UIManager {
    renderProducts(danhSachInRa) {
        let grid = document.getElementById('product-grid');
        document.getElementById('product-count').innerText = danhSachInRa.length + " sản phẩm";
        grid.innerHTML = "";

        if (danhSachInRa.length === 0) {
            grid.innerHTML = '<h2>Không tìm thấy sản phẩm!</h2>';
            return;
        }

        for (let sp of danhSachInRa) {
            let isHetHang = sp.isOutOfStock();
            let badgetHtml = isHetHang ? '<span class="badge badge-outofstock">Hết hàng</span>' : '';
            let btnClass = isHetHang ? 'btn-disabled' : '';
            let btnDisabled = isHetHang ? 'disabled' : '';
            let btnText = isHetHang ? 'Đã hết' : 'Thêm vào giỏ';

            let html = `
                <div class="product-card">
                    <div class="product-image-wrap">
                        <div class="product-image">${sp.image}</div>
                        <div class="product-badges">${badgetHtml}</div>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${sp.category.toUpperCase()}</span>
                        <h3 class="product-name">${sp.name}</h3>
                        <p class="product-desc">${sp.description}</p>
                        <div class="product-footer">
                            <div class="product-price">${sp.getFormattedPrice()}</div>
                            <button class="btn-add-cart ${btnClass}" 
                                onclick="myStore.addToCart(${sp.id})" ${btnDisabled}>
                                ${btnText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.innerHTML += html;
        }
    }

    renderCart(cart) {
        let khuVucMua = document.getElementById('cart-items');
        let txtTongTien = document.getElementById('cart-total');
        let iconSoLuong = document.getElementById('cart-count');

        let cartItems = cart.items;

        if (cartItems.length === 0) {
            khuVucMua.innerHTML = `<div style="text-align:center; padding:20px;"><h1>🛒</h1><p>Giỏ trống trơn</p></div>`;
            iconSoLuong.classList.add('hidden');
            txtTongTien.innerText = "0 ₫";
            document.getElementById('cart-subtotal').innerText = "0 ₫";
            return;
        }

        iconSoLuong.classList.remove('hidden');
        iconSoLuong.innerText = cart.getTotalQuantity();

        let tienText = cart.getTotalPrice().toLocaleString('vi-VN') + " ₫";
        txtTongTien.innerText = tienText;
        document.getElementById('cart-subtotal').innerText = tienText;

        khuVucMua.innerHTML = "";
        for (let item of cartItems) {
            khuVucMua.innerHTML += `
                <div class="cart-item" style="display:flex; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
                    <div style="font-size:40px; margin-right:15px;">${item.image}</div>
                    <div style="flex:1;">
                        <div style="font-weight:bold; font-size:14px;">${item.name}</div>
                        <div style="font-size:12px; color: gray;">${item.price.toLocaleString('vi-VN')} ₫</div>
                        <div style="margin-top:5px;">
                            <button onclick="myStore.changeCartQty(${item.id}, -1)">-</button>
                            <span style="display:inline-block; width:20px; text-align:center;">${item.quantity}</span>
                            <button onclick="myStore.changeCartQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    highlightCategory(catName) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            if (btn.getAttribute('data-category') === catName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    openCartSidebar() {
        document.getElementById('cart-sidebar').classList.add('open');
        document.getElementById('cart-overlay').classList.add('show');
    }

    closeCartSidebar() {
        document.getElementById('cart-sidebar').classList.remove('open');
        document.getElementById('cart-overlay').classList.remove('show');
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    renderSuccessMessage(orderId, totalAmount) {
        document.getElementById('success-order-id').innerText = orderId;
        document.getElementById('success-total').innerText = totalAmount.toLocaleString('vi-VN') + " ₫";
    }
}
