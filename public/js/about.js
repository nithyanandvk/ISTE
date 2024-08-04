var i = 0;
function showBenefits() {
  if (!i) {
    document.querySelector(".benefits").style.display = "inline";
    document.querySelector(".view").textContent = "HIDE BENEFITS";
    i = 1;
  } else {
    document.querySelector(".benefits").style.display = "none";
    document.querySelector(".view").textContent = "VIEW BENEFITS";
    i = 0;
  }
}
function showInfo(team) {
  const Currentteam=document.getElementById(team);
  const button = Currentteam.nextElementSibling;
  if (Currentteam.style.display === "flex") {
      Currentteam.style.display = "none";
      button.textContent = "INFO";
  } else {
    Currentteam.style.display = "flex";
    button.textContent = "HIDE";
  }
}

// animation

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = window.innerWidth/18;

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2+ 2.5,
        alpha: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 3+ 1.8,        
    };
}

for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#1f3a93';

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.y -= star.speed;  // Move stars up
        if (star.y < 0) {
            star.y = canvas.height;  // Reset star to the bottom if it moves off the top
        }
    });

    drawStars();
    requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


