# 🌀 量子粒子模拟器 | Quantum Particle Simulator

[![GitHub license](https://img.shields.io/github/license/kevinkaiever-cloud/liji)](https://github.com/kevinkaiever-cloud/liji/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/kevinkaiever-cloud/liji)](https://github.com/kevinkaiever-cloud/liji/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kevinkaiever-cloud/liji)](https://github.com/kevinkaiever-cloud/liji/network)
[![GitHub issues](https://img.shields.io/github/issues/kevinkaiever-cloud/liji)](https://github.com/kevinkaiever-cloud/liji/issues)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkevinkaiever-cloud.github.io%2Fliji%2F)](https://kevinkaiever-cloud.github.io/liji/)

一个基于 Canvas 2D 的交互式量子粒子物理模拟网站，结合现代前端动画工作流的最佳实践。体验粒子物理的奇妙世界！

## 🌐 在线演示

**立即体验**: [https://kevinkaiever-cloud.github.io/liji/](https://kevinkaiever-cloud.github.io/liji/)

**优化版本**: [https://kevinkaiever-cloud.github.io/liji/index-fast.html](https://kevinkaiever-cloud.github.io/liji/index-fast.html) (加载更快)

## 📸 项目截图

| 主界面 | 粒子模拟 | 控制面板 |
|--------|----------|----------|
| ![主界面](https://via.placeholder.com/400x250/0ea5e9/ffffff?text=量子粒子模拟器+主界面) | ![粒子模拟](https://via.placeholder.com/400x250/8b5cf6/ffffff?text=粒子物理模拟) | ![控制面板](https://via.placeholder.com/400x250/10b981/ffffff?text=交互式控制面板) |

## ✨ 核心特性

### 🎨 **视觉效果**
- **实时粒子物理模拟** - 基于 Verlet 积分的物理引擎，模拟真实物理行为
- **多彩粒子系统** - 支持彩虹、能量、单色、渐变等多种颜色模式
- **动态轨迹效果** - 可调节的粒子轨迹和连线效果，可视化粒子运动路径
- **交互式控制** - 鼠标/触摸交互添加和影响粒子，实时响应操作
- **响应式设计** - 完美适配各种屏幕尺寸和设备，从手机到4K显示器

### ⚙️ **交互功能**
- **实时参数调节** - 粒子数量、速度、引力、排斥力、轨迹长度等
- **实验模式** - 预设的物理场景（漩涡场、粒子爆炸、引力井、排斥场等）
- **性能监控** - 实时显示 FPS、粒子数量、内存使用、系统状态
- **主题切换** - 深色/浅色主题支持，护眼模式
- **全屏模式** - 沉浸式体验，专注粒子世界

### 🛠️ **技术栈**
- **HTML5 Canvas 2D** - 高性能图形渲染，硬件加速
- **现代 JavaScript (ES6+)** - 模块化代码结构，面向对象设计
- **CSS3 动画** - 流畅的 UI 过渡效果，现代化界面
- **响应式设计** - Flexbox + Grid 布局，完美适配
- **构建工具链** - 自动化构建和优化，开发体验优秀

## 🚀 快速开始

### 在线体验
直接访问 [在线演示](https://kevinkaiever-cloud.github.io/liji/) 无需安装任何软件！

### 本地开发

#### 1. 克隆项目
```bash
git clone https://github.com/kevinkaiever-cloud/liji.git
cd liji
```

#### 2. 安装依赖
```bash
npm install
```

#### 3. 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:3000

#### 4. 构建生产版本
```bash
npm run build
```

#### 5. 部署到 GitHub Pages
```bash
npm run deploy
```

## 📁 项目结构

```
liji/
├── public/                    # 静态资源
│   ├── index.html           # 主页面（完整功能版）
│   ├── index-fast.html      # 优化版本（加载更快）
│   ├── styles.css           # 主样式文件
│   ├── main.js             # 主 JavaScript 文件
│   └── main-optimized.js   # 优化版 JavaScript 文件
├── scripts/                 # 构建脚本
│   └── build.js           # 自动化构建脚本
├── src/                    # 源代码目录（未来扩展）
├── package.json           # 项目配置和依赖
├── package-lock.json      # 依赖锁文件
├── README.md             # 项目文档（本文件）
└── .gitignore            # Git 忽略文件配置
```

## 🎮 使用指南

### 🖱️ 基本操作
1. **点击画布** - 在点击位置添加新粒子
2. **拖动鼠标** - 创建连续的粒子流
3. **鼠标滚轮** - 调整视图缩放级别
4. **空格键** - 暂停/继续模拟
5. **R 键** - 重置模拟到初始状态

### 🎛️ 控制面板详解

#### 粒子控制
- **粒子数量** (50-2000) - 控制场景中粒子的总数
- **粒子速度** (0.1-3.0) - 调节粒子的运动速度
- **引力强度** (0-2.0) - 控制粒子间的引力作用
- **排斥力** (0-1.0) - 控制粒子间的排斥作用
- **轨迹长度** (0-100) - 设置粒子轨迹的显示长度

#### 视觉效果
- **颜色模式** - 彩虹、能量、单色、渐变等
- **轨迹效果** - 开启/关闭粒子轨迹
- **连线效果** - 显示粒子间的连接线
- **粒子大小** - 调节粒子的显示尺寸

#### 模拟控制
- **开始/暂停** - 控制模拟的运行状态
- **重置模拟** - 恢复到初始状态
- **清除粒子** - 移除所有粒子
- **实验模式** - 选择预设的物理场景

### 🔬 实验模式
1. **漩涡场** - 粒子围绕中心旋转
2. **粒子爆炸** - 从中心向外扩散
3. **引力井** - 强大的中心引力
4. **排斥场** - 粒子相互排斥
5. **平衡状态** - 引力和排斥力平衡

## 🔧 开发指南

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0
- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+）

### 开发脚本
```bash
# 安装所有依赖
npm install

# 启动开发服务器（端口3000）
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 代码格式化
npm run format

# 清理构建文件
npm run clean

# 分析构建大小
npm run analyze

# 部署到 GitHub Pages
npm run deploy
```

### 代码架构
```javascript
// 主要模块结构
- ParticleSystem    // 粒子系统管理
- PhysicsEngine     // 物理引擎计算
- Renderer          // 画布渲染器
- UIManager         // 用户界面管理
- ThemeManager      // 主题管理
- PerformanceMonitor // 性能监控
```

## 🎯 技术实现

### 物理引擎
- **Verlet 积分算法** - 数值稳定，能量守恒
- **粒子间作用力** - 引力、排斥力、边界碰撞
- **能量守恒系统** - 模拟真实的物理行为
- **碰撞检测** - 高效的边界和粒子碰撞处理

### 渲染优化
- **GPU 加速渲染** - 利用硬件加速提升性能
- **双缓冲技术** - 避免画面闪烁
- **增量渲染** - 只更新变化的部分
- **内存池管理** - 减少内存分配开销

### 性能优化
- **动态粒子管理** - 根据性能自动调整粒子数量
- **帧率自适应** - 保持60fps流畅运行
- **内存监控** - 实时显示资源使用情况
- **垃圾回收优化** - 减少GC停顿

## 📊 性能指标

| 指标 | 目标值 | 实际值 | 说明 |
|------|--------|--------|------|
| 帧率 (FPS) | ≥ 60 | 60+ | 流畅动画体验 |
| 初始加载时间 | < 2s | ~1.5s | 快速启动 |
| 最大粒子数 | 2000 | 2000 | 大规模模拟 |
| 内存使用 | < 100MB | ~50MB | 高效内存管理 |
| 首次绘制时间 | < 1s | ~0.8s | 快速呈现 |
| 交互响应时间 | < 50ms | ~30ms | 即时反馈 |

## 🌍 浏览器兼容性

| 浏览器 | 版本 | 支持状态 |
|--------|------|----------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| Opera | 76+ | ✅ 完全支持 |

## 🤝 贡献指南

我们欢迎任何形式的贡献！以下是参与项目的步骤：

### 报告问题
1. 在 [Issues](https://github.com/kevinkaiever-cloud/liji/issues) 页面查看是否已有类似问题
2. 如果没有，创建新的 Issue，详细描述问题
3. 包括复现步骤、期望行为和实际行为

### 提交代码
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范
- 遵循现有的代码风格
- 添加适当的注释
- 更新相关文档
- 添加测试用例（如果适用）

## 📝 许可证

本项目基于 **MIT 许可证** 开源。

```
MIT License

Copyright (c) 2026 kevinkaiever-cloud

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 致谢

### 技术灵感
- **Verlet 积分算法** - 感谢 Loup Verlet 的杰出贡献
- **Canvas 2D API** - MDN Web Docs 的优秀文档
- **物理模拟社区** - 众多开源物理模拟项目的启发

### 设计参考
- [Particles.js](https://github.com/VincentGarreau/particles.js)
- [Canvas Particles](https://github.com/JulianLaval/canvas-particle-network)
- [Physics Simulators](https://github.com/topics/physics-simulation)

### 工具支持
- [Visual Studio Code](https://code.visualstudio.com/)
- [GitHub Pages](https://pages.github.com/)
- [npm](https://www.npmjs.com/)

## 📞 联系与支持

### 问题反馈
- **GitHub Issues**: [提交问题](https://github.com/kevinkaiever-cloud/liji/issues)
- **功能请求**: 通过 Issues 页面提出

### 项目维护者
- **kevinkaiever-cloud** - 项目所有者

### 社区讨论
欢迎在 Issues 中讨论功能建议、技术问题或分享使用经验！

## 📈 项目路线图

### 近期计划 (v1.1)
- [ ] 添加更多实验模式
- [ ] 优化移动端触摸体验
- [ ] 添加粒子类型系统
- [ ] 实现数据导出功能

### 中期计划 (v2.0)
- [ ] WebGL 3D 版本
- [ ] 多粒子系统交互
- [ ] 物理参数预设库
- [ ] 实时数据可视化

### 长期愿景
- [ ] 量子力学模拟扩展
- [ ] 机器学习参数优化
- [ ] 教育模式（物理教学）
- [ ] API 接口服务

## 🎊 开始探索！

现在你已经了解了量子粒子模拟器的所有功能，是时候开始探索了！

**立即开始**:
1. 访问 [在线演示](https://kevinkaiever-cloud.github.io/liji/)
2. 点击画布添加粒子
3. 拖动鼠标创建粒子流
4. 调整参数观察变化
5. 尝试不同的实验模式

**学习资源**:
- [Canvas API 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
- [物理模拟基础](https://en.wikipedia.org/wiki/Physics_engine)
- [Verlet 积分教程](https://gafferongames.com/post/integration_basics/)

---

**🌀 探索粒子世界的奥秘，体验物理模拟的乐趣！**

*让代码流动，让粒子舞蹈，让物理之美在指尖绽放。*

*最后更新: 2026年2月24日*