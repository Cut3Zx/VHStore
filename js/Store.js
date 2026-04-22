class Store {
    constructor() {
        this.api = new DataService();
        this.ui = new UIManager();
        this.cart = new Cart();
        this.products = [];
        this.bindEvents();
    }

    async init() {
        let layVe = await this.api.fetchProducts();
        this.products = [];
        for (let item of layVe) {
            this.products.push(new Product(item.id, item.name, item.price, item.category, item.image, item.description, item.stock));
        }
        this.ui.renderProducts(this.products);
        this.ui.renderCart(this.cart);
    }

    filterCategory(catName) {
        if (catName === 'all') {
            this.ui.renderProducts(this.products);
        } else {
            let pFiltered = this.products.filter(p => p.category === catName);
            this.ui.renderProducts(pFiltered);
        }
        this.ui.highlightCategory(catName);
    }

    searchProducts(keyword) {
        let textTuKhoa = keyword.toLowerCase();
        let pFiltered = this.products.filter(p => p.name.toLowerCase().includes(textTuKhoa));
        this.ui.renderProducts(pFiltered);
    }

    addToCart(idPhaiThem) {
        let myProduct = this.products.find(p => p.id === idPhaiThem);
        if (myProduct) {
            this.cart.add(myProduct);          
            this.ui.renderCart(this.cart);     
            alert("Đã bỏ vào giỏ: " + myProduct.name);
        }
    }

    changeCartQty(id, amount) {
        this.cart.changeQuantity(id, amount);
        this.ui.renderCart(this.cart);
    }

    async submitOrder(event) {
        event.preventDefault(); 
        if (this.cart.items.length === 0) return alert("Giỏ hàng rỗng!");

        let khachHang = {
            name: document.getElementById('cust-name').value,
            phone: document.getElementById('cust-phone').value,
            address: document.getElementById('cust-address').value
        };

        let newOrder = {
            id: "VH-" + Math.floor(Math.random() * 99999),
            items: this.cart.items,
            customer: khachHang,
            total: this.cart.getTotalPrice()
        };

        let thanhCong = await this.api.submitOrder(newOrder);
        
        if (thanhCong) {
            this.cart.clear(); 
            this.ui.renderCart(this.cart);
            this.ui.closeModal('checkout-modal');
            this.ui.closeCartSidebar();
            this.ui.renderSuccessMessage(newOrder.id, newOrder.total);
            this.ui.showModal('success-modal');
        }
    }

    bindEvents() {
        document.getElementById('search-input').oninput = (e) => this.searchProducts(e.target.value);
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.onclick = (e) => this.filterCategory(e.target.getAttribute('data-category'));
        });

        document.getElementById('cart-btn').onclick = () => this.ui.openCartSidebar();
        document.getElementById('close-cart').onclick = () => this.ui.closeCartSidebar();
        document.getElementById('cart-overlay').onclick = () => this.ui.closeCartSidebar();

        document.getElementById('checkout-btn').onclick = () => {
             if (this.cart.items.length > 0) {
                 this.ui.closeCartSidebar();
                 this.ui.showModal('checkout-modal');
             } else {
                 alert("Bỏ đồ vô giỏ đi bạn ơi!");
             }
        };

        document.getElementById('close-checkout').onclick = () => this.ui.closeModal('checkout-modal');
        document.getElementById('checkout-form').onsubmit = (e) => this.submitOrder(e);
        
        document.getElementById('close-success').onclick = () => this.ui.closeModal('success-modal');
        document.getElementById('continue-shopping').onclick = () => this.ui.closeModal('success-modal');
    }
}

const myStore = new Store();
window.onload = () => {
    myStore.init(); 
};
