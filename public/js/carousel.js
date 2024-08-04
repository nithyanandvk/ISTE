document.addEventListener('DOMContentLoaded', () => {
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');
    const container = document.querySelector('.container');
    const videos = document.querySelectorAll('.yt-video');
    let index = 0;
  
    const modifyCarousel = () => {
      const offset = -index * 100;
      container.style.transform = `translateX(${offset}%)`;
    };
  
    left.addEventListener('click', () => {
      index = (index > 0) ? index - 1 : videos.length - 1;
      modifyCarousel();
    });
  
    right.addEventListener('click', () => {
      index = (index < videos.length - 1) ? index + 1 : 0; 
      modifyCarousel();
    });
  });
  

