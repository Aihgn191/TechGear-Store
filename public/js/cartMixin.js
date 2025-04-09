const cartMixin = {
    computed: {
        subtotal() {
            return this.cartItems.reduce((total, item) => {
                return total + item.product.gia * item.quantity;
            }, 0);
        }
    },
    methods: {
        async loadCart() {
            const rawCart = JSON.parse(localStorage.getItem("cart")) || [];
            const fetches = rawCart.map(async (item) => {
                const res = await fetch(`/api/product/${item.productId}`);
                if (!res.ok) return null;
                const product = await res.json();
                return { product, quantity: item.quantity };
            });
            const results = await Promise.all(fetches);
            this.cartItems = results.filter(item => item !== null);
        }
    }
};

// Gắn mixin vào Vue global hoặc để sử dụng sau