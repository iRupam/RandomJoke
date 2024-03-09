document.getElementById("submitButton").addEventListener("click", function() {
    // Call your API and update the frontend with the response
    fetchDataAndUpdateUI();
});

function fetchDataAndUpdateUI() {
    // Use fetch or another method to make a request to your API
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            // Update the UI with the data from the API response
            updateUI(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function updateUI(data) {
    // Extract setup and punchline from the API response data
    const setup = data.setup;
    const punchline = data.punchline;

    // Create HTML content with two <p> elements
    const htmlContent = `<p><strong>Setup:</strong> ${setup}</p>
                         <p><strong>Punchline:</strong> ${punchline}</p>`;

    // Update the content of the output div with the HTML content
    document.getElementById("output").innerHTML = htmlContent;
}
