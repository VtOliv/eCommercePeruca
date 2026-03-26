/* ===========================
   Product Data
   =========================== */
const PRODUCTS = [
    {
        id: 1,
        nome: 'Peruca Lisa Longa',
        categoria: 'Perucas Naturais',
        descricao: 'Cabelo 100% natural, liso e sedoso. Comprimento longo ideal para um visual elegante.',
        preco: 349.90,
        precoAntigo: 420.00,
        estoque: 15,
        emoji: '👱‍♀️',
        destaque: true,
        badge: 'Mais Vendido'
    },
    {
        id: 2,
        nome: 'Peruca Cacheada Média',
        categoria: 'Perucas Naturais',
        descricao: 'Cachos naturais volumosos. Perfeita para quem quer um look despojado e cheio de personalidade.',
        preco: 289.90,
        precoAntigo: null,
        estoque: 8,
        emoji: '👩‍🦱',
        destaque: true,
        badge: null
    },
    {
        id: 3,
        nome: 'Peruca Ruiva Sintética',
        categoria: 'Perucas Sintéticas',
        descricao: 'Ruiva vibrante em fibra sintética de alta qualidade. Sem desbotamento.',
        preco: 149.90,
        precoAntigo: 199.90,
        estoque: 20,
        emoji: '👩‍🦰',
        destaque: true,
        badge: '-25%'
    },
    {
        id: 4,
        nome: 'Peruca Curta Bob',
        categoria: 'Perucas Sintéticas',
        descricao: 'Corte chanel moderno e elegante. Fácil de usar no dia a dia.',
        preco: 119.90,
        precoAntigo: null,
        estoque: 12,
        emoji: '💇‍♀️',
        destaque: true,
        badge: null
    },
    {
        id: 5,
        nome: 'Aplique Liso 60cm',
        categoria: 'Apliques',
        descricao: 'Aplique de cabelo liso para alongar e dar volume. Fácil fixação.',
        preco: 89.90,
        precoAntigo: null,
        estoque: 30,
        emoji: '✂️',
        destaque: false,
        badge: null
    },
    {
        id: 6,
        nome: 'Aplique Cacheado',
        categoria: 'Apliques',
        descricao: 'Aplique cacheado que integra perfeitamente ao seu cabelo natural.',
        preco: 99.90,
        precoAntigo: 129.90,
        estoque: 18,
        emoji: '🌀',
        destaque: false,
        badge: null
    },
    {
        id: 7,
        nome: 'Touca para Peruca',
        categoria: 'Acessórios',
        descricao: 'Touca confortável que protege e mantém a peruca bem fixada.',
        preco: 19.90,
        precoAntigo: null,
        estoque: 50,
        emoji: '🎩',
        destaque: false,
        badge: null
    },
    {
        id: 8,
        nome: 'Kit Cuidados Capilar',
        categoria: 'Acessórios',
        descricao: 'Kit completo para cuidados com sua peruca: shampoo, condicionador e spray.',
        preco: 69.90,
        precoAntigo: 89.90,
        estoque: 25,
        emoji: '🧴',
        destaque: false,
        badge: null
    }
];

/* ===========================
   Cart State
   =========================== */
let cart = loadCart();

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem('loja_peruca_cart') || '[]');
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem('loja_peruca_cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        if (existing.qty < product.estoque) {
            existing.qty += 1;
        }
    } else {
        cart.push({ id: productId, qty: 1 });
    }

    saveCart();
    updateCartUI();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (!item || !product) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }
    if (item.qty > product.estoque) {
        item.qty = product.estoque;
    }

    saveCart();
    updateCartUI();
}

function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getTotalPrice() {
    return cart.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return sum + (product ? product.preco * item.qty : 0);
    }, 0);
}

