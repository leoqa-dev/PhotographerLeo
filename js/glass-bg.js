// Lightweight animated backdrop for liquid-glass pages.
(function () {
    const canvas = document.getElementById('glass-bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function ribbon(cx, cy, radius, colorA, colorB) {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, colorA);
        gradient.addColorStop(0.45, colorB);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    function draw(time) {
        const t = time * 0.00018;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#030303';
        ctx.fillRect(0, 0, width, height);

        const sweep = ctx.createLinearGradient(0, 0, width, height);
        sweep.addColorStop(0, 'rgba(255,255,255,0.02)');
        sweep.addColorStop(0.36, 'rgba(184,155,94,0.16)');
        sweep.addColorStop(0.5, 'rgba(255,255,255,0.26)');
        sweep.addColorStop(0.64, 'rgba(255,255,255,0.05)');
        sweep.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = sweep;
        ctx.save();
        ctx.translate(Math.sin(t * 1.9) * width * 0.08, Math.cos(t * 1.3) * height * 0.05);
        ctx.fillRect(-width * 0.1, -height * 0.1, width * 1.2, height * 1.2);
        ctx.restore();

        ctx.globalCompositeOperation = 'screen';
        ribbon(width * (0.18 + Math.sin(t * 2.2) * 0.04), height * 0.22, width * 0.42, 'rgba(255,255,255,0.18)', 'rgba(184,155,94,0.08)');
        ribbon(width * (0.82 + Math.cos(t * 1.7) * 0.04), height * 0.18, width * 0.36, 'rgba(255,255,255,0.16)', 'rgba(255,255,255,0.05)');
        ribbon(width * (0.55 + Math.sin(t * 1.1) * 0.07), height * (0.78 + Math.cos(t * 1.5) * 0.04), width * 0.52, 'rgba(184,155,94,0.2)', 'rgba(255,255,255,0.04)');
        ctx.globalCompositeOperation = 'source-over';

        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 7; i += 1) {
            const y = height * (0.18 + i * 0.11) + Math.sin(t * 4 + i) * 26;
            ctx.beginPath();
            ctx.moveTo(-40, y);
            for (let x = -40; x <= width + 40; x += 90) {
                ctx.lineTo(x, y + Math.sin(x * 0.008 + t * 9 + i) * 18);
            }
            ctx.stroke();
        }

        frame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
        draw(0);
    } else {
        frame = requestAnimationFrame(draw);
    }

    window.addEventListener('beforeunload', () => cancelAnimationFrame(frame));
}());
