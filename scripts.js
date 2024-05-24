document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = 'Uploading...';

    const formData = new FormData();
    const fileInput = document.getElementById('contractFile');
    formData.append('contractFile', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            statusMessage.textContent = 'Upload successful!';
        } else {
            statusMessage.textContent = 'Upload failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        statusMessage.textContent = 'An error occurred. Please try again.';
    });
});

// Handle the logout functionality
document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault();
    fetch('/logout', {
        method: 'POST',
        credentials: 'include' // Ensures cookies are included
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'login.html'; // Redirect to login page or homepage
        } else {
            alert('Logout failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
})