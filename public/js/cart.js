// var cart = {
//     init: function () {
//         cart.regEvents();
//     },
//     regEvents: function () {
//         $('#btnContinue').off('click').on('click', function () {
//             window.location.href = "/san-pham";
//         });
//         $('#btnPayment').off('click').on('click', function () {
//             window.location.href = "/thanh-toan";
//         });
//         $('#btnUpdate').off('click').on('click', function () {
//             var listProduct = $('.txtQuantity');
//             var cartList = [];
//             $.each(listProduct, function (i, item) {
//                 cartList.push({
//                     Quantity: $(item).val(),
//                     Product: {
//                         IdPro: $(item).data('id')
//                     }
//                 });
//             });
//             $.ajax({
//                 url: '/Cart/Update',
//                 data: { cartModel: JSON.stringify(cartList) },
//                 dataType: 'json',
//                 type: 'POST',
//                 success: function (res) {
//                     if (res.status == true) {
//                         window.location.href = "/gio-hang";
//                     }
//                 }
//             })
//         });
//         $('#btnDeleteAll').off('click').on('click', function(e) {
//             e.preventDefault();
//             $.ajax({
//                 url: '/cart/clear',
//                 type: 'GET',
//                 success: function(res) {
//                     // Nếu yêu cầu thành công, reload lại trang giỏ hàng
//                     window.location.href = "/cart";
//                 },
//                 error: function(xhr, status, error) {
//                     // Xử lý lỗi nếu có
//                     alert('Có lỗi xảy ra. Vui lòng thử lại!');
//                 }
//             });
//         });
//         $('.btn-delete').off('click').on('click', function(e) {
//             e.preventDefault();
//             var productId = $(this).data('id');
//             $.ajax({
//                 url: '/cart/remove/' + productId,
//                 type: 'GET',
//                 success: function(res) {
//                     // Nếu yêu cầu thành công, reload lại trang giỏ hàng
//                     window.location.href = "/cart";
//                 },
//                 error: function(xhr, status, error) {
//                     // Xử lý lỗi nếu có
//                     alert('Có lỗi xảy ra. Vui lòng thử lại!');
//                 }
//             });
//         });
//     }
// }
// cart.init();
