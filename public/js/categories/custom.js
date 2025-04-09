document.addEventListener('DOMContentLoaded', function() {

    let editCategoryModal = new bootstrap.Modal(document.getElementById('edit-category'), {});
    let selectedCategoryId = null;

    document.querySelectorAll('.btn-warning').forEach(button => {
        button.addEventListener('click', function() {

            selectedCategoryId = this.getAttribute('data-id');


            fetch(`/admin-v2/categories/${selectedCategoryId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    document.querySelector('#edit-category input[name="name"]').value = data.name;
                    document.querySelector('#edit-category input[name="description"]').value = data.description;
                    editCategoryModal.show();
                })
                .catch(error => {
                    console.error('Error fetching category data:', error);
                    alert('Error fetching category data. Please try again.');
                });
        });
    });

    document.querySelector('#edit-category .btn-primary').addEventListener('click', function() {
        let updatedName = document.querySelector('#edit-category input[name="name"]').value;
        let updatedDescription = document.querySelector('#edit-category input[name="description"]').value;

        fetch(`/admin-v2/categories/${selectedCategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updatedName,
                description: updatedDescription
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Category updated successfully:', data);
                // Update the corresponding table row with the new values
                window.location.reload()
            })
            .catch(error => {
                console.error('Error updating category:', error);
                alert('Error updating category. Please try again.');
            });
    });
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', function() {
            let categoryId = this.getAttribute('data-id');
            if (confirm(`Are you sure you want to delete category ${categoryId}?`)) {
                fetch(`/admin-v2/categories/${categoryId}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Category ${categoryId} deleted successfully.`);
                            window.location.reload()
                        } else {
                            console.error(`Failed to delete category ${categoryId}.`);
                        }
                    })
                    .catch(error => console.error('Error deleting category:', error));
            }
        });
    });

});