function formatPrice(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');
    const itemsEl = document.getElementById('cartItems');

    if (countEl) countEl.textContent = getTotalItems();
    if (totalEl) totalEl.textContent = formatPrice(getTotalPrice());

    if (!itemsEl) return;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
        return;
    }

    itemsEl.innerHTML = cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return '';
        return `
            <div class="cart-item">
                <div class="cart-item__emoji">${product.emoji}</div>
                <div class="cart-item__info">
                    <div class="cart-item__name">${product.nome}</div>
                    <div class="cart-item__price">${formatPrice(product.preco)}</div>
                    <div class="cart-item__qty">
                        <button class="qty-btn" onclick="changeQty(${product.id}, -1)" aria-label="Diminuir">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${product.id}, 1)" aria-label="Aumentar">+</button>
                    </div>
                </div>
                <button class="cart-item__remove" onclick="removeFromCart(${product.id})" aria-label="Remover">🗑️</button>
            </div>
        `;
    }).join('');
}

/* ===========================
   Cart Sidebar Toggle
   =========================== */
function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

/* ===========================
   Product Card Renderer
   =========================== */
function renderProductCard(product) {
    const badgeHtml = product.badge
        ? `<span class="product-card__badge">${product.badge}</span>`
        : '';
    const oldPriceHtml = product.precoAntigo
        ? `<span class="price-old">${formatPrice(product.precoAntigo)}</span>`
        : '';
    const outOfStock = product.estoque === 0;

    return `
        <div class="product-card">
            <div class="product-card__image">
                <span>${product.emoji}</span>
                ${badgeHtml}
            </div>
            <div class="product-card__body">
                <div class="product-card__category">${product.categoria}</div>
                <div class="product-card__name">${product.nome}</div>
                <div class="product-card__desc">${product.descricao}</div>
                <div class="product-card__footer">
                    <div class="product-card__price">
                        ${oldPriceHtml}
                        ${formatPrice(product.preco)}
                    </div>
                    <button
                        class="btn--add-cart"
                        onclick="addToCart(${product.id})"
                        ${outOfStock ? 'disabled' : ''}
                    >
                        ${outOfStock ? 'Esgotado' : '🛒 Adicionar'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

/* ===========================
   Mobile Nav Toggle
   =========================== */
function setupNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });
}

/* ===========================
   Home Page: Featured Products
   =========================== */
function setupHomePage() {
    const grid = document.getElementById('featuredProducts');
    if (!grid) return;

    const featured = PRODUCTS.filter(p => p.destaque);
    grid.innerHTML = featured.map(renderProductCard).join('');
}

/* ===========================
   Products Page: Full Catalog
   =========================== */
function setupProductsPage() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortSelect = document.getElementById('sortSelect');
    const countEl = document.getElementById('productsCount');
    const noResults = document.getElementById('noResults');

    function renderFiltered() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : '';
        const sort = sortSelect ? sortSelect.value : 'default';

        let filtered = PRODUCTS.filter(p => {
            const matchesSearch = !searchTerm ||
                p.nome.toLowerCase().includes(searchTerm) ||
                p.descricao.toLowerCase().includes(searchTerm) ||
                p.categoria.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || p.categoria === category;
            return matchesSearch && matchesCategory;
        });

        if (sort === 'price-asc') {
            filtered.sort((a, b) => a.preco - b.preco);
        } else if (sort === 'price-desc') {
            filtered.sort((a, b) => b.preco - a.preco);
        } else if (sort === 'name-asc') {
            filtered.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        }

        grid.innerHTML = filtered.map(renderProductCard).join('');

        if (countEl) {
            countEl.textContent = `${filtered.length} produto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
        }

        if (noResults) {
            noResults.hidden = filtered.length > 0;
        }
    }

    // Apply category from URL query string
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('categoria');
    if (urlCategory && categoryFilter) {
        const matchingOption = Array.from(categoryFilter.options).find(
            opt => opt.value.toLowerCase().replace(/\s/g, '-') === urlCategory
        );
        if (matchingOption) categoryFilter.value = matchingOption.value;
    }

    if (searchInput) searchInput.addEventListener('input', renderFiltered);
    if (categoryFilter) categoryFilter.addEventListener('change', renderFiltered);
    if (sortSelect) sortSelect.addEventListener('change', renderFiltered);

    renderFiltered();
}

