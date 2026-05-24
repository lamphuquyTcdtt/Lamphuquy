document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. Trình giám sát FPS (Tối ưu bằng requestAnimationFrame) ---
  const fpsElement = document.getElementById("fps");
  if (fpsElement) {
    let lastTime = performance.now();
    let frames = 0;

    function monitorFPS() {
      const now = performance.now();
      frames++;
      if (now - lastTime >= 1000) {
        fpsElement.innerText = `FPS: ${frames}`;
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(monitorFPS);
    }
    requestAnimationFrame(monitorFPS);
  }

  // --- 2. Hiệu ứng Tuyết rơi 4D (Random kích thước & Tốc độ bay tự nhiên) ---
  const snowContainer = document.querySelector(".snow");
  if (snowContainer) {
    const count = 40; 
    for (let i = 0; i < count; i++) {
      const flake = document.createElement("div");
      flake.className = "snowflake";
      flake.innerHTML = "❄"; 
      
      Object.assign(flake.style, {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${(4 + Math.random() * 4).toFixed(2)}s`, 
        animationDelay: `${(Math.random() * -8).toFixed(2)}s`, 
        opacity: Math.random() * 0.7 + 0.3, 
        fontSize: `${10 + Math.random() * 12}px`,
      });
      snowContainer.appendChild(flake);
    }
  }

  // --- 3. Trình phát nhạc nền (Tách biệt hoàn toàn khỏi HTML inline) ---
  const bgMusic = document.getElementById("bgMusic");
  const songSelect = document.getElementById("songSelect");

  if (songSelect && bgMusic) {
    songSelect.addEventListener("change", (e) => {
      const url = e.target.value;
      if (url) {
        bgMusic.src = url;
        bgMusic.play()
          .then(() => console.log(`⚡ Đang phát bài: ${url}`))
          .catch(err => console.log("Trình duyệt chặn autoplay có tiếng, chờ click: ", err));
      } else {
        bgMusic.pause();
      }
    });
  }

  // --- 4. Bộ đếm thời gian (Bản nâng cấp đếm giây nhảy liên tục chuẩn thuật toán cũ) ---
  const timerElement = document.getElementById("timer");
  if (timerElement) {
    // Đạo hữu nhớ điền đúng mốc thời gian kỷ niệm thực tế vào đây nhé!
    const createdAt = new Date("2025-06-01T00:00:00"); 

    function updateTimer() {
      const now = new Date();
      const diff = Math.floor((now - createdAt) / 1000);
      
      const d = Math.floor(diff / 86400);
      const h = Math.floor((diff % 86400) / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      
      const pad = n => String(n).padStart(2, "0");
      
      // Định dạng hiển thị gọn gàng fit vừa vặn khung UI mới
      timerElement.innerText = `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000); // Chạy mỗi giây để số nhảy liên tục
  }
});