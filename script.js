document.getElementById('shortenBtn').addEventListener('click', async function() {
    const shortenBtn = document.getElementById('shortenBtn');
    const originalUrl = document.getElementById('originalUrl').value;

    if (originalUrl) {
        try {
            // Change button text to 'Generating...' and disable button
            shortenBtn.textContent = 'Generating...';
            shortenBtn.classList.add('disabled'); // Add a class to show it's disabled

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
        } finally {
            // Reset the button text and remove the disabled class
            shortenBtn.textContent = 'Generate Shortened URL';
            shortenBtn.classList.remove('disabled');
        }
    } else {
        alert('Please enter a valid URL.');
    }
});



// Copy shortened URL to clipboard
document.getElementById('copyBtn').addEventListener('click', function () {
    const shortUrlInput = document.getElementById('shortUrl');
    shortUrlInput.select();
    document.execCommand('copy');
    alert('Shortened URL copied to clipboard!');
});

// Visit the shortened URL in a new tab
document.getElementById('visitBtn').addEventListener('click', function () {
    const shortUrl = document.getElementById('shortUrl').value;
    if (shortUrl) {
        window.open(shortUrl, '_blank');
    }
});

// Clear input when clear icon is clicked
document.querySelector('.clearImg').addEventListener('click', function () {
    clearInput('originalUrl');  // Clear original URL input
    clearInput('shortUrl');     // Clear shortened URL input
    document.getElementById('copyBtn').disabled = true;  // Disable copy button
    document.getElementById('visitBtn').disabled = true; // Disable visit button
});

// Clear function to reset input fields
function clearInput(inputId) {
    document.getElementById(inputId).value = '';
}
