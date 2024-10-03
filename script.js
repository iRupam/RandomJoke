document.getElementById("submitButton").addEventListener("click", fetchDataAndUpdateUI);

function fetchDataAndUpdateUI() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => updateUI(data))
        .catch(error => console.error('Error fetching data:', error));
}

function updateUI(data) {
    const { setup, punchline } = data;
    const htmlContent = `<p><strong>Setup:</strong> ${setup}</p>
                         <p><strong>Punchline:</strong> ${punchline}</p>`;
    document.getElementById("output").innerHTML = htmlContent;
}

document.getElementById("saveButton").addEventListener("click", saveAsImage);

function saveAsImage() {
    const outputDiv = document.getElementById("output");

    if (!outputDiv.innerHTML.trim()) {
        alert('No content to save!');
        return;
    }

    html2canvas(outputDiv).then(canvas => {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "random_joke.png";
        link.click();
    }).catch(error => console.error('Error saving image:', error));
}

// Theme toggle functionality
const themeToggleButton = document.getElementById("themeToggle");
themeToggleButton.addEventListener("click", toggleTheme);

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDarkTheme = document.body.classList.contains("dark-theme");
    themeToggleButton.textContent = isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme";
}
