// Welcome message dikhane wala function
function showWelcomeMessage(name, callback) {
  const welcomePopup = document.createElement('div');
  welcomePopup.style.position = 'fixed';
  welcomePopup.style.top = '50%';
  welcomePopup.style.left = '50%';
  welcomePopup.style.transform = 'translate(-50%, -50%)';
  welcomePopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  welcomePopup.style.color = '#0f0';
  welcomePopup.style.padding = '20px';
  welcomePopup.style.borderRadius = '10px';
  welcomePopup.style.boxShadow = '0 0 20px #0f0';
  welcomePopup.style.textAlign = 'center';
  welcomePopup.style.fontFamily = 'Courier New, monospace';
  welcomePopup.style.fontSize = '18px';
  welcomePopup.style.zIndex = '10000'; // Ensure it's above the hacker transition
  welcomePopup.style.pointerEvents = 'none'; // Allow clicks to pass through
  welcomePopup.style.width = '80%'; // Set width to 80% of the screen
  welcomePopup.style.maxWidth = '300px'; // Set maximum width

  document.body.appendChild(welcomePopup);

  const messages = [
    `Welcome, ${name.toUpperCase()}!`,
    'Please login',
    'to GET ACCESS!'
  ];

  let currentMessageIndex = 0;
  let currentCharIndex = 0;

  function typeMessage() {
    if (currentMessageIndex < messages.length) {
      if (currentCharIndex === 0) {
        welcomePopup.innerHTML += '<div>';
      }
      if (currentCharIndex < messages[currentMessageIndex].length) {
        welcomePopup.lastChild.textContent += messages[currentMessageIndex][currentCharIndex];
        currentCharIndex++;
        setTimeout(typeMessage, 50);
      } else {
        welcomePopup.innerHTML += '</div>';
        currentMessageIndex++;
        currentCharIndex = 0;
        setTimeout(typeMessage, 500);
      }
    } else {
      setTimeout(() => {
        hackerTransition('login.html', callback, true);
      }, 2000);
    }
  }

  typeMessage();
}

// Signup form ke submit event ko handle karne wala function
async function handleSignup(e) {
  // Default form submission ko prevent karna
  e.preventDefault();

  // Name, username, aur password ko get karna
  const name = document.getElementById('name').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Agar sabhi fields hai, toh user ko save karna
  if (name && username && password) {
    const existingUser = getUser(username);

    // Agar user already exists, toh error show karna
    if (existingUser) {
      showPopup('SIGNUP', 'USERNAME EXISTS', true);
    } else {
      // User ko save karna
      saveUser(name, username, password);

      // Signup successful popup show karna
      showPopup('SIGNUP', 'SUCCESSFUL', false);

      // Hacker transition aur welcome message ek saath dikhana
      setTimeout(() => {
        hackerTransition('login.html', () => {
          showWelcomeMessage(name, () => {
            // Welcome message ke baad login page par redirect
            window.location.href = 'login.html';
          });
        }, true);
      }, 3000);
    }
  } else {
    // All fields required error show karna
    showPopup('SIGNUP', 'ALL FIELDS REQUIRED', true);
  }
}

// Document ko load hone ke baad event listeners ko add karna
document.addEventListener('DOMContentLoaded', function() {
  // Signup form ko get karna
  const signupForm = document.getElementById('signupForm');

  // Agar signup form hai, toh uske submit event ko handle karna
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // Add a button to display saved data
  // Get the body element
  const body = document.body;

  // Create a button to display saved data
  const displayDataButton = document.createElement('button');
  displayDataButton.innerHTML = '<span style="color: #0f0;">&#128187;</span>';
  displayDataButton.style.position = 'fixed';
  displayDataButton.style.bottom = '10px';
  displayDataButton.style.right = '10px';
  displayDataButton.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
  displayDataButton.style.color = '#0f0';
  displayDataButton.style.border = '1px solid #0f0';
  displayDataButton.style.borderRadius = '50%';
  displayDataButton.style.width = '30px';
  displayDataButton.style.height = '30px';
  displayDataButton.style.fontSize = '16px';
  displayDataButton.style.cursor = 'pointer';
  displayDataButton.style.display = 'flex';
  displayDataButton.style.justifyContent = 'center';
  displayDataButton.style.alignItems = 'center';
  displayDataButton.style.padding = '0';
  displayDataButton.style.boxShadow = '0 0 10px #0f0';
  displayDataButton.title = 'Display Saved Data';

  // Add event listener to the button
  displayDataButton.addEventListener('click', () => {
    // Get saved data from local storage
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    // Alert the saved data
    alert(JSON.stringify(users, null, 2));
  });

  // Append the button to the body
  body.appendChild(displayDataButton);

  // Create a button to clear saved data
  const clearDataButton = document.createElement('button');
  clearDataButton.innerHTML = '<span style="color: #0f0;">&#10060;</span>';
  clearDataButton.style.position = 'fixed';
  clearDataButton.style.bottom = '10px';
  clearDataButton.style.left = '10px';
  clearDataButton.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
  clearDataButton.style.color = '#0f0';
  clearDataButton.style.border = '1px solid #0f0';
  clearDataButton.style.borderRadius = '50%';
  clearDataButton.style.width = '30px';
  clearDataButton.style.height = '30px';
  clearDataButton.style.fontSize = '16px';
  clearDataButton.style.cursor = 'pointer';
  clearDataButton.style.display = 'flex';
  clearDataButton.style.justifyContent = 'center';
  clearDataButton.style.alignItems = 'center';
  clearDataButton.style.padding = '0';
  clearDataButton.style.boxShadow = '0 0 10px #0f0';
  clearDataButton.title = 'Clear All User Data';

  // Add event listener to the button
  clearDataButton.addEventListener('click', () => {
    // Clear saved data from local storage
    localStorage.removeItem('users');
    alert('All user data has been cleared!');
  });

  // Append the button to the body
  body.appendChild(clearDataButton);
});
