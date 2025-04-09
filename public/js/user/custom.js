document.addEventListener("DOMContentLoaded", function() {
    let editUserModal;
    let selectedUserId;
    let usernames;

    editUserModal = new bootstrap.Modal(document.getElementById('edit-user'), {});


    document.querySelectorAll('.edit-user').forEach(button => {
        button.addEventListener('click', function() {
            selectedUserId = this.getAttribute('data-id');
            fetch(`/admin-v2/users/getusername/${selectedUserId}`,{method: 'GET'})

                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    document.querySelector('#edit-user [name="username"]').value = data.username;
                    document.querySelector('#edit-user [name="address"]').value = data.address;
                    document.querySelector('#edit-user [name="email"]').value = data.email;
                    document.querySelector('#edit-user [name="phone"]').value = data.phone;

                    // Show the modal
                    editUserModal.show();
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    alert('Error fetching user data. Please try again.');
                });
        });
    });

    // Handle the save button click in the edit modal
    document.getElementById('btn-edit-user').addEventListener('click', function() {
        const username = document.querySelector('#edit-user [name="username"]').value;
        const address = document.querySelector('#edit-user [name="address"]').value;
        const phone = document.querySelector('#edit-user [name="phone"]').value;
        const email = document.querySelector('#edit-user [name="email"]').value;

        fetch(`/admin-v2/users/update/${selectedUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, address, phone, email})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('User updated successfully:', data);
                // Optionally update the UI with the new user data or reload the page
                 window.location.reload();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                alert('Error updating user. Please try again.');
            });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            if (confirm(`Are you sure you want to delete user ${userId}?`)) {
                fetch(`/admin-v2/users/delete/${userId}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(`User ${userId} deleted successfully.`);
                            // Optionally remove the user from the UI or reload the page
                            window.location.reload();
                        } else {
                            console.error(`Failed to delete user ${userId}.`);
                        }
                    })
                    .catch(error => console.error('Error deleting user:', error));
            }
        });
    });
});
