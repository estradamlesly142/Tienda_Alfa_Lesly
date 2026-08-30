// ============================================================
// 🖼️ IMÁGENES DE PRODUCTOS
// Cuando tengas las imágenes en Google Drive u otro hosting,
// reemplaza el valor de "img" con la URL directa de cada foto.
// Ejemplo: img: "https://drive.google.com/uc?id=TU_ID_AQUI"
// Si no hay imagen, deja img: "" y se mostrará el ícono.
// ============================================================


// ============================================================
// 🧠 LÓGICA Y FUNCIONALIDAD COMPLETA - ALFA
// ============================================================

const products = [
  { id: 1, name: "Ambientador de Lencería", cat: "Hogar", price: 9500,original: 12000, img: "../img/Ambientador de lenceria.jpeg", desc: "Suaviza y perfuma tu ropa con esencia de lavanda" },
  { id: 2, name: "Blanqueador desinfectante", cat: "Hogar", price: 5000, original: 19000, img: "../img/Blanqueador desinfectante.jpeg", desc: "Fragancia detergente liquido con los mejores ingredientes" },
  { id: 3, name: "Cepillo Multifuncional", cat: "Hogar", price: 18000,original: 22000, img: "../img/Cepillo multifuncional.jpeg", desc: "Desinfectante multiusos con fragancia a pino natural" },
  { id: 4, name: "C. cannabis", cat: "Aseo Personal", price: 4800, original: 5200, img: "../img/C. cannabis.jpg", desc: "Ambientador de lenceria con aroma a naranja" },
  { id: 5, name: "Desengrasante Multiusos", cat: "Hogar", price: 8000, original: 9200, img: "../img/Desengrasante Multiusos.jpeg", desc: "Limpia y desinfecta con aroma cítrico duradero" },
  { id: 6, name: "Detergente Líquido", cat: "Hogar", price: 6700, original: 7500, img: "../img/Detergente liquido.jpeg", desc: "Fórmula antibacterial con aloe vera para manos suaves" },
  { id: 7, name: "Detergente liquido 4L", cat: "Hogar", price: 24000, original: 27000, img: "../img/Detergente liquido 4 L.jpeg", desc: "Jabón líquido con extracto de rosas y glicerina" },
  { id: 8, name: "Esfera Blanqueadora", cat: "Hogar", price: 12000,original: 14600, img: "../img/Esfera blanqueadoras.jpeg", desc: "Elimina grasa difícil con fórmula gel concentrada" },
  { id: 9, name: "Jabón Corporal", cat: "Aseo Personal", price: 7500,original: 7900, img: "../img/Jabon corporal.jpeg", desc: "Desengrasante potente con refrescante aroma a menta" },
  { id: 10, name: "kit limpia juntas", cat: "Hogar", price: 31800, original: 35000, img: "../img/Kit limpia juntas + cepillo multifuncional.jpeg", desc: "Fragancia suave especialmente formulada para perros" },
  { id: 11, name: "Lava loza", cat: "Hogar", price: 8000, original: 9150, emoji: "🐾", img: "../img/Lava loza.jpeg", desc: "Aroma frutal que dura hasta 48 horas en tu mascota" },
  { id: 12, name: "Limpia vidrios", cat: "Hogar", price: 6000, original: 6950, img: "../img/Limpia vidrios.jpeg", desc: "Ambientador de lenceria con aroma a naranja" },
  { id: 13, name: "Limpiador desinfectante", cat: "Hogar", price: 6350, original: 7000, img: "../img/Limpiador  desinfectante.jpeg", desc: "Ambientador de lenceria con aroma a naranja" },
  { id: 14, name: "Pastillas limpiadoras", cat: "Hogar", price: 5000, original: 5500, img: "../img/Pastillas limpiadoras.jpeg", desc: "Ambientador de lenceria con aroma a naranja" },
  { id: 15, name: "Perfume cat dog", cat: "Mascotas", price: 14000, original: 16000, img: "../img/Perfume cat dog.jpeg", desc: "Ambientador de lenceria con aroma a naranja" },
  { id: 16, name: "Suavizante_textil", cat: "Lavandería", price: 7000, original: 8100, img: "../img/Suavizante_textil.jpeg", desc: "Ambientador de lenceria con aroma a naranja" },
  { id: 17, name: "Limpiador desinfectante", cat: "Hogar", price: 10200, original: 12000, img: "../img/Limpiador  desinfectante.jpeg", desc: "Ambientador de lenceria con aroma a naranja" }
];

let cart = [];

function renderProducts(filter) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = filter === 'Todos'
    ? products
    : products.filter(p => p.cat.toLowerCase() === filter.toLowerCase());

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" id="prod-${p.id}">
      ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'popular' ? '⭐ Popular' : p.badge === 'new' ? '✨ Nuevo' : '🏷️ Oferta'}</span>` : ''}
       ${p.img
      ? `<img src="${p.img}" alt="${p.name}" class="product-image">`
      : `<div class="emoji">${p.emoji}</div>`
    }
      <div class="product-info">
        <div class="product-category">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price">$${p.price.toLocaleString('es-CO')}</span>
            ${p.original ? `<span class="price-original">$${p.original.toLocaleString('es-CO')}</span>` : ''}
          </div>
          <button class="btn-add" onclick="addToCart(${p.id})" aria-label="Agregar al carrito">+</button>
        </div>
      </div>
    </div>
  `).join('');
}


function filterProducts(filter, btn) {
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderProducts(filter);
  return false;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartBadge();
  showToast(`✅ ${product.name} agregado al carrito`);
  renderCart();
}

function updateCartBadge() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCart() {
  const content = document.getElementById('cart-content');
  const footer = document.getElementById('cart-footer');
  if (cart.length === 0) {
    content.innerHTML = `<div style="text-align:center; padding:20px;"><p>Tu carrito está vacío</p></div>`;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  content.innerHTML = cart.map(c => `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
      <div>
        <strong>${c.name}</strong><br>
        <small>$${c.price.toLocaleString('es-CO')} x ${c.qty}</small>
      </div>
      <div>
        <button onclick="changeQty(${c.id}, -1)">-</button>
        <button onclick="changeQty(${c.id}, 1)">+</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
  document.getElementById('cart-total-amount').textContent = `$${total.toLocaleString('es-CO')}`;
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCartBadge();
  renderCart();
}

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  renderCart();
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function checkout() {
  showToast('🎉 ¡Pedido en proceso! Te contactaremos pronto.');
  cart = [];
  updateCartBadge();
  renderCart();
  closeCart();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// Modo Oscuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  });
}

// Validación Formulario Contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    if (!name) { document.getElementById('err-name').textContent = 'El nombre es requerido.'; isValid = false; }
    if (!email || !emailRegex.test(email)) { document.getElementById('err-email').textContent = 'Ingresa un correo válido.'; isValid = false; }
    if (!phone) { document.getElementById('err-phone').textContent = 'El teléfono es requerido.'; isValid = false; }
    if (!message) { document.getElementById('err-message').textContent = 'Escribe un mensaje.'; isValid = false; }

    if (isValid) {
      showToast('📩 ¡Mensaje enviado con éxito!');
      contactForm.reset();
    }
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('Todos');
  renderCart();
});
