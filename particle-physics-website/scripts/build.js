#!/usr/bin/env node

/**
 * 量子粒子模拟器 - 构建脚本
 * 自动化构建和优化工作流
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BuildSystem {
    constructor() {
        this.projectRoot = path.dirname(__dirname);
        this.srcDir = path.join(this.projectRoot, 'src');
        this.publicDir = path.join(this.projectRoot, 'public');
        this.distDir = path.join(this.projectRoot, 'dist');
        
        this.config = {
            version: '1.0.0',
            buildTime: new Date().toISOString(),
            optimize: {
                minify: true,
                compress: true,
                bundle: false
            }
        };
    }
    
    // ===== 构建流程 =====
    async build() {
        console.log('🚀 开始构建量子粒子模拟器...');
        console.log(`版本: ${this.config.version}`);
        console.log(`构建时间: ${this.config.buildTime}`);
        console.log('='.repeat(50));
        
        try {
            // 1. 清理构建目录
            this.cleanDist();
            
            // 2. 复制公共文件
            this.copyPublicFiles();
            
            // 3. 处理HTML文件
            this.processHTML();
            
            // 4. 处理CSS文件
            this.processCSS();
            
            // 5. 处理JavaScript文件
            this.processJavaScript();
            
            // 6. 优化资源
            this.optimizeResources();
            
            // 7. 生成构建报告
            this.generateBuildReport();
            
            console.log('✅ 构建完成！');
            console.log(`输出目录: ${this.distDir}`);
            
        } catch (error) {
            console.error('❌ 构建失败:', error.message);
            process.exit(1);
        }
    }
    
    // ===== 构建步骤 =====
    cleanDist() {
        console.log('🧹 清理构建目录...');
        
        if (fs.existsSync(this.distDir)) {
            fs.rmSync(this.distDir, { recursive: true, force: true });
        }
        
        fs.mkdirSync(this.distDir, { recursive: true });
        console.log('✅ 清理完成');
    }
    
    copyPublicFiles() {
        console.log('📁 复制公共文件...');
        
        if (!fs.existsSync(this.publicDir)) {
            console.log('⚠️  公共目录不存在，跳过');
            return;
        }
        
        this.copyDirectory(this.publicDir, this.distDir);
        console.log('✅ 文件复制完成');
    }
    
    processHTML() {
        console.log('📄 处理HTML文件...');
        
        const htmlFiles = this.findFiles(this.distDir, '.html');
        
        htmlFiles.forEach(file => {
            let content = fs.readFileSync(file, 'utf8');
            
            // 添加构建信息注释
            const buildInfo = `\n<!-- 
    量子粒子模拟器 v${this.config.version}
    构建时间: ${new Date().toLocaleString('zh-CN')}
    构建哈希: ${this.generateHash(content)}
-->\n`;
            
            content = content.replace('</head>', `${buildInfo}</head>`);
            
            // 压缩HTML（简单版本）
            if (this.config.optimize.minify) {
                content = this.minifyHTML(content);
            }
            
            fs.writeFileSync(file, content, 'utf8');
        });
        
        console.log(`✅ 处理了 ${htmlFiles.length} 个HTML文件`);
    }
    
    processCSS() {
        console.log('🎨 处理CSS文件...');
        
        const cssFiles = this.findFiles(this.distDir, '.css');
        
        cssFiles.forEach(file => {
            let content = fs.readFileSync(file, 'utf8');
            
            // 压缩CSS
            if (this.config.optimize.minify) {
                content = this.minifyCSS(content);
            }
            
            fs.writeFileSync(file, content, 'utf8');
        });
        
        console.log(`✅ 处理了 ${cssFiles.length} 个CSS文件`);
    }
    
    processJavaScript() {
        console.log('⚡ 处理JavaScript文件...');
        
        const jsFiles = this.findFiles(this.distDir, '.js');
        
        jsFiles.forEach(file => {
            let content = fs.readFileSync(file, 'utf8');
            
            // 添加构建信息
            const buildInfo = `\n// 构建信息: v${this.config.version} @ ${this.config.buildTime}\n`;
            content = buildInfo + content;
            
            // 简单压缩（移除注释和空白）
            if (this.config.optimize.minify) {
                content = this.minifyJS(content);
            }
            
            fs.writeFileSync(file, content, 'utf8');
        });
        
        console.log(`✅ 处理了 ${jsFiles.length} 个JavaScript文件`);
    }
    
    optimizeResources() {
        console.log('🔧 优化资源文件...');
        
        // 这里可以添加图片压缩、字体优化等
        // 目前只做简单的文件大小检查
        
        const files = this.getAllFiles(this.distDir);
        let totalSize = 0;
        
        files.forEach(file => {
            const stats = fs.statSync(file);
            totalSize += stats.size;
        });
        
        const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
        console.log(`📊 总文件大小: ${totalSizeMB} MB`);
        
        // 检查大文件
        files.forEach(file => {
            const stats = fs.statSync(file);
            const sizeMB = stats.size / (1024 * 1024);
            
            if (sizeMB > 1) {
                console.log(`⚠️  大文件警告: ${path.relative(this.distDir, file)} (${sizeMB.toFixed(2)} MB)`);
            }
        });
        
        console.log('✅ 资源优化完成');
    }
    
    generateBuildReport() {
        console.log('📋 生成构建报告...');
        
        const report = {
            project: '量子粒子模拟器',
            version: this.config.version,
            buildTime: this.config.buildTime,
            buildConfig: this.config,
            files: this.getFileStats(),
            performance: this.getPerformanceStats()
        };
        
        const reportFile = path.join(this.distDir, 'build-report.json');
        fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');
        
        console.log('✅ 构建报告已生成: build-report.json');
    }
    
    // ===== 工具方法 =====
    copyDirectory(source, target) {
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true });
        }
        
        const items = fs.readdirSync(source, { withFileTypes: true });
        
        for (const item of items) {
            const sourcePath = path.join(source, item.name);
            const targetPath = path.join(target, item.name);
            
            if (item.isDirectory()) {
                this.copyDirectory(sourcePath, targetPath);
            } else {
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
    }
    
    findFiles(dir, extension) {
        const files = [];
        
        const walk = (currentDir) => {
            const items = fs.readdirSync(currentDir, { withFileTypes: true });
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item.name);
                
                if (item.isDirectory()) {
                    walk(fullPath);
                } else if (item.name.endsWith(extension)) {
                    files.push(fullPath);
                }
            }
        };
        
        walk(dir);
        return files;
    }
    
    getAllFiles(dir) {
        const files = [];
        
        const walk = (currentDir) => {
            const items = fs.readdirSync(currentDir, { withFileTypes: true });
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item.name);
                
                if (item.isDirectory()) {
                    walk(fullPath);
                } else {
                    files.push(fullPath);
                }
            }
        };
        
        walk(dir);
        return files;
    }
    
    getFileStats() {
        const files = this.getAllFiles(this.distDir);
        const stats = {
            total: files.length,
            byType: {},
            totalSize: 0
        };
        
        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            const fileStats = fs.statSync(file);
            
            // 统计文件类型
            stats.byType[ext] = (stats.byType[ext] || 0) + 1;
            
            // 统计总大小
            stats.totalSize += fileStats.size;
        });
        
        stats.totalSizeMB = (stats.totalSize / (1024 * 1024)).toFixed(2);
        
        return stats;
    }
    
    getPerformanceStats() {
        const htmlFiles = this.findFiles(this.distDir, '.html');
        const cssFiles = this.findFiles(this.distDir, '.css');
        const jsFiles = this.findFiles(this.distDir, '.js');
        
        return {
            htmlFiles: htmlFiles.length,
            cssFiles: cssFiles.length,
            jsFiles: jsFiles.length,
            estimatedLoadTime: this.estimateLoadTime()
        };
    }
    
    estimateLoadTime() {
        // 简单的加载时间估算
        const files = this.getAllFiles(this.distDir);
        let totalSize = 0;
        
        files.forEach(file => {
            const stats = fs.statSync(file);
            totalSize += stats.size;
        });
        
        // 假设平均网速 5MB/s
        const loadTime = (totalSize / (5 * 1024 * 1024)).toFixed(2);
        return `${loadTime} 秒`;
    }
    
    generateHash(content) {
        // 简单的哈希生成
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            hash = ((hash << 5) - hash) + content.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash).toString(16).substring(0, 8);
    }
    
    minifyHTML(content) {
        // 简单的HTML压缩
        return content
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .replace(/\s+>/g, '>')
            .replace(/<\s+/g, '<')
            .trim();
    }
    
    minifyCSS(content) {
        // 简单的CSS压缩
        return content
            .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
            .replace(/\s+/g, ' ')
            .replace(/\s*([{}:;,])\s*/g, '$1')
            .replace(/;}/g, '}')
            .trim();
    }
    
    minifyJS(content) {
        // 简单的JS压缩（移除单行注释和空白）
        return content
            .replace(/\/\/.*$/gm, '') // 移除单行注释
            .replace(/\s+/g, ' ')
            .replace(/\s*([=+\-*/%&|^<>!?:;,{}()[\]])\s*/g, '$1')
            .trim();
    }
}

// ===== 命令行接口 =====
async function main() {
    const buildSystem = new BuildSystem();
    
    // 解析命令行参数
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
        case 'build':
            await buildSystem.build();
            break;
            
        case 'clean':
            buildSystem.cleanDist();
            console.log('✅ 清理完成');
            break;
            
        case 'serve':
            // 启动开发服务器
            console.log('🌐 启动开发服务器...');
            execSync('npx serve dist', { stdio: 'inherit' });
            break;
            
        case 'analyze':
            // 分析构建结果
            console.log('📊 分析构建结果...');
            const stats = buildSystem.getFileStats();
            console.log(JSON.stringify(stats, null, 2));
            break;
            
        default:
            console.log('可用命令:');
            console.log('  build    - 构建项目');
            console.log('  clean    - 清理构建目录');
            console.log('  serve    - 启动开发服务器');
            console.log('  analyze  - 分析构建结果');
            break;
    }
}

// 运行主函数
if (require.main === module) {
    main().catch(console.error);
}

module.exports = BuildSystem;