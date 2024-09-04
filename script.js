document.getElementById('shortenBtn').addEventListener('click', function() {
    const originalUrl = document.getElementById('originalUrl').value;

    if (originalUrl) {
        // Send the URL to the backend server
        fetch('http://localhost:3001/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('shortUrl').value = data.shortUrl;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong, please try again.');
        });
    } else {
        alert('Please enter a valid URL');
    }
});
