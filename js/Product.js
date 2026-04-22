class Product {
    constructor(id, name, price, category, image, description, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
        this.description = description;
        this.stock = stock;
    }

    getFormattedPrice() {
        return this.price.toLocaleString('vi-VN') + " ₫";
    }

    isOutOfStock() {
        return this.stock <= 0;
    }
}
