// Login form ke submit event ko handle karne wala function
async function handleLogin(e) {
  // Default form submission ko prevent karna
  e.preventDefault();

  // Username aur password ko get karna
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Agar username aur password dono hai, toh user ko verify karna
  if (username && password) {
    const user = getUser(username);

    // Agar user hai aur password match karta hai, toh access grant karna
    if (user && atob(user.password) === password) {
      showPopup('ACCESS', 'GRANTED', false);

      // 3 seconds ke baad portfolio page par redirect karna
      setTimeout(() => {
        hackerTransition('https://the-syntax-slayer.github.io/', () => {
          window.location.href = 'https://the-syntax-slayer.github.io/'; // Portfolio page par redirect
        }, false); // Login animation
      }, 3000);
    } else {
      // Access denied popup show karna
      showPopup('ACCESS', 'DENIED', true);
    }
  } else {
    // Access denied popup show karna
    showPopup('ACCESS', 'DENIED', true);
  }
}

// Document ko load hone ke baad event listeners ko add karna
document.addEventListener('DOMContentLoaded', function() {
  // Login form ko get karna
  const loginForm = document.getElementById('loginForm');

  // Agar login form hai, toh uske submit event ko handle karna
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});