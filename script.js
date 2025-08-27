/* ========= Personalização do nome ========= */
const nameTargets = document.querySelectorAll('[data-name]');
const nameInput = document.querySelector('#yourName');
const nameForm  = document.querySelector('#nameForm');

function setName(name){
  const nice = (name || '').trim();
  const value = nice.length ? nice : 'meu amor';
  nameTargets.forEach(el => el.textContent = value);
  if(nice.length) localStorage.setItem('loveName', nice);
}
const saved = localStorage.getItem('loveName');
if(saved){ setName(saved); if(nameInput) nameInput.value = saved; }

nameForm?.addEventListener('submit', e=>{
  e.preventDefault();
  setName(nameInput.value);
});

/* ========= Tema claro/escuro ========= */
const themeToggle = document.querySelector('#themeToggle');
const root = document.documentElement;
if(localStorage.getItem('theme') === 'dark'){
  root.classList.add('dark');
}
themeToggle?.addEventListener('click', ()=>{
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  themeToggle.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
});
themeToggle.textContent = root.classList.contains('dark') ? '☀️' : '🌙';

/* ========= Corações no fundo (canvas) ========= */
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
let w, h, hearts;

function resize(){
  w = canvas.width  = innerWidth;
  h = canvas.height = innerHeight;
}
addEventListener('resize', resize);
resize();

function random(min,max){ return Math.random()*(max-min)+min; }

function createHearts(){
  hearts = Array.from({length: 60}, () => ({
    x: random(0,w),
    y: random(h*0.4, h),
    r: random(6,16),
    spd: random(0.3, 1.1),
    rot: random(0, Math.PI*2),
    rotSpd: random(-0.01, 0.01),
    col: `hsla(${random(330,360)}, 80%, ${random(65,80)}%, .65)`
  }));
}
createHearts();

function drawHeart(x, y, size, rot, color){
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(size/10, size/10);
  ctx.fillStyle = color;
  ctx.beginPath();
  // coração em bezier
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0,-3, -5,-3, -5, 1);
  ctx.bezierCurveTo(-5, 6, 0, 8, 0, 12);
  ctx.bezierCurveTo(0, 8, 5, 6, 5, 1);
  ctx.bezierCurveTo(5,-3, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function animateHearts(){
  ctx.clearRect(0,0,w,h);
  for(const p of hearts){
    p.y -= p.spd;
    p.rot += p.rotSpd;
    if(p.y < -20){
      p.y = h + 10;
      p.x = random(0, w);
    }
    drawHeart(p.x, p.y, p.r, p.rot, p.col);
  }
  requestAnimationFrame(animateHearts);
}
animateHearts();

/* ========= Motivos: revelar com transições ========= */
const showReasonsBtn = document.getElementById('showReasons');
const reasonsItems = [...document.querySelectorAll('.reasons li')];
showReasonsBtn?.addEventListener('click', ()=>{
  reasonsItems.forEach((el, i)=>{
    setTimeout(()=> el.classList.add('show'), i*130);
  });
});

/* ========= Cartinha com máquina de escrever ========= */
const letterText   = document.getElementById('letterText');
const startLetter  = document.getElementById('startLetter');
const skipLetter   = document.getElementById('skipLetter');

const letter = () => `
Oi, ${ (localStorage.getItem('loveName') || 'meu amor') }! 💖

Escrevi estas linhas para te lembrar de algo simples e imenso:
você é a melhor parte de todos os meus dias.

Gosto do seu abraço que cabe perfeitamente no meu,
do seu riso que desmonta qualquer preocupação,
e desse brilho no olhar que me faz querer morar nele pra sempre.

Obrigada por existir e por caminhar comigo.
Eu te amo — hoje, amanhã e sempre. 💘
`;

let typerTimer;
function typeLetter(full){
  clearInterval(typerTimer);
  const text = letter();
  if(full){
    letterText.textContent = text.trim();
    return;
  }
  letterText.textContent = '';
  let i = 0;
  const speed = 22; // ms por caractere
  typerTimer = setInterval(()=>{
    letterText.textContent += text[i++];
    if(i >= text.length) clearInterval(typerTimer);
  }, speed);
}
startLetter?.addEventListener('click', ()=> typeLetter(false));
skipLetter?.addEventListener('click',  ()=> typeLetter(true));
// inicia com um tiquinho digitado
setTimeout(()=> typeLetter(false), 400);

/* ========= Medidor de amor ========= */
const loveMeter   = document.getElementById('loveMeter');
const lovePercent = document.getElementById('lovePercent');
const meterMsg    = document.getElementById('meterMsg');

loveMeter?.addEventListener('input', ()=>{
  const v = +loveMeter.value;
  lovePercent.textContent = v;

  if(v < 33) meterMsg.textContent = 'Impossível! Você é muito mais amada do que isso! 💞';
  else if(v < 66) meterMsg.textContent = 'Muito! (mas na verdade é 100% todos os dias) 🌟';
  else if(v < 90) meterMsg.textContent = 'Demais! Você é meu universo inteirinho 💫';
  else meterMsg.textContent = 'Transbordando de amor! Sempre 100% + infinito ♾️';
});

/* ========= Efeitos ao rolar (reveal) ========= */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{threshold:.2});
reveals.forEach(el => io.observe(el));

/* ========= Surpresa + confete de corações ========= */
const surpriseBtn   = document.getElementById('surpriseBtn');
const surpriseModal = document.getElementById('surpriseModal');
const closeModalBtn = surpriseModal?.querySelector('.close');
const confettiBtn   = document.getElementById('confettiHearts');

function heartConfetti(count=60){
  for(let i=0;i<count;i++){
    const d = document.createElement('div');
    d.className = 'flying-heart';
    d.textContent = '💗';
    d.style.left = (Math.random()*100)+'vw';
    d.style.animationDuration = (1.8 + Math.random()*1.4)+'s';
    d.style.fontSize = (18 + Math.random()*18)+'px';
    document.body.appendChild(d);
    setTimeout(()=> d.remove(), 3000);
  }
}

surpriseBtn?.addEventListener('click', ()=>{
  surpriseModal?.showModal();
  heartConfetti(40);
});
closeModalBtn?.addEventListener('click', ()=> surpriseModal.close());
confettiBtn?.addEventListener('click', ()=> heartConfetti(60));

/* ========= CSS dinâmico para confetes ========= */
const style = document.createElement('style');
style.textContent = `
.flying-heart{
  position: fixed;
  top: 50vh;
  transform: translateY(-50%);
  animation: pop-up linear forwards;
  z-index: 30;
  pointer-events:none;
  filter: drop-shadow(0 6px 12px rgba(255,96,160,.35));
}
@keyframes pop-up{
  0%{ transform: translateY(0) scale(.7) rotate(0deg); opacity: 0 }
  10%{ opacity: 1 }
  100%{ transform: translateY(-80vh) scale(1.2) rotate(360deg); opacity: 0 }
}
`;
document.head.appendChild(style);
