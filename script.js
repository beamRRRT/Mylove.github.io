let clickCount = 0;
let loveButtonScale = 1;
let thinkButtonScale = 1;

const loveButton = document.getElementById('loveButton');
const thinkButton = document.getElementById('thinkButton');
const heartsContainer = document.getElementById('heartsContainer');

// สร้างหัวใจที่ลอยอยู่
function createFloatingHearts() {
    const heartEmojis = ['💖', '💕', '💗', '💓', '❤️', '🧡', '💛'];
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heartsContainer.appendChild(heart);
    }
}

// สร้าง effect ระเบิดหัวใจ
function createHeartExplosion() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const angle = (360 / 15) * i;
        const distance = 100 + Math.random() * 100;
        
        heart.style.animation = `explode 2s ease-out forwards`;
        heart.style.setProperty('--angle', angle + 'deg');
        heart.style.setProperty('--distance', distance + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 2000);
    }
}

// Event listener สำหรับปุ่ม "คิดก่อน"
thinkButton.addEventListener('click', function() {
    clickCount++;
    
    // เพิ่มขนาดปุ่ม "รักมาก"
    loveButtonScale += 0.15;
    loveButton.style.transform = `scale(${loveButtonScale})`;
    loveButton.style.fontSize = (1.2 * (1 + (clickCount * 0.1))) + 'em';
    loveButton.classList.add('growing');
    
    // ลดขนาดปุ่ม "คิดก่อน"
    thinkButtonScale -= 0.12;
    thinkButton.style.transform = `scale(${thinkButtonScale})`;
    thinkButton.style.fontSize = (1 * thinkButtonScale) + 'em';
    thinkButton.classList.add('shrinking');
    
    // ลบ animation class หลังจากเสร็จ
    setTimeout(() => {
        loveButton.classList.remove('growing');
        thinkButton.classList.remove('shrinking');
    }, 500);
    
    // ถ้ากดเกิน 5 ครั้ง ให้ปุ่ม "คิดก่อน" หายไป
    if (clickCount >= 5) {
        thinkButton.classList.add('fade-out');
        setTimeout(() => {
            thinkButton.style.display = 'none';
        }, 1000);
    }
});

// Event listener สำหรับปุ่ม "รักมาก"
loveButton.addEventListener('click', function() {
    // ซ่อนหน้าแรกและแสดงหน้าที่สอง
    document.querySelector('.container').style.display = 'none';
    showSecondPage();
});

function showSecondPage() {
    // สร้างหน้าที่สอง
    const secondPage = document.createElement('div');
    secondPage.className = 'second-page';
    secondPage.innerHTML = `
        <div class="celebration-container">
            <h1>🎉 เค้ารู้อยู่แล้วว่าจะคอบอันนี้🤗🤗🤗 🎉</h1>
            <div class="love-message">
                <p>เย้ แฟนรักเค้าาา 💕</p>
                <p class="subtitle">แฟนใครน่ารักจังงงเลย</p>
            </div>
            
            <div class="gif-container">
                <div class="dancing-hearts">
                    <div class="heart-gif">💖</div>
                    <div class="heart-gif">💕</div>
                    <div class="heart-gif">💗</div>
                    <div class="heart-gif">💓</div>
                    <div class="heart-gif">❤️</div>
                </div>
                
                <div class="cute-animation">
                    <div class="bouncing-emoji">🥰</div>
                    <div class="bouncing-emoji">😍</div>
                    <div class="bouncing-emoji">🤗</div>
                </div>
            </div>
            
            <div class="sparkles">
                <div class="sparkle">✨</div>
                <div class="sparkle">⭐</div>
                <div class="sparkle">🌟</div>
                <div class="sparkle">💫</div>
                <div class="sparkle">✨</div>
                <div class="sparkle">⭐</div>
            </div>
            
            <button class="play-again-btn" onclick="resetGame()">
                🔄 เล่นอีกครั้ง
            </button>
        </div>
    `;
    
    document.body.appendChild(secondPage);
    
    // สร้าง heart explosion
    createHeartExplosion();
}

function resetGame() {
    // รีเซ็ตค่าต่างๆ
    clickCount = 0;
    loveButtonScale = 1;
    thinkButtonScale = 1;
    
    // รีเซ็ตปุ่ม
    loveButton.style.transform = 'scale(1)';
    loveButton.style.fontSize = '1.2em';
    thinkButton.style.transform = 'scale(1)';
    thinkButton.style.fontSize = '1em';
    thinkButton.style.display = 'block';
    thinkButton.style.opacity = '1';
    thinkButton.classList.remove('fade-out');
    
    // ลบหน้าที่สอง
    const secondPage = document.querySelector('.second-page');
    if (secondPage) {
        document.body.removeChild(secondPage);
    }
    
    // แสดงหน้าแรก
    document.querySelector('.container').style.display = 'block';
}

// สร้างหัวใจที่ลอยอยู่เมื่อหน้าเว็บโหลด
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
});