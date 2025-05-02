// Handle login
function displayMessage(event) {
  event.preventDefault();
  
  let name = document.getElementById("userName").value.trim();
  let email = document.getElementById("userEmail").value.trim();
  let password = document.getElementById("userPassword").value.trim();
  let message = document.getElementById("msg");

  let storedEmail = sessionStorage.getItem("signupEmail");
  let storedPassword = sessionStorage.getItem("signupPassword");

  if (email === storedEmail && password === storedPassword) {
    sessionStorage.setItem("signupName", name);
    message.innerHTML = `Welcome <strong>${name}</strong>!<br>Redirecting to your crypto dashboard...`;
    message.style.color = "lightgreen";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  } else {
    message.innerHTML = "Invalid email or password.";
    message.style.color = "red";
  }
}

// Dashboard logic
const userDisplay = document.getElementById("displayName");
if (userDisplay) {
  const name = sessionStorage.getItem("signupName");
  if (!name) {
    window.location.href = "index.html";
  } else {
    userDisplay.textContent = name;

    // Fetch live crypto prices
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("cryptoPrices");
        container.innerHTML = `
          <p>Bitcoin (BTC): $${data.bitcoin.usd}</p>
          <p>Ethereum (ETH): $${data.ethereum.usd}</p>
          <p>Dogecoin (DOGE): $${data.dogecoin.usd}</p>
        `;
      });
  }
}

// Logout
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}
// Placeholder for future JavaScript functionality
console.log("Website loaded successfully.");