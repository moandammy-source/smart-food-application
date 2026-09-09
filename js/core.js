/* Shared application core and data */
/* ============ ICONS ============ */
const I = {
  home:`<path d="M4 11l8-7 8 7"/><path d="M6 10v9a1 1 0 001 1h4v-6h2v6h4a1 1 0 001-1v-9"/>`,
  search:`<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.5-4.5"/>`,
  receipt:`<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z"/><path d="M9 8h6M9 12h6"/>`,
  user:`<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-4 4.5-6 7-6s5.5 2 7 6"/>`,
  heart:`<path d="M12 20s-7-4.4-9.5-8.6C1 8 2.3 4.8 5.5 4.1 8 3.6 10 5 12 7.5 14 5 16 3.6 18.5 4.1c3.2.7 4.5 3.9 3 7.3C19 15.6 12 20 12 20z"/>`,
  star:`<path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1L6.6 19.3l1.3-6-4.6-4.1 6.1-.6L12 3z"/>`,
  leaf:`<path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z"/>`,
  qr:`<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M15 15h2v2h-2zM19 15h1M15 19h1M19 19h1"/>`,
  bell:`<path d="M6 10a6 6 0 0112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z"/><path d="M10 18a2 2 0 004 0"/>`,
  plus:`<path d="M12 5v14M5 12h14"/>`,
  check:`<path d="M5 13l4 4L19 7"/>`,
  left:`<path d="M15 5l-7 7 7 7"/>`,
  filter:`<path d="M4 6h16M7 12h10M10 18h4"/>`,
  clock:`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
  tag:`<path d="M3 12l9-9h6a2 2 0 012 2v6l-9 9a2 2 0 01-3 0l-5-5a2 2 0 010-3z"/><circle cx="15" cy="7" r="1.2"/>`,
  camera:`<path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13.5" r="3.5"/>`,
  upload:`<path d="M12 16V5M8 9l4-4 4 4"/><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>`,
  box:`<path d="M3 8l9-5 9 5-9 5-9-5z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/>`,
  chart:`<path d="M4 20V10M11 20V4M18 20v-7"/>`,
  users:`<circle cx="8" cy="9" r="3"/><circle cx="17" cy="10" r="2.6"/><path d="M2 20c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2"/><path d="M14.5 15.2c2.4.2 4.2 2 4.7 4.8"/>`,
  settings:`<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 000-3l1-1.7-1.7-1.7-1.7 1a1.7 1.7 0 00-3 0l-1-1.7-1.7 1.7-1.7-1a1.7 1.7 0 00-1.7-1v2a1.7 1.7 0 00-1.7 1l-1.7-1-1.7 1.7 1.7 1a1.7 1.7 0 000 3l-1.7 1 1.7 1.7 1.7-1a1.7 1.7 0 003 0l1 1.7 1.7-1.7-1-1.7a1.7 1.7 0 001.7-1z"/>`,
  scan:`<path d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3M4 12h16"/>`,
  gift:`<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12"/><path d="M12 9c-2-4-6-4-6-1s3 1 6 1zM12 9c2-4 6-4 6-1s-3 1-6 1z"/>`,
  map:`<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>`,
  chevronR:`<path d="M9 5l7 7-7 7"/>`,
  logout:`<path d="M9 5H6a2 2 0 00-2 2v10a2 2 0 002 2h3M15 8l4 4-4 4M9 12h10"/>`,
  bolt:`<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>`,
};
function icon(name, size=20, stroke='var(--ink-soft)', fill='none'){
  if(name==='leaf'){
    return `<img src="/logo.png" alt="" width="${size}" height="${size}" style="display:block; object-fit:contain;" />`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[name]||''}</svg>`;
}

/* ============ MOCK DATA ============ */
const foods = [
  {id:1, name:"Roast Chicken Rice Box", store:"Golden Wok Kitchen", cat:"Meals", emoji:"🍛", image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85", grad:"linear-gradient(135deg,#FCE9C9,#F6C36B)", original:180, price:69, qty:6, distance:0.6, rating:4.8, pickup:"18:30–19:30", prep:"Cooked today at 14:00", best:"Today, 21:00", allergens:["Gluten","Soy"], ingredients:"Jasmine rice, roasted chicken thigh, soy-ginger glaze, pickled vegetables.", storeRating:4.8, reviews:212, safety:"Held in a chiller since 14:30 · HACCP-certified kitchen · staff trained in food safety handling."},
  {id:2, name:"Sourdough Loaf (day-old)", store:"Meadow & Rye Bakery", cat:"Bakery", emoji:"🍞", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85", grad:"linear-gradient(135deg,#F3E3C6,#D9A968)", original:140, price:45, qty:3, distance:0.9, rating:4.9, pickup:"19:00–20:00", prep:"Baked yesterday, 06:00", best:"Tomorrow, 12:00", allergens:["Gluten"], ingredients:"Wheat flour, water, sourdough starter, sea salt.", storeRating:4.9, reviews:340, safety:"Ambient storage, sealed in a paper bag at close of day."},
  {id:3, name:"Iced Latte + Almond Croissant", store:"Basil & Bean Café", cat:"Café", emoji:"☕", image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85", grad:"linear-gradient(135deg,#E7DCCB,#C9A27C)", original:150, price:59, qty:4, distance:0.3, rating:4.7, pickup:"17:00–18:00", prep:"Made fresh today", best:"Today, 20:00", allergens:["Dairy","Gluten","Nuts"], ingredients:"Espresso, fresh milk, almond-frangipane croissant.", storeRating:4.7, reviews:98, safety:"Pastry case held below 4°C until pickup."},
  {id:4, name:"Mixed Veg & Fruit Crate", store:"FreshMart Supermarket", cat:"Grocery", emoji:"🥦", image:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85", grad:"linear-gradient(135deg,#DCEFD8,#8FCB8A)", original:220, price:79, qty:10, distance:1.4, rating:4.5, pickup:"20:00–21:00", prep:"Sorted today", best:"In 2–3 days", allergens:[], ingredients:"Seasonal vegetables and fruit nearing best-by date, still firm and edible.", storeRating:4.5, reviews:501, safety:"Cold-chain maintained; items visually inspected before listing."},
  {id:5, name:"Weekend Brunch Buffet Box", store:"Riverside Grand Hotel", cat:"Hotel", emoji:"🍳", image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85", grad:"linear-gradient(135deg,#E3E9F2,#AEC2E0)", original:390, price:129, qty:5, distance:2.1, rating:4.9, pickup:"14:30–15:30", prep:"Prepared 10:00 today", best:"Today, 17:00", allergens:["Egg","Dairy","Gluten"], ingredients:"Assorted brunch dishes from the buffet line, portioned and sealed.", storeRating:4.9, reviews:76, safety:"Held under buffet heat-lamp compliance, then chilled at 11:30."},
  {id:6, name:"Protein Grain Bowl", store:"Basil & Bean Café", cat:"Healthy Food", emoji:"🥗", image:"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85", grad:"linear-gradient(135deg,#DDEDD0,#A9D48A)", original:165, price:69, qty:7, distance:0.3, rating:4.6, pickup:"18:00–19:00", prep:"Made today, 11:30", best:"Today, 20:00", allergens:["Soy"], ingredients:"Quinoa, grilled chicken, edamame, roasted pumpkin, tahini dressing.", storeRating:4.7, reviews:98, safety:"Chilled below 4°C, sealed container."},
];
const categories = [
  {name:"Meals", emoji:"🍛"},{name:"Bakery", emoji:"🍞"},{name:"Café", emoji:"☕"},
  {name:"Grocery", emoji:"🥦"},{name:"Hotel", emoji:"🍳"},{name:"Healthy Food", emoji:"🥗"},
];

/* ============ STATE ============ */
let state = {
  mode:'customer',
  screen:'splash',
  cart:{}, // id -> qty
  couponApplied:false,
  pointsApplied:false,
  selectedFoodId:null,
  searchQuery:'',
  searchDraft:'',
  searchLoading:false,
  activeCat:'All',
  filtersOpen:false,
  filters:{dietary:'All', maxDistance:'Any'},
  favorites:{},
  orderData:null,
  sellerScreen:'dashboard',
  uploadStep:0,
  donationData:null,
  donationLoading:false,
  donationError:'',
  donatingFoodId:null,
  orderPoints:null,
  orderRewardLoading:false,
  confirmFoodId:null,
  donationSuccessPoints:null,
  donationSuccessFoodId:null,
};

function money(n){ return '฿'+n.toLocaleString(); }
function cartItems(){ return Object.entries(state.cart).map(([id,qty])=>({food:foods.find(f=>f.id==id), qty})); }
function cartCount(){ return Object.values(state.cart).reduce((a,b)=>a+b,0); }
function cartTotal(){ return cartItems().reduce((sum,{food,qty})=>sum+food.price*qty,0); }
function cartOriginal(){ return cartItems().reduce((sum,{food,qty})=>sum+food.original*qty,0); }

function setMode(m){
  state.mode=m;
  document.getElementById('btn-mode-customer').classList.toggle('active', m==='customer');
  document.getElementById('btn-mode-seller').classList.toggle('active', m==='seller');
  document.getElementById('device-customer').classList.toggle('hidden', m!=='customer');
  document.getElementById('device-seller').classList.toggle('hidden', m!=='seller');
  if(m==='seller') renderSeller();
}

function go(screen, extra){
  state.screen=screen;
  if(extra) Object.assign(state, extra);
  renderCustomer();
  document.getElementById('customer-screen').scrollTop=0;
}

/* ============ CUSTOMER RENDER ============ */
function renderCustomer(animate=true){
  const el = document.getElementById('customer-screen');
  const nav = document.getElementById('customer-nav');
  const navScreens = ['home','search','tracking','profile','donate','rewards'];
  if(navScreens.includes(state.screen)){
    nav.style.display='flex';
    nav.innerHTML = `
      ${navBtn('home','home','Home')}
      ${navBtn('search','search','Food')}
      ${navBtn('donate','gift','Donate')}
      ${navBtn('rewards','star','Points')}
      ${navBtn('profile','user','Profile')}
    `;
  } else { nav.style.display='none'; }

  const screens = {
    splash: screenSplash, login: screenLogin, home: screenHome, search: screenSearch,
    foodDetail: screenFoodDetail, cart: screenCart, checkout: screenCheckout,
    payment: screenPayment, confirmation: screenConfirmation, tracking: screenTracking,
    profile: screenProfile, rewards: screenRewards, donate: screenDonate, donationSuccess: screenDonationSuccess, sustainability: screenSustainability,
    support: screenSupport, favorites: screenFavorites,
  };
  el.innerHTML = `<div class="${animate?'fade-in':''}">${(screens[state.screen]||screenHome)()}</div>`;
}
function navBtn(id, ic, label){
  return `<button class="${state.screen===id?'active':''}" onclick="go('${id}')">${icon(ic,20, state.screen===id?'var(--forest)':'var(--ink-soft)')}<span>${label}</span></button>`;
}
function header(title, back){
  return `<div style="display:flex; align-items:center; gap:10px; padding:16px 20px 6px;">
    ${back?`<button onclick="${back}" style="background:#fff;border:1px solid var(--line);border-radius:10px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;">${icon('left',18)}</button>`:''}
    <h2 style="font-size:17px;">${title}</h2>
  </div>`;
}

/* ---- Splash ---- */
