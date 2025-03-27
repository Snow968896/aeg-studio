// 初始化 GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 初始化动画
function initAnimations() {
    console.log('Initializing animations...');
    
    // 英雄区域动画
    const heroTitle = document.querySelector('.hero-title');
    const heroText = document.querySelector('.hero-text');
    
    if (heroTitle) {
        gsap.from(heroTitle, {
            duration: 1.2,
            y: 60,
            opacity: 0,
            ease: 'power3.out'
        });
    }

    if (heroText) {
        gsap.from(heroText, {
            duration: 1.2,
            y: 40,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
    }

    // 服务区域动画
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
        const servicesTl = gsap.timeline({
            scrollTrigger: {
                trigger: servicesSection,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        const sectionTitle = servicesSection.querySelector('.section-title');
        const serviceCards = servicesSection.querySelectorAll('.service-card');

        if (sectionTitle) {
            servicesTl.from(sectionTitle, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        }

        if (serviceCards.length) {
            servicesTl.from(serviceCards, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            }, "-=0.4");
        }
    }

    // 团队区域动画
    const teamSection = document.querySelector('#team');
    if (teamSection) {
        const teamTl = gsap.timeline({
            scrollTrigger: {
                trigger: teamSection,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        const sectionTitle = teamSection.querySelector('.section-title');
        const teamCards = teamSection.querySelectorAll('.team-card');

        if (sectionTitle) {
            teamTl.from(sectionTitle, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        }

        if (teamCards.length) {
            teamTl.from(teamCards, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            }, "-=0.4");
        }
    }
}

// 初始化导航功能
function initNavigation() {
    console.log('Initializing navigation...');
    const nav = document.querySelector('nav');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    // 导航栏滚动效果
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('backdrop-blur-lg', 'border-white/10');
            } else {
                nav.classList.remove('backdrop-blur-lg', 'border-white/10');
            }
        });
    }

    // 移动端菜单
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // 更新活动导航链接
    function updateActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // 如果是首页
            if (currentPath === '/' || currentPath.endsWith('index.html')) {
                if (href === 'index.html' || href === './index.html') {
                    link.classList.add('active');
                }
            }
            // 其他页面
            else if (href && currentPath.includes(href)) {
                link.classList.add('active');
            }
        });
    }

    // 初始调用一次
    updateActiveLink();
}

// 创意背景动画
class Particle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = '#4ADE80';
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;
        if (this.alpha > 0) this.alpha -= 0.01;

        // 边界检查
        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push(new Particle(this.canvas, x, y));
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw(this.ctx);

            // 移除透明度为0的粒子
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            }

            // 鼠标交互
            if (this.mouse.x != null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    particle.x += Math.cos(angle) * 2;
                    particle.y += Math.sin(angle) * 2;
                }
            }
        });

        // 保持粒子数量
        if (this.particles.length < 100) {
            this.particles.push(new Particle(
                this.canvas,
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }

        requestAnimationFrame(() => this.animate());
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // 初始化导航功能
    initNavigation();
    
    // 初始化动画
    console.log('Starting animations...');
    initAnimations();

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // 关闭移动端菜单
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 表单提交动画
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> 发送中...';
            button.disabled = true;
            
            // 模拟表单提交
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> 发送成功';
                button.classList.remove('bg-neon');
                button.classList.add('bg-green-500');
                
                // 重置表单
                setTimeout(() => {
                    form.reset();
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.remove('bg-green-500');
                    button.classList.add('bg-neon');
                }, 2000);
            }, 1500);
        });
    }

    new ParticleAnimation();

    // 服务卡片鼠标跟踪效果
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 处理服务页面加载时的滚动和激活状态
    if (window.location.pathname.includes('services.html')) {
        // 获取URL中的hash值
        const hash = window.location.hash;
        if (hash) {
            // 移除#号
            const targetId = hash.substring(1);
            // 查找对应的服务卡片
            const targetCard = document.querySelector(`[data-service-id="${targetId}"]`);
            if (targetCard) {
                // 滚动到目标位置
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // 添加激活状态
                targetCard.classList.add('active-tab');
                
                // 显示对应的案例内容
                const tabId = targetCard.getAttribute('data-tab');
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => content.classList.add('hidden'));
                const targetContent = document.getElementById(`${tabId}-content`);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            }
        } else {
            // 如果没有hash值，默认显示第一个案例
            const firstCard = document.querySelector('.service-card');
            if (firstCard) {
                firstCard.classList.add('active-tab');
                const tabId = firstCard.getAttribute('data-tab');
                const targetContent = document.getElementById(`${tabId}-content`);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            }
        }
    }

    // 服务卡片Tab交互
    const serviceCards = document.querySelectorAll('.service-card[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // 移除所有卡片的激活状态
            serviceCards.forEach(c => c.classList.remove('active-tab'));
            // 添加当前卡片的激活状态
            card.classList.add('active-tab');
            
            // 隐藏所有内容
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // 显示对应内容
            const tabId = card.getAttribute('data-tab');
            const targetContent = document.getElementById(`${tabId}-content`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                // 平滑滚动到案例展示区域
                targetContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // 处理联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
});

// 处理联系表单提交
async function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formMessage = document.getElementById('formMessage');
    const successMessage = formMessage.querySelector('.success-message');
    const errorMessage = formMessage.querySelector('.error-message');
    
    // 禁用提交按钮
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    
    // 收集表单数据
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        // 这里使用 Email.js 服务发送邮件
        // 需要先在 https://www.emailjs.com 注册账号并获取相关配置
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone || '未提供',
            subject: data.subject,
            message: data.message
        };

        // 发送邮件（这里需要替换为您的 Email.js 配置）
        await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            templateParams,
            'YOUR_PUBLIC_KEY'
        );

        // 显示成功消息
        formMessage.classList.remove('hidden');
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        form.reset();

    } catch (error) {
        // 显示错误消息
        formMessage.classList.remove('hidden');
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
        console.error('发送失败:', error);
    } finally {
        // 恢复提交按钮
        submitButton.disabled = false;
        submitButton.innerHTML = '发送消息 <i class="fas fa-paper-plane ml-2"></i>';
    }

    return false;
} 