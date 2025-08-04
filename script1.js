const images = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(img.src);
  });
});

function openLightbox(src) {
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  lightboxImg.src = images[currentIndex].src;
}

function filterImages(category) {
  images.forEach(img => {
    if (category === 'all' || img.classList.contains(category)) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });
}
document.getElementById('imageUpload').addEventListener('change', function (event) {
  const files = event.target.files;

  for (let file of files) {
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'gallery-item custom';
      img.alt = 'Uploaded Image';
      img.style.display = 'block';
      document.querySelector('.gallery').appendChild(img);
      img.addEventListener('click', () => {
        currentIndex = document.querySelectorAll('.gallery-item').length - 1;
        openLightbox(img.src);
      });
    };

    reader.readAsDataURL(file);
  }
  event.target.value = '';
});

