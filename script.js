document.getElementById('shortenBtn').addEventListener('click', function() {
    const originalUrl = document.getElementById('originalUrl').value;

    if (originalUrl) {
        // Send the URL to the backend server
        fetch('/shorten', {  // Using relative URL to make sure it works on both local and deployed environments
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl })
        })
        .then(response => response.text())  // First get the response as text
        .then(text => {
            try {
                return JSON.parse(text);  // Attempt to parse it as JSON
            } catch (error) {
                throw new Error('Response is not valid JSON: ' + text);
            }
        })
        .then(data => {
            if (data && data.shortUrl) {
                document.getElementById('shortUrl').value = data.shortUrl;
            } else {
                throw new Error('Invalid response data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong, please try again.');
        });
    } else {
        alert('Please enter a valid URL');
    }
});
