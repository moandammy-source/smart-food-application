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

async function loadDonationData(){
  state.donationLoading=true;
  try{
    const response=await fetch('/api/donations',{cache:'no-store'});
    if(!response.ok) throw new Error('Unable to load donation data.');
    state.donationData=await response.json();
    state.donationError='';
  }catch(error){
    state.donationError=error.message||'Unable to load donation data.';
  }finally{
    state.donationLoading=false;
    renderCustomer(false);
  }
}

async function confirmDonation(foodId){
  const food=(state.donationData?.foods||[]).find(item=>item.id===foodId);
  if(!food?.eligible) return;
  const points=Math.max(5,Math.round(food.price/10));
  if(!window.confirm(`Are you sure you want to donate this food? You will earn ${points} points.`)) return;
  state.donatingFoodId=foodId;
  state.donationError='';
  renderCustomer(false);
  try{
    const response=await fetch('/api/donations',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({foodId})});
    const payload=await response.json();
    if(!response.ok) throw new Error(payload.error||'Donation failed.');
    state.donationData=payload;
    showSnackbar(payload.message);
  }catch(error){
    state.donationError=error.message||'Donation failed.';
  }finally{
    state.donatingFoodId=null;
    renderCustomer(false);
  }
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
    orderId:`SFR-${Date.now().toString().slice(-8)}`,
    items:cartItems().map(({food,qty})=>({id:food.id,name:food.name,qty,price:food.price})),
    total:Math.max(cartTotal()-(state.couponApplied?20:0)-(state.pointsApplied?15:0)+5,0),
    pickup:'Today, 18:30–19:30',
    location:'Golden Wok Kitchen'
  };
  state.orderPoints=null;
  go('payment');
}

async function completeOrderPayment(){
  if(state.orderRewardLoading||!state.orderData) return;
  state.orderRewardLoading=true;
  try{
    const response=await fetch('/api/donations',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'order',orderId:state.orderData.orderId})});
    const payload=await response.json();
    if(!response.ok) throw new Error(payload.error||'Unable to apply order points.');
    state.orderPoints=payload.orderReward.pointsEarned;
    state.donationData=payload;
    go('confirmation');
  }catch(error){
    state.orderPoints=0;
    state.donationError=error.message||'Unable to apply order points.';
    go('confirmation');
  }finally{
    state.orderRewardLoading=false;
  }
}

function renderOrderQr(){
  const target=document.getElementById('order-qr');
  if(!target || !state.orderData || typeof QRCode==='undefined' || target.childElementCount) return;
  const qrData={o:state.orderData.orderId,i:state.orderData.items.map(item=>({n:item.name,q:item.qty,p:item.price})),t:state.orderData.total,p:'18:30-19:30',l:'Golden Wok Kitchen'};
  new QRCode(target,{text:JSON.stringify(qrData),width:150,height:150,colorDark:'#152018',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.L});
}
