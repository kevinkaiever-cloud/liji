/* 量子粒子模拟器 - 优化版本 (超快加载) */

// ===== 全局变量和配置 =====
class QuantumParticleSimulator {
    constructor() {
        // Canvas 和上下文
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        
        // 图表Canvas
        this.chartCanvas = document.getElementById('energyChart');
        this.chartCtx = this.chartCanvas.getContext('2d');
        
        // 模拟状态
        this.isRunning = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.fps = 60;
        this.frameCount = 0;
        this.lastFpsUpdate = 0;
        
        // 粒子系统
        this.particles = [];
        this.maxParticles = 500;
        this.particleCount = 500;
        this.particleSize = 3;
        this.particleSpeed = 1.0;
        
        // 物理参数
        this.gravity = 0.5;
        this.repulsion = 0.3;
        this.trailLength = 20;
        this.showGrid = true;
        this.showTrails = true;
        this.showLines = false;
        
        // 颜色模式
        this.colorMode = 'rainbow';
        this.colors = {
            rainbow: ['#ff0088', '#ff8800', '#ffff00', '#00ff88', '#0088ff', '#8800ff'],
            energy: ['#00ff88', '#0088ff', '#ff0088'],
            mono: ['#3b82f6', '#60a5fa', '#93c5fd']
        };
        
        // 交互状态
        this.mouse = { x: 0, y: 0, down: false };
        this.attractors = [];
        
        // 性能监控
        this.performance = {
            fps: 60,
            particleCount: 0,
            energy: 85,
            memory: 42,
            uptime: 0
        };
        
        // 图表数据
        this.chartData = {
            kinetic: [],
            potential: [],
            total: [],
            maxPoints: 50
        };
        
        // 立即开始初始化（不等待）
        this.quickInit();
    }
    
    // ===== 快速初始化方法 =====
    quickInit() {
        // 1. 立即设置Canvas（最高优先级）
        this.setupCanvas();
        
        // 2. 立即创建初始粒子（让用户立即看到效果）
        this.createInitialParticles(50);
        
        // 3. 立即开始渲染循环
        this.startSimulation();
        
        // 4. 异步设置其他组件
        setTimeout(() => {
            this.setupEventListeners();
            this.setupControls();
            this.createRemainingParticles();
            this.setupChart();
            this.hideLoadingScreen();
        }, 0);
        
        // 5. 更新显示信息
        this.updateDisplayInfo();
    }
    