/* ===========================
   Form Validation Helpers
   =========================== */
function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (errorEl) errorEl.textContent = message;
    return false;
}

function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateCPF(cpf) {
    const clean = cpf.replace(/\D/g, '');
    if (clean.length !== 11) return false;
    // Reject known invalid sequences (all same digits)
    if (/^(\d)\1{10}$/.test(clean)) return false;

    // Validate first check digit
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(clean[i]) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(clean[9])) return false;

    // Validate second check digit
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(clean[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(clean[10]);
}

/* ===========================
   Contact Form
   =========================== */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const nome = document.getElementById('contactNome');
        const email = document.getElementById('contactEmail');
        const msg = document.getElementById('contactMsg');

        if (!nome || !nome.value.trim()) {
            valid = showError('contactNome', 'contactNomeError', 'Por favor, informe seu nome.');
        } else {
            clearError('contactNome', 'contactNomeError');
        }

        if (!email || !validateEmail(email.value)) {
            valid = showError('contactEmail', 'contactEmailError', 'Por favor, informe um e-mail válido.');
        } else {
            clearError('contactEmail', 'contactEmailError');
        }

        if (!msg || !msg.value.trim()) {
            valid = showError('contactMsg', 'contactMsgError', 'Por favor, escreva sua mensagem.');
        } else {
            clearError('contactMsg', 'contactMsgError');
        }

        if (!valid) return;

        const successEl = document.getElementById('contactSuccess');
        if (successEl) {
            successEl.hidden = false;
            form.reset();
        }
    });
}

/* ===========================
   Login Form
   =========================== */
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const email = document.getElementById('loginEmail');
        const senha = document.getElementById('loginSenha');

        if (!email || !validateEmail(email.value)) {
            valid = showError('loginEmail', 'loginEmailError', 'Por favor, informe um e-mail válido.');
        } else {
            clearError('loginEmail', 'loginEmailError');
        }

        if (!senha || senha.value.length < 6) {
            valid = showError('loginSenha', 'loginSenhaError', 'A senha deve ter no mínimo 6 caracteres.');
        } else {
            clearError('loginSenha', 'loginSenhaError');
        }

        if (!valid) return;

        const successEl = document.getElementById('loginSuccess');
        if (successEl) {
            successEl.hidden = false;
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        }
    });
}

/* ===========================
   Register Form
   =========================== */
