const ccursor = document.querySelector('.custom-cursor');
const interactiveElements = document.querySelectorAll('a, span');

function updateCursor(e) {
  // Get the cursor's dimensions
  const cursorWidth = ccursor.offsetWidth / 2;
  const cursorHeight = ccursor.offsetHeight / 2;

  // Update cursor position with an offset to align the center
  requestAnimationFrame(() => {
    ccursor.style.transform = `translate(${e.clientX - cursorWidth}px, ${e.clientY - cursorHeight}px)`;
  });

  // Check if hovering over any interactive element
  const isHovering = Array.from(interactiveElements).some(el => el.matches(':hover'));

  // Only change cursor opacity if on desktop
  if (isDesktop()) {
    ccursor.style.opacity = isHovering ? '0' : '1';
  }
}

// Function to check if the device is a desktop
function isDesktop() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|android|ipad|mobile/.test(userAgent);
  return !isMobile; // Return true if it's a desktop
}

// Handle mousemove events only if on desktop
document.addEventListener('mousemove', (e) => {
  if (isDesktop()) {
    ccursor.style.display = 'block'; // Ensure custom cursor is visible on desktop
    updateCursor(e);
  } else {
    ccursor.style.display = 'none'; // Hide custom cursor on mobile
  }
});

// Handle page load and window resize events
window.addEventListener('DOMContentLoaded', () => {
  const projectBtn = document.getElementById('project-btn');
  const popup = document.getElementById('popup');
  const closeBtn = document.querySelector('.close-btn');

  projectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.style.display = 'flex';
  });

  // Hide the popup when the close button is clicked
  closeBtn.addEventListener('click', () => {
    popup.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => {
      popup.style.display = 'none';
      popup.style.animation = 'fadeIn 0.5s ease'; // Reset to fadeIn for next open
    }, 500);
  });

  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = 'fadeIn 0.5s ease'; // Reset to fadeIn for next open
      }, 500);
    }
  });
});

window.onload = () => {
  // Ensure cursor is hidden on mobile devices
  if (!isDesktop()) {
    ccursor.style.display = 'none';
    document.getElementById("myText").classList.add("centered-text")
  } else {
    document.getElementById("myText").classList.add("centered-text2")
  }
};

// Optionally call it on window resize to detect real-time changes
window.onresize = () => {
  if (!isDesktop()) {
    ccursor.style.display = 'none'; // Hide the cursor on mobile devices after resizing
    document.getElementById("myText").classList.add("centered-text")
  } else {
    cursor.style.display = 'block'; // Show the ccursor on desktop devices after resizing
    document.getElementById("myText").classList.add("centered-text2")
  }
};
