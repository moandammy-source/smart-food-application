function changeQty(id, delta, forceAddIfZero){
  const cur = state.cart[id]||0;
  let next = cur+delta;
  if(forceAddIfZero && cur===0) next = 1;
  if(next<0) next=0;
  state.cart[id]=next;
  if(next===0) delete state.cart[id];
  if(state.screen==='foodDetail'){
    const counter=document.getElementById(`food-qty-${id}`);
    const action=document.getElementById(`food-cart-action-${id}`);
    if(counter) counter.textContent=String(next);
    if(action) action.textContent=next?'Go to cart':'Add to cart';
    return;
  }
  if(state.screen==='cart'){
    if(next===0){
      renderCustomer(false);
      return;
    }
    const counter=document.getElementById(`cart-qty-${id}`);
    if(counter) counter.textContent=String(next);
    updateCartTotals();
    return;
  }
  renderCustomer(false);
}

function updateCartTotals(){
  const original=cartOriginal();
  const totalBeforeDiscount=cartTotal();
  const discount=original-totalBeforeDiscount;
  const couponDisc=state.couponApplied?20:0;
  const pointsDisc=state.pointsApplied?15:0;
  const fee=cartItems().length?5:0;
  const total=Math.max(totalBeforeDiscount-couponDisc-pointsDisc+fee,0);
  const values={
    'cart-original-total':money(original),
    'cart-discount-total':`-${money(discount)}`,
    'cart-fee-total':money(fee),
    'cart-total':money(total),
  };
  Object.entries(values).forEach(([id,value])=>{
    const element=document.getElementById(id);
    if(element) element.textContent=value;
  });
}

function toggleCoupon(){
  state.couponApplied=!state.couponApplied;
  renderCustomer(false);
}

function togglePoints(){
  state.pointsApplied=!state.pointsApplied;
  renderCustomer(false);
}

function selectPaymentMethod(method){
  state.paymentMethod=method;
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
  state.confirmFoodId=foodId;
  renderCustomer(false);
}

function cancelDonation(){
  state.confirmFoodId=null;
  renderCustomer(false);
}

async function completeDonation(foodId){
  const food=(state.donationData?.foods||[]).find(item=>item.id===foodId);
  if(!food?.eligible) return;
  state.confirmFoodId=null;
  state.donatingFoodId=foodId;
  state.donationError='';
  showSnackbar('Saving your donation...');
  renderCustomer(false);
  const controller=new AbortController();
  const timeoutId=setTimeout(()=>controller.abort(),8000);
  try{
    const response=await fetch('/api/donations',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({foodId}),signal:controller.signal});
    const payload=await response.json();
    if(!response.ok) throw new Error(payload.error||'Donation failed.');
    state.donationData=payload;
    state.donationSuccessPoints=payload.donations[0]?.pointsEarned||0;
    state.donationSuccessFoodId=foodId;
    showSnackbar(payload.message);
    state.screen='donationSuccess';
    renderCustomer(false);
  }catch(error){
    state.donationError=error.name==='AbortError'?'The donation took too long. Please try again.':(error.message||'Donation failed.');
  }finally{
    clearTimeout(timeoutId);
    state.donatingFoodId=null;
    renderCustomer(false);
  }
}

function dismissDonationSuccess(){
  state.donationSuccessPoints=null;
  state.donationSuccessFoodId=null;
  state.screen='donate';
  renderCustomer(false);
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
    paymentMethod:state.paymentMethod,
    pickup:'Today, 18:30–19:30',
    location:'Golden Wok Kitchen',
    pickupLocation:state.pickupLocationConfirmed?state.pickupLocation:null
  };
  state.orderPoints=null;
  go('payment');
}

function escapeHtml(value){
  return String(value||'').replace(/[&<>'"]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
}

function formatCoordinates(lat,lng){
  return `${Number(lat).toFixed(5)}, ${Number(lng).toFixed(5)}`;
}

let pickupMap;
let pickupMarker;
let pickupAddressRequest=0;
let foodSearchMap;

function initPickupMap(){
  const target=document.getElementById('pickup-map');
  if(!target || typeof L==='undefined') return;
  if(pickupMap){ pickupMap.remove(); pickupMap=null; pickupMarker=null; }
  const saved=state.pickupLocation;
  const center=saved?[saved.lat,saved.lng]:[13.7563,100.5018];
  pickupMap=L.map(target,{scrollWheelZoom:false}).setView(center,saved?16:13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(pickupMap);
  if(saved) pickupMarker=L.marker(center).addTo(pickupMap);
  pickupMap.on('click',event=>selectPickupLocation(event.latlng.lat,event.latlng.lng));
  setTimeout(()=>pickupMap.invalidateSize(),0);
}

function initFoodSearchMap(){
  const target=document.getElementById('food-search-map');
  if(!target || typeof L==='undefined') return;
  if(foodSearchMap){ foodSearchMap.remove(); foodSearchMap=null; }
  foodSearchMap=L.map(target,{scrollWheelZoom:false}).setView([13.7563,100.5018],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(foodSearchMap);
  foods.forEach((food,index)=>{
    const lat=13.7563+((index%3)-1)*0.012+(Math.floor(index/3)*0.004);
    const lng=100.5018+((index%4)-1.5)*0.014;
    L.marker([lat,lng]).addTo(foodSearchMap).bindPopup(`<strong>${escapeHtml(food.name)}</strong><br>${escapeHtml(food.store)}<br><b>${money(food.price)}</b><br><button class="map-food-link" onclick="go('foodDetail',{selectedFoodId:${food.id}})">View food</button>`);
  });
  setTimeout(()=>foodSearchMap.invalidateSize(),0);
}

async function selectPickupLocation(lat,lng){
  if(!pickupMap) return;
  if(pickupMarker) pickupMarker.setLatLng([lat,lng]);
  else pickupMarker=L.marker([lat,lng]).addTo(pickupMap);
  state.pickupLocation={lat,lng,address:'Loading address...'};
  state.pickupLocationConfirmed=false;
  renderCustomer(false);
  const requestId=++pickupAddressRequest;
  try{
    const response=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`);
    const data=await response.json();
    if(requestId===pickupAddressRequest) state.pickupLocation={lat,lng,address:data.display_name||formatCoordinates(lat,lng)};
  }catch(error){
    if(requestId===pickupAddressRequest) state.pickupLocation={lat,lng,address:formatCoordinates(lat,lng)};
  }
  if(requestId===pickupAddressRequest) renderCustomer(false);
}

function useCurrentLocation(){
  if(!navigator.geolocation){ showSnackbar('Location is not available in this browser.'); return; }
  showSnackbar('Requesting your location...');
  navigator.geolocation.getCurrentPosition(
    position=>{ const {latitude,longitude}=position.coords; if(pickupMap) pickupMap.setView([latitude,longitude],16); selectPickupLocation(latitude,longitude); },
    ()=>showSnackbar('We could not access your location. Choose a point on the map instead.'),
    {enableHighAccuracy:true,timeout:10000}
  );
}

function confirmPickupLocation(){
  if(!state.pickupLocation || state.pickupLocation.address==='Loading address...') return;
  savePickupLocation(state.pickupLocation);
  showSnackbar('Pick-up location saved.');
  renderCustomer(false);
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
