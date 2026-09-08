function changeQty(id, delta, forceAddIfZero){
  const cur = state.cart[id]||0;
  let next = cur+delta;
  if(forceAddIfZero && cur===0) next = 1;
  if(next<0) next=0;
  state.cart[id]=next;
  if(next===0) delete state.cart[id];
  renderCustomer(false);
}

function toggleCoupon(){
  state.couponApplied=!state.couponApplied;
  renderCustomer(false);
}

function togglePoints(){
  state.pointsApplied=!state.pointsApplied;
  renderCustomer(false);
}

let searchTimer;
let searchLoadingTimer;

function handleSearchInput(value){
  state.searchDraft=value;
  clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>{
    state.searchQuery=state.searchDraft;
    state.searchLoading=true;
    renderCustomer(false);
    clearTimeout(searchLoadingTimer);
    searchLoadingTimer=setTimeout(()=>{
      state.searchLoading=false;
      renderCustomer(false);
    },350);
  },500);
}

function setCategory(category){
  state.activeCat=category;
  state.searchLoading=true;
  renderCustomer(false);
  clearTimeout(searchLoadingTimer);
  searchLoadingTimer=setTimeout(()=>{
    state.searchLoading=false;
    renderCustomer(false);
  },350);
}

function toggleFilters(){
  state.filtersOpen=!state.filtersOpen;
  renderCustomer(false);
}

function setFilter(name, value){
  state.filters[name]=value;
  state.searchLoading=true;
  renderCustomer(false);
  clearTimeout(searchLoadingTimer);
  searchLoadingTimer=setTimeout(()=>{
    state.searchLoading=false;
    renderCustomer(false);
  },350);
}

function clearFilters(){
  state.filters={dietary:'All', maxDistance:'Any'};
  state.searchLoading=true;
  renderCustomer(false);
  clearTimeout(searchLoadingTimer);
  searchLoadingTimer=setTimeout(()=>{
    state.searchLoading=false;
    renderCustomer(false);
  },350);
}

let snackbarTimer;

function toggleFavorite(id){
  state.favorites[id]=!state.favorites[id];
  renderCustomer(false);
  showSnackbar(state.favorites[id]?'Added to favorites':'Removed from favorites');
}

function showSnackbar(message){
  const snackbar=document.getElementById('snackbar');
  if(!snackbar) return;
  snackbar.textContent=message;
  snackbar.classList.add('show');
  clearTimeout(snackbarTimer);
  snackbarTimer=setTimeout(()=>snackbar.classList.remove('show'),2200);
}

function startPayment(){
  state.orderData={
    orderId:'SFR-88213',
    items:cartItems().map(({food,qty})=>({name:food.name,qty,price:food.price})),
    total:Math.max(cartTotal()-(state.couponApplied?20:0)-(state.pointsApplied?15:0)+5,0),
    pickup:'Today, 18:30–19:30',
    location:'Golden Wok Kitchen'
  };
  go('payment');
}

function renderOrderQr(){
  const target=document.getElementById('order-qr');
  if(!target || !state.orderData || typeof QRCode==='undefined' || target.childElementCount) return;
  const qrData={o:state.orderData.orderId,i:state.orderData.items.map(item=>({n:item.name,q:item.qty,p:item.price})),t:state.orderData.total,p:'18:30-19:30',l:'Golden Wok Kitchen'};
  new QRCode(target,{text:JSON.stringify(qrData),width:150,height:150,colorDark:'#152018',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.L});
}
