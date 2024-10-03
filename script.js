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
  
    // RenderING the HTML content onto the canvas using the library html2canvas
    
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