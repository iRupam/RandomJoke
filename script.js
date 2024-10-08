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
            // Handle error and display a message to the user
            console.error('Error fetching data:', error);
            document.getElementById("output").innerHTML = "<p>Oops! Couldn't fetch a joke right now.</p>";
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

    // Enable the copy button
    document.getElementById("copyButton").disabled = false;
}

// Add click event listener for the Save button
document.getElementById("saveButton").addEventListener("click", function () {
    const outputDiv = document.getElementById("output");
    const html = outputDiv.innerHTML;
  
    // Create a temporary canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    // Get estimated dimensions based on content
    const estimatedWidth = outputDiv.clientWidth;
    const estimatedHeight = outputDiv.clientHeight;
  
    // Set canvas dimensions
    canvas.width = estimatedWidth;
    canvas.height = estimatedHeight;
  
    // Rendering the HTML content onto the canvas using the library html2canvas
    html2canvas(outputDiv, { canvas }).then(function (canvas) {
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL("image/png");
  
      // Create a downloadable anchor element
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "random_joke.png";
      link.click();
    });
});

// Theme toggle functionality
const themeToggleButton = document.getElementById("themeToggle");
themeToggleButton.addEventListener("click", toggleTheme);

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDarkTheme = document.body.classList.contains("dark-theme");
    themeToggleButton.textContent = isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme";
}

// Add click event listener for the Copy button
document.getElementById("copyButton").addEventListener("click", function () {
    const outputDiv = document.getElementById("output");
    const jokeText = outputDiv.innerText;

    navigator.clipboard.writeText(jokeText).then(function() {
        alert("Joke copied to clipboard!");
    }, function() {
        alert("Failed to copy joke. Please try again.");
    });
});

// Disable the copy button initially
document.getElementById("copyButton").disabled = true;
