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