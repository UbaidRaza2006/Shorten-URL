document.getElementById('shortenBtn').addEventListener('click', async function() {
    const originalUrl = document.getElementById('originalUrl').value;

    if (originalUrl) {
        try {
            // Send the original URL to the backend to generate the short URL
            const response = await fetch('https://shorten-url-api.vercel.app/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalUrl })
            });

            if (!response.ok) {
                throw new Error('Failed to shorten the URL');
            }

            const data = await response.json();
            document.getElementById('shortUrl').value = data.shortUrl;

            // Enable buttons after the URL is fetched
            document.getElementById('copyBtn').disabled = false;
            document.getElementById('visitBtn').disabled = false;

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    } else {
        alert('Please enter a valid URL.');
    }
});

// Copy shortened URL to clipboard
document.getElementById('copyBtn').addEventListener('click', function() {
    const shortUrlInput = document.getElementById('shortUrl');
    shortUrlInput.select();
    document.execCommand('copy');
    alert('Shortened URL copied to clipboard!');
});

// Visit the shortened URL in a new tab
document.getElementById('visitBtn').addEventListener('click', function() {
    const shortUrl = document.getElementById('shortUrl').value;
    if (shortUrl) {
        window.open(shortUrl, '_blank');
    }
});


function clearInput(inputId) {
    document.getElementById(inputId).value = '';
}
