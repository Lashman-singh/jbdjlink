   // ========== MOBILE MENU TOGGLE ==========
        document.getElementById('mobile-menu').addEventListener('click', function() {
            const nav = document.getElementById('main-nav');
            nav.classList.toggle('active');
        });

        // ========== SMOOTH SCROLLING ==========
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const nav = document.getElementById('main-nav');
                    nav.classList.remove('active');
                }
            });
        });

      document.getElementById('booking-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const messageDiv = document.getElementById('form-message');
  const formData = new FormData(form);

  // Show loading
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  messageDiv.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      messageDiv.textContent = 'Your booking request has been sent!';
      messageDiv.style.color = 'green';
      form.reset();
    } else {
      messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
      messageDiv.style.color = 'red';
    }
  } catch (error) {
    messageDiv.textContent = 'Network error. Please try again.';
    messageDiv.style.color = 'red';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Booking Request';
  }
});
        // ========== GALLERY FUNCTIONALITY ==========
        const mediaItems = document.querySelectorAll('.media-item');
        const modal = document.querySelector('.media-modal');
        const closeModal = document.querySelector('.close-modal');
        const modalContent = document.querySelector('.modal-media-container');
        
        // Handle image/video clicks
        mediaItems.forEach(item => {
            const expandBtn = item.querySelector('.expand-btn');
            const isVideo = item.classList.contains('video-item');
            
            // Click on item or expand button
            item.addEventListener('click', function(e) {
                if (e.target.closest('.play-btn')) return; // Don't open modal if clicking play button
                
                if (isVideo) {
                    const video = item.querySelector('video');
                    openModal(video.cloneNode(true));
                } else {
                    const img = item.querySelector('img');
                    openModal(img.cloneNode());
                }
            });
        });
        
        // Play button for videos
        const playButtons = document.querySelectorAll('.play-btn');
        playButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const videoItem = this.closest('.video-item');
                const video = videoItem.querySelector('video');
                const icon = this.querySelector('i');
                
                if (video.paused) {
                    video.play();
                    video.muted = false; // Unmute when user explicitly plays
                    icon.classList.replace('fa-play', 'fa-pause');
                } else {
                    video.pause();
                    icon.classList.replace('fa-pause', 'fa-play');
                }
            });
        });
        
        // Open modal with media
        function openModal(mediaElement) {
            modalContent.innerHTML = '';
            modalContent.appendChild(mediaElement);
            modal.style.display = 'flex';
            
            // If it's a video, add controls and play it
            if (mediaElement.tagName === 'VIDEO') {
                mediaElement.controls = true;
                mediaElement.muted = false;
                mediaElement.play();
            } 
        }
        
        // Close modal
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            
            // Pause any playing videos in modal
            const videos = modalContent.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
            });
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                
                // Pause any playing videos in modal
                const videos = modalContent.querySelectorAll('video');
                videos.forEach(video => {
                    video.pause();
                });
            }
        });
        
        // Update play/pause buttons when videos end
        document.querySelectorAll('.video-item video').forEach(video => {
            video.addEventListener('ended', function() {
                const btn = this.closest('.video-item').querySelector('.play-btn i');
                btn.classList.replace('fa-pause', 'fa-play');
            });
        });

        // ========== TESTIMONIAL SLIDER ==========
        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.vertical-slider');
            
            // Optional: Auto-scroll functionality
            function autoScroll() {
                const scrollHeight = slider.scrollHeight;
                const scrollTop = slider.scrollTop;
                const clientHeight = slider.clientHeight;
                
                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    // At bottom, scroll to top
                    setTimeout(() => {
                        slider.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }, 2000);
                } else {
                    // Scroll down
                    setTimeout(() => {
                        slider.scrollBy({
                            top: clientHeight,
                            behavior: 'smooth'
                        });
                    }, 5000);
                }
            }
            
            // Enable auto-scroll (remove if not needed)
            let scrollInterval = setInterval(autoScroll, 7000);
            
            // Pause auto-scroll on interaction
            slider.addEventListener('mouseenter', () => clearInterval(scrollInterval));
            slider.addEventListener('mouseleave', () => {
                clearInterval(scrollInterval);
                scrollInterval = setInterval(autoScroll, 7000);
            });
            slider.addEventListener('touchstart', () => clearInterval(scrollInterval));
        });

        // Add this to main.js (at the end)

// ========== CREATE NOTIFICATION SYSTEM ==========
const notificationContainer = document.createElement('div');
notificationContainer.id = 'notification-container';
document.body.appendChild(notificationContainer);

// CSS for notifications (add to styles.css)
const notificationCSS = `
#notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 350px;
}

.notification {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 18px 25px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 15px;
  transform: translateX(120%);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background: #ffcc00;
}

.notification.active {
  transform: translateX(0);
  opacity: 1;
}

.notification i {
  font-size: 24px;
  flex-shrink: 0;
}

.notification-content {
  flex-grow: 1;
}

.notification h4 {
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 600;
}

.notification p {
  margin: 0;
  font-size: 15px;
  opacity: 0.9;
}

.notification-close {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.notification-close:hover {
  background: rgba(255,255,255,0.3);
  transform: rotate(90deg);
}
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

// Function to show notification
function showNotification(title, message, icon = 'fas fa-check-circle') {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="${icon}"></i>
    <div class="notification-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;
  
  notificationContainer.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('active');
  }, 10);
  
  // Auto-remove after 5 seconds
  const removeTimer = setTimeout(() => {
    notification.remove();
  }, 5000);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(removeTimer);
    notification.remove();
  });
}

// ========== MODIFIED AUTO-FILL FUNCTION ==========
document.addEventListener('click', function(e) {
  const clickedBtn = e.target.closest('a.btn, .addon-button');
  if (!clickedBtn) return;
  
  let itemType = '';
  let itemName = '';
  let itemPrice = '';
  let icon = '';
  
  // Service Cards
  if (clickedBtn.closest('.service-card')) {
    const serviceCard = clickedBtn.closest('.service-card');
    itemName = serviceCard.querySelector('h3').textContent;
    itemPrice = serviceCard.querySelector('.service-price').textContent;
    itemType = 'Service';
    icon = 'fas fa-music';
  }
  
  // Package Cards
  else if (clickedBtn.closest('.package-card')) {
    const packageCard = clickedBtn.closest('.package-card');
    itemName = packageCard.querySelector('h3').textContent;
    itemPrice = packageCard.querySelector('.package-price').textContent;
    itemType = 'Package';
    icon = 'fas fa-box-open';
  }
  
  // Addon Cards
  else if (clickedBtn.closest('.addon-card')) {
    const addonCard = clickedBtn.closest('.addon-card');
    itemName = addonCard.querySelector('.addon-name').textContent;
    itemPrice = addonCard.querySelector('.addon-price').textContent;
    itemType = 'Add-on';
    icon = 'fas fa-plus-circle';
  }
  
  if (itemName) {
    const textarea = document.getElementById('message');
    const currentValue = textarea.value.trim();
    const separator = currentValue ? '\n\n' : '';
    
    // Create formatted entry
    const entry = `${itemType}: ${itemName} ${itemPrice}`;
    
    // Add to textarea
    textarea.value = `${currentValue}${separator}${entry}`;
    
    // Show beautiful notification
    showNotification(
      `${itemType} Added!`,
      `${itemName} has been added to your booking details`,
      icon
    );
  }
});