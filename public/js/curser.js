document.addEventListener('DOMContentLoaded', () => {
  const coords = { x: 0, y: 0 };
  const cursors = document.querySelectorAll('.curser');

  // Initialize cursor positions
  cursors.forEach((curser) => {
      curser.x = 0;
      curser.y = 0;
  });

  function animate() {
      let x = coords.x;
      let y = coords.y;

      cursors.forEach((curser, index) => {
          curser.style.transform = `scale(${(cursors.length - index) / cursors.length})`;

          // Update position with smooth transition
          curser.x += (x - curser.x) * 0.5;  // Adjust speed factor here
          curser.y += (y - curser.y) * 0.5;  // Adjust speed factor here

          // Center the cursor circle
          curser.style.left = `${curser.x - 12}px`;
          curser.style.top = `${curser.y -12}px`;
          

          x = curser.x;
          y = curser.y;
      });

      requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
      coords.x = e.clientX; // Using clientX for accurate positioning relative to viewport
      coords.y = e.clientY; // Using clientY for accurate positioning relative to viewport
  });

  // Start the animation loop
  animate();
});