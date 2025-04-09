//
document.addEventListener("DOMContentLoaded", function() {
    const list = new List('table-default', {
        sortClass: 'table-sort',
        listClass: 'table-tbody',
        valueNames: [ 'sort-name', 'sort-type', 'sort-city', 'sort-score',
            { attr: 'data-date', name: 'sort-date' },
            { attr: 'data-progress', name: 'sort-progress' },
            'sort-quantity'
        ]
    });
});

// var editOrderModal;
var viewOrderModal;
var selectedOrderId;

$(document).ready(function() {
    // add event listener for button edit & remove
    // editOrderModal = new bootstrap.Modal(document.getElementById('edit-order'), {});
    viewOrderModal = new bootstrap.Modal(document.getElementById('view-order'), {});

    document.querySelectorAll('.trigger-view-order').forEach(button => {
        $(button).on('click', function() {
            selectedOrderId = this.getAttribute('data-id');

            fetch(`/admin-v2/orders/${selectedOrderId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const {id, user, address, tongsotien, ghichu, trangthai, phuongthuc, orderDate, orderDetails} = data;
                console.log(orderDetails);
                viewOrderModal.show();

                $('#view-order #name').html(`Order #${id}`);
                $('#view-order #total').html(tongsotien);
                $('#view-order #address').html(address);
                $('#view-order #user').html(user);
                $('#view-order #status').html(trangthai);
                $('#view-order #gateway').html(phuongthuc);
                $('#view-order #date').html(orderDate);
                $('#view-order #note').html(ghichu);

                // add item into orderDetails
                let orderItemsTable = $("#order-items tbody");
                orderItemsTable.empty();
                Array.from(orderDetails).forEach((item, index) => {
                    orderItemsTable.append(`<tr>
                        <td class="text-center">${index + 1}</td>
                        <td class="text-left">${item.product.ten}</td>
                        <td class="text-center">${item.quantity}</td>
                        <td class="text-end">${item.product.gia}$</td>
                    </tr>`);
                });

            })
            .catch(error => {
                if ( error ) {
                    console.error('Error fetching product data:', error);
                    alert('Error fetching product data. Please try again.');
                }
            });
        });
    });
    //
    // $('#view-order #btn-edit-product').on('click', function() {
    //     let name = $('#view-order [name="name"]').val();
    //     let description = $('#view-order [name="description"]').val();
    //     let price = $('#view-order [name="price"]').val();
    //     let quantity = $('#view-order [name="quantity"]').val();
    //     // let featuredImage = $('#view-order input[name="quantity"]').val();
    //     let note = $('#view-order [name="note"]').val();
    //
    //     fetch(`/admin-v2/products/${selectedProductId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: name,
    //             description: description,
    //             price: price,
    //             quantity: quantity,
    //             note: note
    //         })
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok ' + response.statusText);
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Product updated successfully:', data);
    //         // Update the corresponding table row with the new values
    //             window.location.reload()
    //     })
    //     .catch(error => {
    //         console.error('Error updating product:', error);
    //         alert('Error updating product. Please try again.');
    //     });
    // });
    //
    // document.querySelectorAll('.btn-youtube').forEach(button => {
    //     button.addEventListener('click', function() {
    //         let productId = this.getAttribute('data-id');
    //         if (confirm(`Are you sure you want to delete product ${productId}?`)) {
    //             fetch(`/admin-v2/products/${productId}`, {
    //                     method: 'DELETE'
    //             })
    //             .then(response => {
    //                 if (response.ok) {
    //                     console.log(`Product ${productId} deleted successfully.`);
    //                     window.location.reload()
    //                 } else {
    //                     console.error(`Failed to delete product ${productId}.`);
    //                 }
    //             })
    //             .catch(error => console.error('Error deleting product:', error));
    //         }
    //     });
    // });
});

$(document).ready(function() {
   $("[data-page]").on('click', function() {
       let page = $(this).data("page");
       let search = $("[name='s']").val();
       paginationHandler(page, search);
   });
   $("[name='s']").on('keyup', function(event) {
      if ( event.key === "Enter" ) {
          let page = $("#pagination-footer .active a").data("page");
          let search = $("[name='s']").val();
          paginationHandler(page, search);
      }
   });
   $("#btn-search").on('click', function(){
       let page = $("#pagination-footer .active a").data("page");
       let search = $("[name='s']").val();
       paginationHandler(page, search);
   });

    function paginationHandler(page, search) {

        page = page ? page : 1;
        $.ajax({
            url: `/api/orders/?page=${page}&s=${search}`,
            method: 'POST',
            success: function(res) {
                let totalRecords = res.total;
                let totalPage = totalRecords / 10;
                totalPage = totalRecords % 10 === 0 ? totalRecords : totalPage + 1;

                let pagination = $("#pagination-footer");
                pagination.empty();
                for(let i = 1; i <= totalPage; i++ ) {
                    let classActive = i === page ? 'active' : "";
                    let dataPage = i !== page ? `data-page=${i}` : "";
                    pagination.append(`<li class="page-item ${classActive}"><a class="page-link pe-auto" ${dataPage}>${i}</a></li>`);
                }

                $("[data-page]").on('click', function(event) {
                    paginationHandler(event);
                });

                let tableList = $("#table-list tbody");
                tableList.empty();
                Array.from(res.orders).forEach(order => {
                    tableList.append(`<tr>
                                    <td class="sort-name"><a href="#" class="trigger-view-order" data-bs-toggle="modal" data-bs-target="#view-order" data-id="${order.id}">Order #${order.id}</a></td>
                                    <td class="sort-user">${order.user}</td>
                                    <td class="sort-date" data-date="null">${order.orderDate}</td>
                                    <td class="sort-score"><span class="badge bg-lime text-lime-fg">${order.trangthai}</span></td>
                                    <td>${order.address}</td>
                                    <td class="sort-total">${order.tongsotien}$</td>
                                    <td><button class="btn btn-outline-primary btn-small trigger-view-order" data-bs-toggle="modal" data-bs-target="#view-order" data-id="${order.id}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M9 12l2 2l4 -4"></path></svg></button></td>
                                </tr>`);
                });
            },
        })
    }
});