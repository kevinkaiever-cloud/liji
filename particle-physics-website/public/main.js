// 续接之前的代码...

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
        this.ctx.lineWidth = 1;
        
        const gridSize = 50;
        const offsetX = (Date.now() * 0.01) % gridSize;
        const offsetY = (Date.now() * 0.01) % gridSize;
        
        // 绘制垂直线
        for (let x = offsetX; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // 绘制水平线
        for (let y = offsetY; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
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
    
    drawParticleLines() {
        this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p1 = this.particles[i];
            
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const alpha = 1 - (distance / 100);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.2})`;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawParticles() {
        for (const particle of this.particles) {
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            // 创建发光效果
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            
            gradient.addColorStop(0, this.hexToRgba(particle.color, 0.8));
            gradient.addColorStop(1, this.hexToRgba(particle.color, 0.1));
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // 添加外发光
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    drawMouseEffect() {
        // 绘制鼠标引力区域
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
        
        // 绘制鼠标位置指示器
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.fill();
    }
    
    updateChart() {
        // 更新图表数据
        const kinetic = Math.random() * 50 + 30;
        const potential = Math.random() * 30 + 20;
        const total = kinetic + potential;
        
        this.chartData.kinetic.push(kinetic);
        this.chartData.potential.push(potential);
        this.chartData.total.push(total);
        
        if (this.chartData.kinetic.length > this.chartData.maxPoints) {
            this.chartData.kinetic.shift();
            this.chartData.potential.shift();
            this.chartData.total.shift();
        }
        
        // 绘制图表
        this.drawChart();
    }
    
    drawChart() {
        const ctx = this.chartCtx;
        const width = this.chartCanvas.width;
        const height = this.chartCanvas.height;
        
        // 清除画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制背景
        ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制网格线
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 1;
        
        // 水平网格线
        for (let i = 0; i <= 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // 绘制数据线
        this.drawChartLine(this.chartData.kinetic, '#00ff88', '动能');
        this.drawChartLine(this.chartData.potential, '#ff0088', '势能');
        this.drawChartLine(this.chartData.total, '#0088ff', '总能量');
    }
    
    drawChartLine(data, color, label) {
        const ctx = this.chartCtx;
        const width = this.chartCanvas.width;
        const height = this.chartCanvas.height;
        
        if (data.length < 2) return;
        
        const maxValue = Math.max(...data);
        const scale = height / (maxValue * 1.2);
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        
        for (let i = 0; i < data.length; i++) {
            const x = (width / (data.length - 1)) * i;
            const y = height - (data[i] * scale);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    }
    
    // ===== 工具方法 =====
    hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    updatePerformance() {
        // 更新FPS
        this.frameCount++;
        const now = performance.now();
        
        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
            this.lastFpsUpdate = now;
            this.frameCount = 0;
            
            // 更新显示
            document.getElementById('fpsCounter').textContent = this.fps;
        }
        
        // 更新粒子计数
        document.getElementById('activeParticles').textContent = this.particles.length;
        
        // 更新能量水平（模拟）
        this.performance.energy = 70 + Math.sin(now * 0.001) * 15;
        document.getElementById('energyLevel').textContent = 
            `${Math.round(this.performance.energy)}%`;
        
        // 更新运行时间
        this.performance.uptime += this.deltaTime;
        const uptime = new Date(this.performance.uptime).toISOString().substr(11, 8);
        document.getElementById('uptime').textContent = uptime;
        
        // 更新最后更新时间
        document.getElementById('lastUpdate').textContent = '刚刚';
    }
    
    // ===== 实验模式 =====
    runExperiment(experiment) {
        switch (experiment) {
            case 'vortex':
                this.createVortexField();
                break;
            case 'explosion':
                this.createParticleExplosion();
                break;
            case 'attractor':
                this.createGravityAttractor();
                break;
            case 'wave':
                this.createWaveFunction();
                break;
        }
        
        // 显示实验提示
        this.showExperimentMessage(experiment);
    }
    
    createVortexField() {
        // 创建漩涡场
        this.particles = [];
        
        for (let i = 0; i < 300; i++) {
            const angle = (i / 300) * Math.PI * 2;
            const radius = 100 + Math.random() * 200;
            
            this.particles.push({
                x: this.canvas.width / 2 + Math.cos(angle) * radius,
                y: this.canvas.height / 2 + Math.sin(angle) * radius,
                vx: -Math.sin(angle) * 2,
                vy: Math.cos(angle) * 2,
                radius: 3,
                color: this.getParticleColor(),
                trail: [],
                maxTrail: 30,
                life: 1.0,
                decay: 0.0001
            });
        }
    }
    
    createParticleExplosion() {
        // 创建粒子爆炸效果
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 5 + Math.random() * 10;
            
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 2 + Math.random() * 4,
                color: this.colors.energy[Math.floor(Math.random() * 3)],
                trail: [],
                maxTrail: 20,
                life: 1.0,
                decay: 0.002
            });
        }
    }
    
    createGravityAttractor() {
        // 创建引力中心
        this.attractors = [{
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            strength: 0.5
        }];
        
        // 添加环绕粒子
        this.createParticles();
    }
    
    createWaveFunction() {
        // 创建波函数效果
        this.particles = [];
        
        for (let x = 0; x < this.canvas.width; x += 20) {
            for (let y = 0; y < this.canvas.height; y += 20) {
                this.particles.push({
                    x: x,
                    y: y,
                    vx: 0,
                    vy: Math.sin(x * 0.05) * 2,
                    radius: 2,
                    color: '#3b82f6',
                    trail: [],
                    maxTrail: 10,
                    life: 1.0,
                    decay: 0.00005
                });
            }
        }
    }
    
    showExperimentMessage(experiment) {
        const messages = {
            vortex: '🌀 漩涡场已激活 - 粒子围绕中心旋转',
            explosion: '💥 粒子爆炸已触发 - 观察能量扩散',
            attractor: '⭐ 引力中心已创建 - 粒子被吸引',
            wave: '🌊 波函数已生成 - 观察波动传播'
        };
        
        // 创建临时消息
        const message = document.createElement('div');
        message.className = 'experiment-message';
        message.textContent = messages[experiment];
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(30, 41, 59, 0.9);
            color: #60a5fa;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            z-index: 1000;
            animation: fadeOut 2s ease 1s forwards;
        `;
        
        document.body.appendChild(message);
        
        // 2秒后移除
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }
    
    // ===== 控制方法 =====
    toggleSimulation() {
        this.isRunning = !this.isRunning;
        const playBtn = document.getElementById('playPause');
        const icon = playBtn.querySelector('i');
        
        if (this.isRunning) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i> 暂停模拟';
            this.startSimulation();
        } else {
            playBtn.innerHTML = '<i class="fas fa-play"></i> 继续模拟';
        }
    }
    
    startSimulation() {
        if (!this.isRunning) {
            this.isRunning = true;
        }
        
        const animate = (currentTime) => {
            if (!this.isRunning) return;
            
            // 计算时间差
            if (this.lastTime === 0) this.lastTime = currentTime;
            this.deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            
            // 更新和渲染
            this.updateParticles(this.deltaTime);
            this.render();
            
            // 继续动画循环
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }
    
    resetSimulation() {
        this.particles = [];
        this.createParticles();
        this.isRunning = true;
        
        const playBtn = document.getElementById('playPause');
        playBtn.innerHTML = '<i class="fas fa-pause"></i> 暂停模拟';
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        // 保存主题偏好
        localStorage.setItem('theme', newTheme);
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`全屏错误: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading');
        
        // 立即开始模拟，同时显示加载动画
        this.startSimulation();
        
        // 快速隐藏加载屏幕（0.5秒内）
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 500); // 只显示0.5秒加载动画
    }
    
    // ===== 初始化入口 =====
    static init() {
        // 检查保存的主题
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // 更新主题按钮图标
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        // 创建模拟器实例
        window.simulator = new QuantumParticleSimulator();
    }
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    QuantumParticleSimulator.init();
});

// ===== 全局辅助函数 =====
window.addEventListener('load', () => {
    // 添加CSS动画定义
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; transform: translate(-50%, -50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    // 初始化音频提示
    const audioPrompt = document.getElementById('audioPrompt');
    const enableAudioBtn = document.getElementById('enableAudio');
    
    if (enableAudioBtn) {
        enableAudioBtn.addEventListener('click', () => {
            audioPrompt.style.display = 'none';
            // 这里可以添加音频上下文初始化
        });
        
        // 3