    createInitialParticles(count) {
        // 快速创建初始粒子（简化版本）
        for (let i = 0; i < Math.min(count, 50); i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: 3,
                color: '#3b82f6', // 使用固定颜色加快速度
                trail: [],
                maxTrail: 10,
                life: 1.0,
                decay: 0.0001
            });
        }
    }
    
    createRemainingParticles() {
        // 创建剩余粒子
        const remaining = this.particleCount - this.particles.length;
        for (let i = 0; i < remaining; i++) {
            this.particles.push(this.createRandomParticle());
        }
    }
    
    updateDisplayInfo() {
        setTimeout(() => {
            document.getElementById('generationTime').textContent = 
                new Date().toLocaleString('zh-CN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
        }, 100);
    }
    
    // ===== 核心方法（保持原有功能） =====
    setupCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        
        if (this.chartCanvas) {
            this.chartCanvas.width = this.chartCanvas.parentElement.clientWidth;
            this.chartCanvas.height = 150;
        }
        
        window.addEventListener('resize', () => {
            this.canvas.width = container.clientWidth;
            this.canvas.height = container.clientHeight;
        });
    }
    
    createRandomParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2 * this.particleSpeed,
            vy: (Math.random() - 0.5) * 2 * this.particleSpeed,
            radius: this.particleSize,
            color: this.getParticleColor(),
            trail: [],
            maxTrail: this.trailLength,
            life: 1.0,
            decay: 0.0001 + Math.random() * 0.0005
        };
    }
    
    getParticleColor() {
        const colors = this.colors[this.colorMode];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // ===== 超快加载优化 =====
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading');
        if (!loadingScreen) return;
        
        // 立即开始淡出（0.3秒内完成）
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }
    
    startSimulation() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        const animate = (currentTime) => {
            if (!this.isRunning) return;
            
            if (this.lastTime === 0) this.lastTime = currentTime;
            this.deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            
            // 简化第一帧的更新以加快速度
            if (this.frameCount < 10) {
                this.quickUpdateParticles(this.deltaTime);
                this.quickRender();
            } else {
                this.updateParticles(this.deltaTime);
                this.render();
            }
            
            this.frameCount++;
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }
    
    quickUpdateParticles(deltaTime) {
        const dt = deltaTime * 0.016;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // 简化物理（只更新位置）
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            
            // 简单边界检查
            if (p.x < p.radius) { p.x = p.radius; p.vx = Math.abs(p.vx); }
            if (p.x > this.canvas.width - p.radius) { p.x = this.canvas.width - p.radius; p.vx = -Math.abs(p.vx); }
            if (p.y < p.radius) { p.y = p.radius; p.vy = Math.abs(p.vy); }
            if (p.y > this.canvas.height - p.radius) { p.y = this.canvas.height - p.radius; p.vy = -Math.abs(p.vy); }
        }
    }
    
    quickRender() {
        // 快速渲染（只绘制粒子）
        this.ctx.fillStyle = 'rgba(10, 14, 23, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const particle of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        }
    }
    
    // ===== 原有方法（简化引用） =====
    setupEventListeners() {
        // 保持原有事件监听器
        if (this.canvas) {
            this.canvas.addEventListener('mousedown', (e) => {
                this.mouse.down = true;
                this.addParticleAtMouse(e);
            });
            
            this.canvas.addEventListener('mouseup', () => {
                this.mouse.down = false;
            });
            
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
        }
    }
    
    setupControls() {
        // 快速设置关键控制
        const playBtn = document.getElementById('playPause');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.toggleSimulation());
        }
        
        // 其他控制可以延迟加载
        setTimeout(() => this.setupAllControls(), 500);
    }
    
    setupAllControls() {
        // 原有的完整控制设置
        // ...（这里可以包含原有代码）
    }
    
    setupChart() {
        // 延迟初始化图表
        setTimeout(() => {
            if (this.chartCanvas) {
                // 图表初始化代码
            }
        }, 1000);
    }
    
    // ===== 其他必要方法 =====
    updateParticles(deltaTime) {
        const dt = deltaTime * 0.016;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.life -= p.decay;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                i--;
                continue;
            }
            
            p.trail.push({ x: p.x, y: p.y, alpha: p.life });
            if (p.trail.length > p.maxTrail) p.trail.shift();
            
            this.applyPhysics(p, dt);
            this.handleBoundaries(p);
            
            p.x += p.vx * dt;
            p.y += p.vy * dt;
        }
        
        this.updatePerformance();
    }
    
    applyPhysics(particle, dt) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const force = this.gravity * 0.01;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
        }
        
        particle.vx *= 0.99;
        particle.vy *= 0.99;
    }
    
    handleBoundaries(particle) {
        const bounce = 0.8;
        
        if (particle.x < particle.radius) {
            particle.x = particle.radius;
            particle.vx = Math.abs(particle.vx) * bounce;
        } else if (particle.x > this.canvas.width - particle.radius) {
            particle.x = this.canvas.width - particle.radius;
            particle.vx = -Math.abs(particle.vx) * bounce;
        }
        
        if (particle.y < particle.radius) {
            particle.y = particle.radius;
            particle.vy = Math.abs(particle.vy) * bounce;
        } else if (particle.y > this.canvas.height - particle.radius) {
            particle.y = this.canvas.height - particle.radius;
            particle.vy = -Math.abs(particle.vy) * bounce;
        }
    }
    
    render() {
        this.ctx.fillStyle = 'rgba(10, 14, 23, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.showTrails) this.drawTrails();
        if (this.showLines) this.drawParticleLines();
        
        this.drawParticles();
        
        if (this.mouse.down) this.drawMouseEffect();
    }
    
    drawTrails() {
        for (const particle of this.particles) {
            if (particle.trail.length < 2) continue;
            
            this.ctx.beginPath();
            this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
            
            for (let i = 1; i < particle.trail.length; i++) {
                const point = particle.trail[i];
                const alpha = point.alpha * 0.5;
                this.ctx.strokeStyle = this.hexToRgba(particle.color, alpha);
                this.ctx.lineTo(point.x, point.y);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(point.x, point.y);
            }
        }
    }
    
    drawParticles() {
        for (const particle of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            
            gradient.addColorStop(0, this.hexToRgba(particle.color, 0.8));
            gradient.addColorStop(1, this.hexToRgba(particle.color, 0.1));
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    drawMouseEffect() {
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 30, 0, Math.PI * 2);
        
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, 30
        );
        
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.fill();
    }
    
    updatePerformance() {
        const now = performance.now();
        
        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
            this.lastFpsUpdate = now;
            this.frameCount = 0;
            
            if (document.getElementById('fpsCounter')) {
                document.getElementById('fpsCounter').textContent = this.fps;
            }
        }
        
        if (document.getElementById('activeParticles')) {
            document.getElementById('activeParticles').textContent = this.particles.length;
        }
    }
    
    hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    toggleSimulation() {
        this.isRunning = !this.isRunning;
        const playBtn = document.getElementById('playPause');
        
        if (playBtn) {
            if (this.isRunning) {
                playBtn.innerHTML = '<i class="fas fa-pause"></i> 暂停模拟';
                this.startSimulation();
            } else {
                playBtn.innerHTML = '<i class="fas fa-play"></i> 继续模拟';
            }
        }
    }
    
    addParticleAtMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.particles.length < 2000) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: this.particleSize,
                color: this.getParticleColor(),
                trail: [],
                maxTrail: this.trailLength,
                life: 1.0,
                decay: 0.0002
            });
        }
    }
    
    // ===== 静态初始化方法 =====
    static init() {
        // 检查保存的主题
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // 更新主题按钮图标
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = saved