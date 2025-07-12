// 🛍️ Show Products by Keyword
function showProducts(keyword) {
  const container = document.getElementById("productDisplay");
  container.innerHTML = "";
  container.style.display = "grid";
  
  fetch(`http://localhost:5000/api/products?q=${encodeURIComponent(keyword)}`)

   
    .then((res) => res.json())
  
    .then((data) => {
      if (!data.length) {
        container.innerHTML = `<p>No results found for "${keyword}".</p>`;
        return;
      }

      data.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product";
        card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}" width="100">
          <h3>${product.title}</h3>
          <p><strong>₹${(product.price * 83).toFixed(2)}</strong></p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      container.innerHTML = "<p>Failed to load products.</p>";
    });
}

// 🎨 Mic Button Animation
function clickme() {
  const micBtn = document.getElementById("micro");
  micBtn.classList.add("listening");
  setTimeout(() => {
    micBtn.classList.remove("listening");
  }, 5000);
}

// 🎙️ Voice Recognition Setup
let isRecognizing = false;
let recognition;

const button = document.getElementById("micro");
const result = document.getElementById("result");

window.onload = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("start", () => {
    isRecognizing = true;
    result.textContent = "🎤 Listening...";
    clickme();
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript.trim();
    result.textContent = `🗣️ You said: "${transcript}"`;
    showProducts(transcript);
  });

  recognition.addEventListener("end", () => {
    isRecognizing = false;
  });

  recognition.addEventListener("error", (event) => {
    console.error("Recognition error:", event.error);
    result.textContent = `⚠️ Error: ${event.error}`;
    isRecognizing = false;
  });
};

button.addEventListener("click", () => {
  if (!isRecognizing && recognition) {
    recognition.start();
  }
});
