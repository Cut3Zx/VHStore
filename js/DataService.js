class DataService {
    constructor() {
        const SUPABASE_URL = 'https://xtbumardbwwbczlvkief.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_g04nJW63z0eXtmzOjW-JxQ_SYG1WOmM';
        this.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    async fetchProducts() {
        let { data, error } = await this.db.from('products').select('*').order('id', { ascending: true });
        if (error) {
            alert("Lỗi kết nối cơ sở dữ liệu: " + error.message);
            return [];
        }
        return data;
    }

    async submitOrder(orderData) {
        let { error } = await this.db.from('orders').insert([orderData]);
        if (error) {
            alert("Lỗi đặt hàng: " + error.message);
            return false;
        }
        return true;
    }
}
