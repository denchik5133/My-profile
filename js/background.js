document.addEventListener('DOMContentLoaded', function() {
    // Initialize background effect based on configuration
    initBackgroundEffects();
});

// Initialize background effects based on configuration
function initBackgroundEffects() {
    // Apply background type from config
    if (config.background) {
        const bgType = config.background.type;
        
        if (bgType === 'particles') {
            initParticlesEffect();
        }
        
        // Check and enable effects
        if (config.background.effects) {
            if (config.background.effects.snow) {
                initSnowEffect();
            }
            if (config.background.effects.rain) {
                initRainEffect();
            }
        }
    }
}

// Initialize particles effect
function initParticlesEffect() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particles-container');
    
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to fill window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Get particle options from config
    const options = {
        particleCount: config.background.options.particles.number.value || 80,
        particleColor: config.background.options.particles.color.value || "#0078D7",
        minSize: 2,
        maxSize: 6,
        speed: config.background.options.particles.move.speed || 2,
        connectParticles: config.background.options.particles.line_linked.enable,
        lineColor: config.background.options.particles.line_linked.color || "#FF6B00",
        lineWidth: config.background.options.particles.line_linked.width || 1
    };
    
    // Create particles array
    const particles = [];
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * options.speed;
            this.vy = (Math.random() - 0.5) * options.speed;
            this.size = Math.random() * (options.maxSize - options.minSize) + options.minSize;
            this.color = options.particleColor;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) {
                this.vx = -this.vx;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy = -this.vy;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
    
    // Create particles
    function createParticles() {
        for (let i = 0; i < options.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw lines between particles
    function drawLines() {
        const maxDist = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = options.lineColor;
                    ctx.lineWidth = options.lineWidth;
                    ctx.globalAlpha = 1 - (dist / maxDist);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections if enabled
        if (options.connectParticles) {
            drawLines();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize
    createParticles();
    animate();
}

// Initialize snow effect
function initSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;
    
    // Clear any existing snowflakes
    snowContainer.innerHTML = '';
    
    const snowflakeCount = 50;
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowContainer);
    }
}

// Create snowflake element
function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    const size = Math.random() * 5 + 2;
    const startPositionX = Math.random() * 100;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;
    
    snowflake.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background-color: white;
        border-radius: 50%;
        opacity: ${Math.random() * 0.7 + 0.3};
        top: -10px;
        left: ${startPositionX}%;
        position: absolute;
        animation: snowfall ${duration}s linear infinite ${delay}s;
    `;
    
    container.appendChild(snowflake);
}

// Initialize rain effect
function initRainEffect() {
    // Rain effect implementation would go here
}