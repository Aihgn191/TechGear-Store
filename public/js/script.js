new Vue({
    el: '#container',
    data: {
        regUsername: '',
        regEmail: '',
        regPassword: '',
        regPhone: '',
        regAddress: '',
        loginInput: '',
        loginPassword: ''
    },
    methods: {
        async register() {
            // Kiểm tra các trường bắt buộc
            if (!this.regUsername || !this.regEmail || !this.regPassword) {
                alert('Vui lòng nhập đầy đủ thông tin: Username, Email và Password');
                return; // Dừng hàm nếu thiếu thông tin
            }

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: this.regUsername,
                        email: this.regEmail,
                        password: this.regPassword,
                        phonenumber: this.regPhone,
                        address: this.regAddress
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = '/home';
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error('Lỗi đăng ký:', err);
                alert('Đã xảy ra lỗi khi đăng ký');
            }
        },
        async login() {
            if (!this.loginInput || !this.loginPassword) {
                alert('Vui lòng nhập đầy đủ thông tin: Username/Email và Password');
                return;
            }
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        loginInput: this.loginInput,
                        password: this.loginPassword,
                        redirectUrl: this.redirectUrl || '/home'
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = data.redirectTo;
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error('Lỗi đăng nhập:', err);
                alert('Đã xảy ra lỗi khi đăng nhập');
            }
        }
    },
    mounted() {
        this.redirectUrl = this.$el.dataset.redirect || '';
        console.log('Redirect URL:', this.redirectUrl);
    }
});

// Logic toggle giao diện giữ nguyên
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});