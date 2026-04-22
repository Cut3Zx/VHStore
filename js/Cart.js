
class Cart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }

    add(product) {
        let existingItem = null;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === product.id) {
                existingItem = this.items[i];
                break;
            }
        }

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveToStorage();
    }

    changeQuantity(id, amount) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i].quantity += amount;
                if (this.items[i].quantity <= 0) {
                    this.items.splice(i, 1);
                }
                break;
            }
        }
        this.saveToStorage();
    }

    getTotalQuantity() {
        let count = 0;
        for (let item of this.items) {
            count += item.quantity;
        }
        return count;
    }

    getTotalPrice() {
        let total = 0;
        for (let item of this.items) {
            total += (item.price * item.quantity);
        }
        return total;
    }

    clear() {
        this.items = [];
        this.saveToStorage();
    }

    saveToStorage() {
        localStorage.setItem('vh_oop_cart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('vh_oop_cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }
}
//