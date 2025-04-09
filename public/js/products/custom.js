document.addEventListener("DOMContentLoaded", function () {
    const list = new List('table-default', {
        sortClass: 'table-sort',
        listClass: 'table-tbody',
        valueNames: ['sort-name', 'sort-type', 'sort-city', 'sort-score',
            { attr: 'data-date', name: 'sort-date' },
            { attr: 'data-progress', name: 'sort-progress' },
            'sort-quantity'
        ]
    });
});

$(document).ready(function () {
    // Xóa phần code liên quan đến edit-product
    // editProductModal = new bootstrap.Modal(document.getElementById('edit-product'), {});
    // document.querySelectorAll('.edit-product').forEach(button => { ... });
    // $('#edit-product #btn-edit-product').on('click', function () { ... });

    // Giữ lại phần xóa sản phẩm
    document.querySelectorAll('.btn-youtube').forEach(button => {
        button.addEventListener('click', function () {
            let productId = this.getAttribute('data-id');
            if (confirm(`Are you sure you want to delete product ${productId}?`)) {
                fetch(`/admin-v2/products/${productId}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Product ${productId} deleted successfully.`);
                            window.location.reload();
                        } else {
                            console.error(`Failed to delete product ${productId}.`);
                        }
                    })
                    .catch(error => console.error('Error deleting product:', error));
            }
        });
    });
});

$(document).ready(function () {
    $("[data-page]").on('click', function () {
        let page = $(this).data("page");
        let search = $("[name='s']").val();
        paginationHandler(page, search);
    });
    $("[name='s']").on('keyup', function (event) {
        if (event.key === "Enter") {
            let page = $("#pagination-footer .active a").data("page");
            let search = $("[name='s']").val();
            paginationHandler(page, search);
        }
    });

    function paginationHandler(page, search) {
        page = page ? page : 1;
        $.ajax({
            url: `/api/products/?page=${page}&s=${search}`,
            method: 'POST',
            success: function (res) {
                let totalRecords = res.total;
                let totalPage = totalRecords / 10;
                totalPage = totalRecords % 10 === 0 ? totalRecords : totalPage + 1;

                let pagination = $("#pagination-footer");
                pagination.empty();
                for (let i = 1; i <= totalPage; i++) {
                    let classActive = i === page ? 'active' : "";
                    let dataPage = i !== page ? `data-page=${i}` : "";
                    pagination.append(`<li class="page-item ${classActive}"><a class="page-link pe-auto" ${dataPage}>${i}</a></li>`);
                }

                $("[data-page]").on('click', function (event) {
                    let page = $(this).data("page");
                    let search = $("[name='s']").val();
                    paginationHandler(page, search);
                });

                let tableList = $("#table-list tbody");
                tableList.empty();
                Array.from(res.products).forEach(product => {
                    tableList.append(`<tr>
                        <td><img src="/img/Sản Phẩm/${product.img1}" width="40"></td>
                        <td class="sort-name">${product.ten}</td>
                        <td class="sort-price" data-price="${product.gia}">${product.gia}$</td>
                        <td class="sort-categories">${product.category.name}</td>
                        <td class="sort-date" data-date="null">${product.date}</td>
                        <td class="sort-quantity">${product.soluong}</td>
                        <td>
                            <div class="btn-list flex-nowrap">
                                <a class="btn btn-rss w-100 btn-icon edit-product" data-id="${product._id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>
                                </a>
                                <a class="btn btn-youtube w-100 btn-icon" data-id="${product._id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>
                                </a>
                            </div>
                        </td>
                    </tr>`);
                });
            },
        });
    }
});