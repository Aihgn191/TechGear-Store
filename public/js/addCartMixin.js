const addCartMixin = {
    methods: {
        async addToCart(productId, quantity) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = cart.find(item => item.productId === productId);
            console.log("Giỏ hàng trước khi thay đổi:", existingItem);

            if (existingItem) {
                const res = await fetch(`/api/product/${productId}`);
                if (!res.ok) {
                    throw new Error('Lỗi khi lấy dữ liệu sản phẩm');
                }
                const product = await res.json();
                if (existingItem.quantity >= product.soluong) {
                    alert("❌ Số lượng bạn thêm trong giỏ hàng vượt quá số lượng sản phẩm hiện có!");
                    return;
                }
                existingItem.quantity += quantity;
            } else {
                cart.push({ productId, quantity });
            }
            console.log("Giỏ hàng sau khi thay đổi:", cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("🛒 Đã thêm vào giỏ hàng!");
        }
    }
};