// 组件内容
const components = {
    nav: `
        <!-- 导航栏 -->
        <nav class="fixed w-full z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex-shrink-0">
                        <a href="index.html" class="text-2xl font-bold bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
                            AEG Creative Design Studio
                        </a>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-8">
                            <a href="index.html" class="nav-link" id="nav-home">首页</a>
                            <a href="services.html" class="nav-link" id="nav-services">服务与能力</a>
                            <a href="team.html" class="nav-link" id="nav-team">团队介绍</a>
                            <a href="contact.html" class="nav-link" id="nav-contact">联系我们</a>
                        </div>
                    </div>
                    <div class="md:hidden">
                        <button id="menu-btn" class="text-white hover:text-neon">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- 移动端菜单 -->
            <div id="mobile-menu" class="hidden md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 bg-dark-lighter">
                    <a href="index.html" class="mobile-nav-link" id="mobile-nav-home">首页</a>
                    <a href="services.html" class="mobile-nav-link" id="mobile-nav-services">服务与能力</a>
                    <a href="team.html" class="mobile-nav-link" id="mobile-nav-team">团队介绍</a>
                    <a href="contact.html" class="mobile-nav-link" id="mobile-nav-contact">联系我们</a>
                </div>
            </div>
        </nav>
    `,
    footer: `
        <!-- 页脚 -->
        <footer class="bg-dark py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center text-gray-400 text-sm">
                    <p>&copy; 2024 AEG Creative Design Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `
};

// 组件加载函数
function loadComponent(elementId, componentName) {
    try {
        const container = document.getElementById(elementId);
        if (!container) {
            console.error(`Container ${elementId} not found`);
            return false;
        }

        const component = components[componentName];
        if (!component) {
            throw new Error(`Component ${componentName} not found`);
        }

        container.innerHTML = component;
        return true;
    } catch (error) {
        console.error('Error loading component:', error);
        return false;
    }
}

// 当 DOM 加载完成后加载组件
document.addEventListener('DOMContentLoaded', () => {
    // 加载导航栏
    loadComponent('nav-container', 'nav');
    
    // 加载页脚
    loadComponent('footer-container', 'footer');
    
    // 初始化导航栏状态
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        if (currentPath === '/' || currentPath === '/index.html') {
            if (link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        } else if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // 移动端菜单切换
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}); 