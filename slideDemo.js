
    // JavaScript for the carousel
    const images = document.querySelectorAll('.slideshow img');
    const prevButton = document.querySelector('.control-btn.prev');
    const nextButton = document.querySelector('.control-btn.next');
    let currentIndex = 0;

    // Function to update the active slide
    function updateSlide(index) {
      images.forEach((img, i) => {
        if (i === index) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    }

    // Show the next slide
    function showNextSlide() {
      currentIndex = (currentIndex + 1) % images.length; // Loop around
      updateSlide(currentIndex);
    }

    // Show the previous slide
    function showPrevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop around
      updateSlide(currentIndex);
    }

    // Add event listeners for controls
    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPrevSlide);

    // Auto-slide functionality (optional)
    setInterval(showNextSlide, 5000); // Change slide every 5 seconds
  










    document.addEventListener('DOMContentLoaded', function() {
    const showMoreButtons = document.querySelectorAll('.show-more-btn');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.parentElement;
            const shortText = eventCard.querySelector('.short-text');
            const fullText = eventCard.querySelector('.full-text');

            if (fullText.style.display === 'none' || fullText.style.display === '') {
                fullText.style.display = 'block';
                shortText.style.display = 'none';
                this.textContent = 'Show Less';
            } else {
                fullText.style.display = 'none';
                shortText.style.display = 'block';
                this.textContent = 'Show More';
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const showMoreButtons = document.querySelectorAll('.show-more-btn1');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.parentElement;
            const shortText = eventCard.querySelector('.short-text1');
            const fullText = eventCard.querySelector('.full-text1');

            if (fullText.style.display === 'none' || fullText.style.display === '') {
                fullText.style.display = 'block';
                shortText.style.display = 'none';
                this.textContent = 'Show Less';
            } else {
                fullText.style.display = 'none';
                shortText.style.display = 'block';
                this.textContent = 'Show More';
            }
        });
    });
});