function setupCadastroForm() {
    const form = document.getElementById('cadastroForm');
    if (!form) return;

    // CPF mask
    const cpfInput = document.getElementById('cadCPF');
    if (cpfInput) {
        cpfInput.addEventListener('input', () => {
            let v = cpfInput.value.replace(/\D/g, '');
            if (v.length > 9) {
                v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
            } else if (v.length > 6) {
                v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
            } else if (v.length > 3) {
                v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
            }
            cpfInput.value = v;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const nome = document.getElementById('cadNome');
        const cpf = document.getElementById('cadCPF');
        const email = document.getElementById('cadEmail');
        const dataNasc = document.getElementById('cadDataNasc');
        const sexo = form.querySelector('input[name="sexo"]:checked');
        const endereco = document.getElementById('cadEndereco');
        const senha = document.getElementById('cadSenha');
        const senhaConf = document.getElementById('cadSenhaConf');

        if (!nome || nome.value.trim().length < 3) {
            valid = showError('cadNome', 'cadNomeError', 'Informe o nome completo (mínimo 3 caracteres).');
        } else {
            clearError('cadNome', 'cadNomeError');
        }

        if (!cpf || !validateCPF(cpf.value)) {
            valid = showError('cadCPF', 'cadCPFError', 'Informe um CPF válido (11 dígitos).');
        } else {
            clearError('cadCPF', 'cadCPFError');
        }

        if (!email || !validateEmail(email.value)) {
            valid = showError('cadEmail', 'cadEmailError', 'Informe um e-mail válido.');
        } else {
            clearError('cadEmail', 'cadEmailError');
        }

        if (!dataNasc || !dataNasc.value) {
            valid = showError('cadDataNasc', 'cadDataNascError', 'Informe a data de nascimento.');
        } else {
            clearError('cadDataNasc', 'cadDataNascError');
        }

        const sexoError = document.getElementById('cadSexoError');
        if (!sexo) {
            if (sexoError) sexoError.textContent = 'Selecione o sexo.';
            valid = false;
        } else {
            if (sexoError) sexoError.textContent = '';
        }

        if (!endereco || endereco.value.trim().length < 10) {
            valid = showError('cadEndereco', 'cadEnderecoError', 'Informe o endereço completo.');
        } else {
            clearError('cadEndereco', 'cadEnderecoError');
        }

        if (!senha || senha.value.length < 6) {
            valid = showError('cadSenha', 'cadSenhaError', 'A senha deve ter no mínimo 6 caracteres.');
        } else {
            clearError('cadSenha', 'cadSenhaError');
        }

        if (!senhaConf || senhaConf.value !== senha.value) {
            valid = showError('cadSenhaConf', 'cadSenhaConfError', 'As senhas não coincidem.');
        } else {
            clearError('cadSenhaConf', 'cadSenhaConfError');
        }

        if (!valid) return;

        const successEl = document.getElementById('cadastroSuccess');
        if (successEl) {
            successEl.hidden = false;
            form.reset();
            setTimeout(() => {
                switchTab('login');
            }, 2000);
        }
    });
}

/* ===========================
   Auth Tabs
   =========================== */
function switchTab(tab) {
    const tabLogin = document.getElementById('tabLogin');
    const tabCadastro = document.getElementById('tabCadastro');
    const formLogin = document.getElementById('formLogin');
    const formCadastro = document.getElementById('formCadastro');

    if (!tabLogin || !tabCadastro || !formLogin || !formCadastro) return;

    if (tab === 'login') {
        tabLogin.classList.add('auth-tab--active');
        tabCadastro.classList.remove('auth-tab--active');
        formLogin.classList.remove('auth-form--hidden');
        formCadastro.classList.add('auth-form--hidden');
    } else {
        tabCadastro.classList.add('auth-tab--active');
        tabLogin.classList.remove('auth-tab--active');
        formCadastro.classList.remove('auth-form--hidden');
        formLogin.classList.add('auth-form--hidden');
    }
}

function setupAuthTabs() {
    const tabLogin = document.getElementById('tabLogin');
    const tabCadastro = document.getElementById('tabCadastro');
    const goToCadastro = document.getElementById('goToCadastro');
    const goToLogin = document.getElementById('goToLogin');

    if (tabLogin) tabLogin.addEventListener('click', () => switchTab('login'));
    if (tabCadastro) tabCadastro.addEventListener('click', () => switchTab('cadastro'));
    if (goToCadastro) goToCadastro.addEventListener('click', () => switchTab('cadastro'));
    if (goToLogin) goToLogin.addEventListener('click', () => switchTab('login'));

    // If URL hash is #cadastro, open the register tab
    if (window.location.hash === '#cadastro') {
        switchTab('cadastro');
    }
}

/* ===========================
   Password Toggle
   =========================== */
function setupPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            if (!input) return;
            if (input.type === 'password') {
                input.type = 'text';
                btn.textContent = '🙈';
            } else {
                input.type = 'password';
                btn.textContent = '👁️';
            }
        });
    });
}

/* ===========================
   Init
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    // Shared
    setupNav();
    updateCartUI();

    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const overlay = document.getElementById('overlay');

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', () => {
        closeCart();
        const nav = document.getElementById('nav');
        if (nav) nav.classList.remove('open');
    });

    setupPasswordToggles();

    // Page-specific
    setupHomePage();
    setupProductsPage();
    setupContactForm();
    setupAuthTabs();
    setupLoginForm();
    setupCadastroForm();
});
