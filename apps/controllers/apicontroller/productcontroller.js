var express = require("express");
var router = express.Router();
const multer = require('multer');
const path = require('path');
const verifyToken = require('../../../middleware/verifyToken');
const uploadDir = path.join(__dirname, '../../../public/img/Product');

var ProductService = require("../../services/productService");
router.get("/", async function (req, res) {
    var productService = new ProductService();
    var products = await productService.getProductList();
    res.json(products);
});
router.get("/random", async function (req, res) {
    var productService = new ProductService();
    var products = await productService.getRandomProducts();
    res.json(products);
});
router.get("/new", async function (req, res) {
    var productService = new ProductService();
    var products = await productService.getLatestProducts();
    res.json(products);
});
router.get("/cate/:id", async function (req, res) {
    const categoryId = req.params.id;
    const productService = new ProductService();
    const products = await productService.getProductByCategoryId(categoryId);
    res.json(products);
});
router.get("/:id", async function (req, res) {
    const productId = req.params.id;
    const productService = new ProductService();
    const product = await productService.getProduct(productId);
    res.json(product);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
        console.log('Đường dẫn lưu trữ ảnh:', uploadDir); // Lưu ảnh vào public/img/Product
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName); // Tạo tên file duy nhất
    },

});

const upload = multer({ storage: storage });

router.post('/add',
    verifyToken,
    upload.fields([
        { name: 'img1', maxCount: 1 },
        { name: 'img2', maxCount: 1 },
        { name: 'img3', maxCount: 1 }
    ]),
    async (req, res) => {
        console.log('Files nhận được:', req.files); // Kiểm tra file
        console.log('Body nhận được:', req.body);   // Kiểm tra dữ liệu khác
        try {
            const productData = {
                date: new Date(req.body.date),
                donvitinh: req.body.donvitinh,
                ten: req.body.ten,
                mota: req.body.mota,
                gia: parseFloat(req.body.gia),
                soluong: parseInt(req.body.soluong),
                img1: req.files['img1'] ? req.files['img1'][0].filename : null,
                img2: req.files['img2'] ? req.files['img2'][0].filename : null,
                img3: req.files['img3'] ? req.files['img3'][0].filename : null,
                category_id: parseInt(req.body.category_id),
                producer_id: parseInt(req.body.producer_id)
            };

            const productService = new ProductService();
            const result = await productService.insertProduct(productData);

            res.status(201).json({
                success: true,
                message: 'Sản phẩm đã được tạo thành công',
                data: result
            });
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi tạo sản phẩm',
                error: error.message
            });
        }
    }
);

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;

        console.log('ID sản phẩm:', productId);
        console.log('Dữ liệu cập nhật:', updatedData);

        const productService = new ProductService();
        const result = await productService.updateProduct(productId, updatedData);

        console.log('Kết quả cập nhật:', result);

        if (result.modifiedCount > 0) {
            res.status(200).json({
                success: true,
                message: 'Sản phẩm đã được cập nhật thành công',
                data: result
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm hoặc không có thay đổi'
            });
        }
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi cập nhật sản phẩm',
            error: error.message
        });
    }
});
router.post('/del/:id', verifyToken, async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('ID sản phẩm cần xóa:', productId);

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'ID sản phẩm không hợp lệ'
            });
        }
        const productService = new ProductService();
        const result = await productService.deleteProduct(productId);

        console.log('Kết quả xóa:', result);

        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: 'Sản phẩm đã được xóa thành công'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm để xóa'
            });
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa sản phẩm',
            error: error.message
        });
    }
});
module.exports = router;