/* Customer pages and shared customer cards */
function screenSplash(){
  return `
  <div style="height:742px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(160deg,var(--forest) 0%, #1F6E4A 55%, var(--mint) 130%); color:#fff; text-align:center; padding:0 40px;">
    <div style="width:78px;height:78px;border-radius:50%;background:#fff;overflow:hidden; display:flex;align-items:center;justify-content:center; margin-bottom:22px;">
      <img src="/logo.png" alt="" style="width:100%;height:100%;object-fit:contain;display:block;" />
    </div>
    <div class="display" style="font-size:26px; font-weight:800; letter-spacing:-.02em;">Smart Food Rescue</div>
    <div style="margin-top:12px; font-size:14.5px; line-height:1.5; opacity:.92;">Save Food. Save Money.<br>Save Our Future.</div>
    <div style="margin-top:34px; display:flex; gap:6px;">
      <span style="width:22px;height:5px;border-radius:3px;background:#fff;"></span>
      <span style="width:5px;height:5px;border-radius:3px;background:rgba(255,255,255,0.4);"></span>
      <span style="width:5px;height:5px;border-radius:3px;background:rgba(255,255,255,0.4);"></span>
    </div>
    <button class="btn btn-primary" style="margin-top:38px; background:#fff; color:var(--forest); width:220px;" onclick="go('login')">Get started</button>
  </div>`;
}

/* ---- Login ---- */
function screenLogin(){
  return `
  <div class="px" style="padding-top:30px;">
    <div style="width:52px;height:52px;border-radius:15px;background:var(--mint-light); display:flex;align-items:center;justify-content:center; margin-bottom:18px;">${icon('leaf',26,'var(--forest)')}</div>
    <h2 style="font-size:22px;">Welcome back</h2>
    <p style="color:var(--ink-soft); font-size:13.5px; margin-top:6px;">Log in to find surplus food nearby.</p>
    <div style="margin-top:24px; display:flex; flex-direction:column; gap:14px;">
      <div><label>Email or phone number</label><input placeholder="you@email.com"></div>
      <div><label>Password</label><input type="password" placeholder="••••••••"></div>
    </div>
    <div style="text-align:right; margin-top:8px;"><a class="link" style="font-size:12.5px;">Forgot password?</a></div>
    <button class="btn btn-primary" style="margin-top:20px;" onclick="go('home')">Log in</button>
    <div style="display:flex; align-items:center; gap:10px; margin:20px 0; color:var(--ink-soft); font-size:12px;">
      <div style="flex:1;height:1px;background:var(--line);"></div>OR<div style="flex:1;height:1px;background:var(--line);"></div>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px;">
      <button class="btn btn-ghost" onclick="go('home')">Continue with Google</button>
      <button class="btn btn-ghost" onclick="go('home')">Continue with Apple</button>
    </div>
    <p style="text-align:center; font-size:12.5px; color:var(--ink-soft); margin-top:22px;">New here? <a class="link" onclick="go('home')">Create an account</a></p>
  </div>`;
}

/* ---- Home ---- */
function screenHome(){
  const nearby = foods.slice().sort((a,b)=>a.distance-b.distance).slice(0,3);
  const endingSoon = foods.filter(f=>f.best.includes('Today')).slice(0,3);
  return `
  <div style="padding:16px 20px 10px; display:flex; align-items:center; justify-content:space-between;">
    <div>
      <div style="display:flex; align-items:center; gap:5px; color:var(--ink-soft); font-size:12px; font-weight:600;">${icon('map',14,'var(--forest)')} Sukhumvit, Bangkok</div>
      <div style="font-size:19px; font-weight:700; font-family:'Sora'; margin-top:2px;">Hi Nara 👋</div>
    </div>
    <button onclick="go('profile')" style="width:40px;height:40px;border-radius:12px;background:var(--mint-light); border:none; display:flex; align-items:center; justify-content:center; position:relative;">
      ${icon('bell',19,'var(--forest)')}
      <span style="position:absolute; top:-3px; right:-3px; width:8px; height:8px; border-radius:50%; background:var(--coral); border:2px solid var(--cream);"></span>
    </button>
  </div>
  <div class="px" style="margin-top:6px;">
    <div onclick="go('search')" class="clickable" style="display:flex; align-items:center; gap:10px; background:#fff; border:1px solid var(--line); border-radius:14px; padding:12px 14px;">
      ${icon('search',18,'var(--ink-soft)')}<span style="color:var(--ink-soft); font-size:13.5px;">Search food, store, category…</span>
    </div>
  </div>

  <div class="px" style="margin-top:20px; display:flex; align-items:center; justify-content:space-between;">
    <h3 style="font-size:14.5px;">Browse by category</h3>
  </div>
  <div class="px" style="display:grid; grid-template-columns:repeat(6,1fr); gap:8px; margin-top:10px;">
    ${categories.map(c=>`<div class="tag-cat" onclick="go('search',{activeCat:'${c.name}'})"><span style="font-size:18px;">${c.emoji}</span>${c.name}</div>`).join('')}
  </div>

  <div class="px" style="margin-top:22px; display:flex; align-items:center; justify-content:space-between;">
    <h3 style="font-size:14.5px;">Ending soon</h3><a class="link" style="font-size:12px;" onclick="go('search')">See all</a>
  </div>
  <div style="display:flex; gap:12px; overflow-x:auto; padding:10px 20px 4px;">
    ${endingSoon.map(f=>foodCardSm(f)).join('')}
  </div>

  <div class="px" style="margin-top:8px; display:flex; align-items:center; justify-content:space-between;">
    <h3 style="font-size:14.5px;">Recommended for you</h3><span class="pill pill-sky">${icon('bolt',11,'var(--sky)')} AI picks</span>
  </div>
  <div class="px" style="display:flex; flex-direction:column; gap:12px; margin-top:10px; padding-bottom:24px;">
    ${nearby.map(f=>foodCardLg(f)).join('')}
  </div>
  `;
}
function foodCardSm(f){
  return `<div class="clickable" style="min-width:150px;" onclick="go('foodDetail',{selectedFoodId:${f.id}})">
    <div class="card" style="overflow:hidden;">
      <div class="foodthumb" style="background:${f.grad};">${f.emoji}
        <span class="pill pill-coral" style="position:absolute; top:8px; left:8px;">${icon('clock',11,'var(--coral)')} ends ${f.pickup.split('–')[1]}</span>
      </div>
      <div style="padding:10px 11px 12px;">
        <div style="font-size:12.5px; font-weight:700; line-height:1.25;">${f.name}</div>
        <div style="font-size:11px; color:var(--ink-soft); margin-top:3px;">${f.store}</div>
        <div style="display:flex; align-items:baseline; gap:6px; margin-top:6px;">
          <span style="font-weight:800; color:var(--forest); font-size:14px;">${money(f.price)}</span>
          <span style="font-size:11px; color:var(--ink-soft); text-decoration:line-through;">${money(f.original)}</span>
        </div>
      </div>
    </div>
  </div>`;
}
function foodCardLg(f){
  const disc = Math.round((1-f.price/f.original)*100);
  return `<div class="card clickable" style="display:flex; gap:12px; padding:10px; align-items:center;" onclick="go('foodDetail',{selectedFoodId:${f.id}})">
    <div class="foodthumb" style="background:${f.grad}; width:78px; height:78px; border-radius:14px; flex:0 0 auto; font-size:30px;">${f.emoji}</div>
    <div style="flex:1; min-width:0;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
        <div style="font-size:13.5px; font-weight:700; line-height:1.25;">${f.name}</div>
        <span class="pill pill-mint" style="flex:0 0 auto;">-${disc}%</span>
      </div>
      <div style="font-size:11.5px; color:var(--ink-soft); margin-top:2px;">${f.store} · ${f.distance} km</div>
      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
        <span style="font-weight:800; color:var(--forest); font-size:14.5px;">${money(f.price)} <span style="font-size:11px; color:var(--ink-soft); font-weight:500; text-decoration:line-through;">${money(f.original)}</span></span>
        <span style="font-size:11px; color:var(--ink-soft); display:flex; align-items:center; gap:3px;">${icon('star',12,'var(--amber)','var(--amber)')} ${f.rating}</span>
      </div>
    </div>
  </div>`;
}

/* ---- Search / filter / map ---- */
function screenSearch(){
  const view = state.mapView ? 'map':'list';
  let list = foods.filter(f=> state.activeCat==='All' || !state.activeCat || f.cat===state.activeCat);
  if(state.searchQuery) list = list.filter(f=>f.name.toLowerCase().includes(state.searchQuery.toLowerCase())||f.store.toLowerCase().includes(state.searchQuery.toLowerCase()));
  if(state.filters.maxDistance!=='Any') list = list.filter(f=>f.distance<=Number(state.filters.maxDistance));
  if(state.filters.dietary==='Vegetarian') list = list.filter(f=>!f.name.toLowerCase().includes('chicken'));
  if(state.filters.dietary==='No nuts') list = list.filter(f=>!f.allergens.includes('Nuts'));
  const filterCount = (state.filters.dietary!=='All'?1:0) + (state.filters.maxDistance!=='Any'?1:0);
  return `
  <div class="px" style="padding-top:16px;">
    <div style="display:flex; align-items:center; gap:10px; background:#fff; border:1px solid var(--line); border-radius:14px; padding:11px 14px;">
      ${icon('search',17,'var(--ink-soft)')}<input oninput="handleSearchInput(this.value)" value="${state.searchDraft||state.searchQuery||''}" placeholder="Search food, store, category…" style="border:none; padding:0; font-size:13.5px;">
    </div>
    <div style="display:flex; gap:8px; margin-top:12px; overflow-x:auto; padding-bottom:2px;">
      ${['All',...categories.map(c=>c.name)].map(c=>`<button class="btn-sm" style="border:1px solid var(--line); background:${state.activeCat===c?'var(--forest)':'#fff'}; color:${state.activeCat===c?'#fff':'var(--ink)'}; white-space:nowrap;" onclick="setCategory('${c}')">${c}</button>`).join('')}
    </div>
    <div style="position:relative; display:flex; gap:8px; margin-top:10px;">
      <button class="btn-sm" style="border:1px solid ${filterCount?'var(--mint)':'var(--line)'}; background:${filterCount?'var(--mint-light)':'#fff'}; color:${filterCount?'var(--forest)':'var(--ink)'}; display:flex; gap:5px;" onclick="toggleFilters()">${icon('filter',13,filterCount?'var(--forest)':'var(--ink-soft)')} Filters${filterCount?` · ${filterCount}`:''}</button>
      <button class="btn-sm" style="border:1px solid var(--line); background:#fff;">Nearest</button>
      <div style="flex:1;"></div>
      <button class="btn-sm" style="border:1px solid var(--line); background:${view==='list'?'var(--forest)':'#fff'}; color:${view==='list'?'#fff':'var(--ink)'};" onclick="state.mapView=false; renderCustomer();">List</button>
      <button class="btn-sm" style="border:1px solid var(--line); background:${view==='map'?'var(--forest)':'#fff'}; color:${view==='map'?'#fff':'var(--ink)'};" onclick="state.mapView=true; renderCustomer();">Map</button>
    </div>
    ${state.filtersOpen?`<div class="filter-sheet-backdrop" onclick="toggleFilters()"><div class="filter-sheet" onclick="event.stopPropagation()">
      <div style="display:flex; justify-content:space-between; align-items:center;"><strong style="font-size:15px;">Filter food</strong><button onclick="toggleFilters()" style="border:none;background:none;font-size:18px;cursor:pointer;color:var(--ink-soft);">×</button></div>
      <div style="font-size:11px;color:var(--ink-soft);font-weight:700;margin-top:12px;">Dietary</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px;">${['All','Vegetarian','No nuts'].map(v=>`<button class="filter-option ${state.filters.dietary===v?'active':''}" onclick="setFilter('dietary','${v}')">${v}</button>`).join('')}</div>
      <div style="font-size:11px;color:var(--ink-soft);font-weight:700;margin-top:12px;">Distance</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px;">${[['Any','Any distance'],['1','Within 1 km'],['2','Within 2 km']].map(([v,l])=>`<button class="filter-option ${state.filters.maxDistance===v?'active':''}" onclick="setFilter('maxDistance','${v}')">${l}</button>`).join('')}</div>
      ${filterCount?`<button class="btn btn-ghost btn-sm" style="margin-top:12px;" onclick="clearFilters()">Clear filters</button>`:''}
    </div></div>`:''}
  </div>
  ${state.searchLoading ? searchSkeleton() : view==='map' ? searchMap(list) : `<div class="px" style="display:flex; flex-direction:column; gap:12px; margin-top:14px; padding-bottom:20px;">
    <div style="font-size:12px; color:var(--ink-soft);">${list.length} results near you</div>
    ${list.map(f=>foodCardLg(f)).join('') || `<div style="text-align:center; padding:40px 0; color:var(--ink-soft); font-size:13px;">No matches — try another search.</div>`}
  </div>`}
  `;
}
function searchSkeleton(){
  return `<div class="px" style="display:flex; flex-direction:column; gap:12px; margin-top:14px; padding-bottom:20px;">
    <div class="skeleton" style="width:110px;height:14px;"></div>
    ${[1,2,3].map(()=>`<div class="card" style="display:flex;gap:12px;padding:10px;align-items:center;"><div class="skeleton" style="width:78px;height:78px;flex:0 0 auto;"></div><div style="flex:1;"><div class="skeleton" style="width:72%;height:15px;"></div><div class="skeleton" style="width:48%;height:11px;margin-top:9px;"></div><div class="skeleton" style="width:35%;height:13px;margin-top:12px;"></div></div></div>`).join('')}
  </div>`;
}
function searchMap(list){
  const pins = list.map((f,i)=>{
    const x = 40 + (i*57)%300, y = 60+((i*97)%400);
    return `<div class="clickable" onclick="go('foodDetail',{selectedFoodId:${f.id}})" style="position:absolute; left:${x}px; top:${y}px; display:flex; flex-direction:column; align-items:center;">
      <div style="background:var(--forest); color:#fff; font-size:11px; font-weight:700; padding:4px 8px; border-radius:8px; white-space:nowrap; box-shadow:var(--shadow);">${money(f.price)}</div>
      <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid var(--forest);"></div>
    </div>`;
  }).join('');
  return `<div style="position:relative; height:470px; margin:14px 20px 0; border-radius:16px; overflow:hidden; background:
    linear-gradient(180deg,#DCEAE0,#CFE3D6);
    background-image:
      repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 40px),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 40px);
    border:1px solid var(--line);">
    <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:16px; height:16px; border-radius:50%; background:var(--sky); border:3px solid #fff; box-shadow:0 0 0 6px rgba(44,123,168,0.25);"></div>
    ${pins}
    <div style="position:absolute; bottom:10px; left:10px; background:#fff; padding:6px 10px; border-radius:9px; font-size:10.5px; color:var(--ink-soft); box-shadow:var(--shadow);">Illustrative map view</div>
  </div>`;
}

/* ---- Food detail ---- */
function screenFoodDetail(){
  const f = foods.find(x=>x.id===state.selectedFoodId) || foods[0];
  const disc = Math.round((1-f.price/f.original)*100);
  const inCart = state.cart[f.id]||0;
  return `
  <div class="foodthumb" style="height:210px; border-radius:0; background:${f.grad}; font-size:72px;">
    ${f.emoji}
    <button onclick="go('search')" style="position:absolute; top:16px; left:16px; background:rgba(255,255,255,0.85); border:none; width:34px;height:34px; border-radius:10px; display:flex;align-items:center;justify-content:center;">${icon('left',18)}</button>
    <button onclick="toggleFavorite(${f.id})" aria-label="${state.favorites[f.id]?'Remove from favorites':'Add to favorites'}" style="position:absolute; top:16px; right:16px; background:rgba(255,255,255,0.85); border:none; width:34px;height:34px; border-radius:10px; display:flex;align-items:center;justify-content:center;">${icon('heart',17,state.favorites[f.id]?'var(--coral)':'var(--ink-soft)',state.favorites[f.id]?'var(--coral)':'none')}</button>
    <span class="pill pill-mint" style="position:absolute; bottom:12px; left:16px;">-${disc}% off</span>
  </div>
  <div class="px" style="margin-top:16px;">
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
      <h2 style="font-size:18px; line-height:1.25;">${f.name}</h2>
    </div>
    <div style="display:flex; align-items:center; gap:6px; margin-top:6px; font-size:12.5px; color:var(--ink-soft);">
      ${f.store} · ${icon('star',13,'var(--amber)','var(--amber)')} ${f.storeRating} (${f.reviews}) · ${f.distance} km
    </div>
    <div style="display:flex; align-items:baseline; gap:8px; margin-top:12px;">
      <span style="font-size:24px; font-weight:800; color:var(--forest); font-family:'Sora';">${money(f.price)}</span>
      <span style="font-size:14px; color:var(--ink-soft); text-decoration:line-through;">${money(f.original)}</span>
      <span style="font-size:12px; color:var(--ink-soft);">· ${f.qty} left</span>
    </div>

    <div class="card" style="margin-top:16px; padding:14px; display:flex; flex-direction:column; gap:10px;">
      <row-item icon="clock" label="Pickup window" value="${f.pickup}, today"></row-item>
      <row-item icon="tag" label="Prepared" value="${f.prep}"></row-item>
      <row-item icon="leaf" label="Best before" value="${f.best}"></row-item>
      <row-item icon="map" label="Pickup location" value="${f.store}, ${f.distance} km away"></row-item>
    </div>

    <h3 style="font-size:13.5px; margin-top:18px;">Ingredients</h3>
    <p style="font-size:12.5px; color:var(--ink-soft); margin-top:6px; line-height:1.5;">${f.ingredients}</p>

    <h3 style="font-size:13.5px; margin-top:14px;">Allergen information</h3>
    <div style="display:flex; gap:6px; margin-top:7px; flex-wrap:wrap;">
      ${f.allergens.length? f.allergens.map(a=>`<span class="pill pill-coral">${a}</span>`).join('') : `<span class="pill pill-mint">No major allergens declared</span>`}
    </div>

    <h3 style="font-size:13.5px; margin-top:14px;">Food safety</h3>
    <p style="font-size:12.5px; color:var(--ink-soft); margin-top:6px; line-height:1.5;">${f.safety}</p>

    <div style="height:110px;"></div>
  </div>
  <div class="screen-actionbar" style="display:flex; gap:10px; align-items:center;">
    <div style="display:flex; align-items:center; border:1.5px solid var(--line); border-radius:12px;">
      <button onclick="changeQty(${f.id},-1)" style="border:none;background:none;width:36px;height:40px;font-size:16px;">−</button>
      <span style="width:22px; text-align:center; font-weight:700; font-size:13.5px;">${inCart}</span>
      <button onclick="changeQty(${f.id},1)" style="border:none;background:none;width:36px;height:40px;font-size:16px;">+</button>
    </div>
    <button class="btn btn-primary" style="flex:1;" onclick="changeQty(${f.id}, ${inCart?0:1}, true); go('cart')">${inCart? 'Go to cart' : 'Add to cart'}</button>
  </div>
  `;
}
// tiny custom element renderer for row-item tags used above
document.addEventListener('DOMContentLoaded', ()=>{});
function expandRowItems(html){ return html; }

/* ---- Cart ---- */
function screenCart(){
  const items = cartItems();
  const disc = cartOriginal()-cartTotal();
  const couponDisc = state.couponApplied? 20:0;
  const pointsDisc = state.pointsApplied? 15:0;
  const fee = items.length? 5:0;
  const total = Math.max(cartTotal()-couponDisc-pointsDisc+fee,0);
  return `
  ${header('Your cart', "go('home')")}
  <div class="px" style="padding-bottom:200px;">
    ${items.length===0? `<div style="text-align:center; padding:60px 0; color:var(--ink-soft);">${icon('box',34,'var(--ink-soft)')}<div style="margin-top:10px; font-size:13px;">Your cart is empty.</div><button class="btn btn-mint btn-sm" style="margin-top:14px; width:auto; padding:10px 20px;" onclick="go('home')">Browse food</button></div>` :
    items.map(({food,qty})=>`
      <div class="card" style="display:flex; gap:12px; padding:10px; align-items:center; margin-top:12px;">
        <div class="foodthumb" style="background:${food.grad}; width:60px;height:60px;border-radius:12px; font-size:24px;">${food.emoji}</div>
        <div style="flex:1;">
          <div style="font-size:13px; font-weight:700;">${food.name}</div>
          <div style="font-size:11.5px; color:var(--ink-soft); margin-top:2px;">${food.store}</div>
          <div style="font-weight:800; color:var(--forest); font-size:13px; margin-top:5px;">${money(food.price)}</div>
        </div>
        <div style="display:flex; align-items:center; border:1.5px solid var(--line); border-radius:10px;">
          <button onclick="changeQty(${food.id},-1)" style="border:none;background:none;width:28px;height:32px;">−</button>
          <span style="width:18px; text-align:center; font-size:12.5px; font-weight:700;">${qty}</span>
          <button onclick="changeQty(${food.id},1)" style="border:none;background:none;width:28px;height:32px;">+</button>
        </div>
      </div>`).join('')}

    ${items.length>0? `
    <div class="card" style="margin-top:18px; padding:14px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600;">${icon('tag',16,'var(--forest)')} Apply coupon</div>
        <button class="btn-sm" style="border:1px solid var(--line); background:${state.couponApplied?'var(--mint-light)':'#fff'}; color:${state.couponApplied?'var(--forest)':'var(--ink)'};" onclick="toggleCoupon()">${state.couponApplied? 'Applied ✓':'SAVE20'}</button>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
        <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600;">${icon('gift',16,'var(--forest)')} Use 150 reward points</div>
        <button class="btn-sm" style="border:1px solid var(--line); background:${state.pointsApplied?'var(--mint-light)':'#fff'}; color:${state.pointsApplied?'var(--forest)':'var(--ink)'};" onclick="togglePoints()">${state.pointsApplied? 'Applied ✓':'Use points'}</button>
      </div>
    </div>

    <div class="card" style="margin-top:14px; padding:14px; display:flex; flex-direction:column; gap:8px; font-size:12.5px;">
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--ink-soft);">Original price</span><span>${money(cartOriginal())}</span></div>
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--ink-soft);">Rescue discount</span><span style="color:var(--forest);">-${money(disc)}</span></div>
      ${state.couponApplied? `<div style="display:flex; justify-content:space-between;"><span style="color:var(--ink-soft);">Coupon SAVE20</span><span style="color:var(--forest);">-${money(couponDisc)}</span></div>`:''}
      ${state.pointsApplied? `<div style="display:flex; justify-content:space-between;"><span style="color:var(--ink-soft);">Reward points</span><span style="color:var(--forest);">-${money(pointsDisc)}</span></div>`:''}
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--ink-soft);">Service fee</span><span>${money(fee)}</span></div>
      <div style="border-top:1px dashed var(--line); margin-top:4px; padding-top:8px; display:flex; justify-content:space-between; font-weight:800; font-size:14px;"><span>Total</span><span>${money(total)}</span></div>
    </div>` : ''}
  </div>
  ${items.length>0? `<div class="screen-actionbar">
    <button class="btn btn-primary" onclick="go('checkout')">Checkout · ${money(total)}</button>
  </div>`:''}
  `;
}

/* ---- Checkout ---- */
function screenCheckout(){
  return `
  ${header('Checkout', "go('cart')")}
  <div class="px">
    <label style="margin-top:6px;">Fulfilment</label>
    <div style="display:flex; gap:10px;">
      <div class="card clickable" style="flex:1; padding:12px; border-color:var(--forest); border-width:2px; display:flex; align-items:center; gap:8px;">
        ${icon('box',18,'var(--forest)')}<div style="font-size:12.5px; font-weight:700;">Self pickup</div>
      </div>
      <div class="card clickable" style="flex:1; padding:12px; opacity:.5; display:flex; align-items:center; gap:8px;">
        ${icon('map',18)}<div style="font-size:12.5px; font-weight:700;">Delivery<br><span style="font-weight:400; font-size:10.5px;">Not in this area</span></div>
      </div>
    </div>

    <label style="margin-top:18px;">Pickup time</label>
    <div class="card" style="padding:12px; display:flex; align-items:center; gap:8px;">
      ${icon('clock',17,'var(--forest)')}<span style="font-size:13px; font-weight:600;">Today, 18:30 – 19:30</span>
    </div>

    <label style="margin-top:18px;">Payment method</label>
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${['QR PromptPay','Credit / Debit card','Mobile banking','In-app wallet · ฿320.00'].map((m,i)=>`
      <div class="card clickable" style="padding:12px 14px; display:flex; align-items:center; gap:10px; ${i===0?'border-color:var(--forest); border-width:2px;':''}">
        <div style="width:16px;height:16px;border-radius:50%; border:2px solid ${i===0?'var(--forest)':'var(--line)'}; display:flex; align-items:center; justify-content:center;">${i===0?'<div style="width:8px;height:8px;border-radius:50%;background:var(--forest);"></div>':''}</div>
        <span style="font-size:13px; font-weight:600;">${m}</span>
      </div>`).join('')}
    </div>

    <div class="card" style="margin-top:18px; padding:14px; display:flex; justify-content:space-between; font-weight:800; font-size:14px;">
      <span>Total due</span><span>${money(Math.max(cartTotal()-(state.couponApplied?20:0)-(state.pointsApplied?15:0)+5,0))}</span>
    </div>
  </div>
  <div class="screen-actionbar">
    <button class="btn btn-primary" onclick="startPayment()">Confirm order</button>
  </div>
  `;
}

/* ---- Payment (processing) ---- */
function screenPayment(){
  setTimeout(()=>{ if(state.screen==='payment'){ completeOrderPayment(); } }, 1400);
  return `
  <div style="height:700px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 40px;">
    <div style="width:64px;height:64px; border:4px solid var(--mint-light); border-top-color:var(--forest); border-radius:50%; animation:spin 0.9s linear infinite;"></div>
    <div style="font-weight:700; margin-top:20px;">Processing payment…</div>
    <div style="color:var(--ink-soft); font-size:12.5px; margin-top:6px;">Confirming with your bank, this only takes a moment.</div>
  </div>
  <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
  `;
}

/* ---- Confirmation ---- */
function screenConfirmation(){
  const items = cartItems();
  const first = items[0]?.food || foods[0];
  return `
  <div class="px" style="padding-top:26px; text-align:center;">
    <div style="width:64px;height:64px; border-radius:50%; background:var(--mint-light); display:flex; align-items:center; justify-content:center; margin:0 auto;">${icon('check',30,'var(--forest)')}</div>
    <h2 style="margin-top:16px; font-size:19px;">Order confirmed</h2>
    <p style="color:var(--ink-soft); font-size:12.5px; margin-top:5px;">Order #SFR-88213 · Payment successful</p>

    <div class="card" style="margin-top:20px; padding:20px; display:flex; flex-direction:column; align-items:center;">
      <div id="order-qr" aria-label="Order pickup QR code"></div>
      <div style="font-size:11.5px; color:var(--ink-soft); margin-top:10px;">Show this QR code at pickup</div>
    </div>

    <div class="card" style="margin-top:14px; padding:14px; text-align:left; display:flex; flex-direction:column; gap:8px;">
      ${items.map(({food,qty})=>`<div style="display:flex; justify-content:space-between; font-size:12.5px;"><span>${qty}× ${food.name}</span><span style="color:var(--ink-soft);">${food.store}</span></div>`).join('') || `<div style="font-size:12.5px;">1× ${first.name}</div>`}
      <div style="border-top:1px dashed var(--line); padding-top:8px; display:flex; align-items:center; gap:7px; font-size:12.5px; color:var(--ink-soft);">${icon('clock',14)} Pickup today, 18:30–19:30 · ${first.store}</div>
    </div>
    <div class="card" style="margin-top:14px; padding:13px; background:${state.orderPoints>0?'var(--mint-light)':'var(--amber-light)'}; color:${state.orderPoints>0?'var(--forest)':'#8A5D18'}; font-size:13px; font-weight:700;">${state.orderPoints>0?`Order received! You earned ${state.orderPoints} points.`:'Order received. Points could not be added yet.'}</div>

    <button class="btn btn-primary" style="margin-top:20px;" onclick="state.cart={}; go('tracking')">Track my order</button>
    <button class="btn btn-ghost" style="margin-top:10px;" onclick="state.cart={}; go('home')">Back to home</button>
  </div>
  `;
}

/* ---- Order tracking ---- */
function screenTracking(){
  const steps = ['Order confirmed','Payment completed','Preparing order','Ready for pickup','Collected','Completed'];
  const activeIdx = 3;
  return `
  ${header('My orders')}
  <div class="px">
    <div class="card" style="padding:16px; margin-top:6px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:700; font-size:13.5px;">Order #SFR-88213</div>
          <div style="font-size:11.5px; color:var(--ink-soft); margin-top:2px;">Golden Wok Kitchen</div>
        </div>
        <span class="pill pill-amber">${icon('clock',11,'#8A5D18')} Ready for pickup</span>
      </div>
      <div style="margin-top:18px; display:flex; flex-direction:column; gap:0;">
        ${steps.map((s,i)=>`
        <div style="display:flex; gap:12px;">
          <div style="display:flex; flex-direction:column; align-items:center;">
            <div style="width:20px;height:20px;border-radius:50%; background:${i<=activeIdx?'var(--forest)':'#fff'}; border:2px solid ${i<=activeIdx?'var(--forest)':'var(--line)'}; display:flex; align-items:center; justify-content:center;">
              ${i<=activeIdx?icon('check',11,'#fff'):''}
            </div>
            ${i<steps.length-1?`<div style="width:2px; flex:1; min-height:22px; background:${i<activeIdx?'var(--forest)':'var(--line)'};"></div>`:''}
          </div>
          <div style="padding-bottom:18px;">
            <div style="font-size:12.5px; font-weight:${i<=activeIdx?'700':'500'}; color:${i<=activeIdx?'var(--ink)':'var(--ink-soft)'};">${s}</div>
            ${i===activeIdx?`<div style="font-size:11px; color:var(--ink-soft); margin-top:2px;">Show your QR code at the counter to collect.</div>`:''}
          </div>
        </div>`).join('')}
      </div>
      <button class="btn btn-mint btn-sm" style="width:100%; margin-top:4px;" onclick="alert('QR code shown at pickup')">${icon('qr',15,'var(--forest)')} View pickup QR</button>
    </div>

    <h3 style="font-size:13px; margin-top:22px;">Past orders</h3>
    <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px; padding-bottom:20px;">
      ${[foods[2],foods[1]].map(f=>`
      <div class="card clickable" style="display:flex; gap:10px; padding:10px; align-items:center;" onclick="go('foodDetail',{selectedFoodId:${f.id}})">
        <div class="foodthumb" style="background:${f.grad}; width:46px;height:46px;border-radius:10px; font-size:20px;">${f.emoji}</div>
        <div style="flex:1;">
          <div style="font-size:12.5px; font-weight:700;">${f.name}</div>
          <div style="font-size:11px; color:var(--ink-soft);">${f.store} · Completed</div>
        </div>
        <span class="pill pill-mint">${icon('check',11,'var(--forest)')}</span>
      </div>`).join('')}
    </div>
  </div>
  `;
}

/* ---- Profile ---- */
function screenProfile(){
  const rows = [
    ['gift','Rewards & points','rewards'],
    ['gift','Donate Food','donate'],
    ['heart','Favorites','favorites'],
    ['tag','Coupons', null],
    ['settings','Account settings', null],
    ['bell','Notification settings', null],
    ['users','Support & help', 'support'],
  ];
  return `
  <div class="px" style="padding-top:22px; display:flex; align-items:center; gap:14px;">
    <div style="width:56px;height:56px;border-radius:16px; background:linear-gradient(135deg,var(--forest),var(--mint)); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-family:'Sora'; font-size:19px;">N</div>
    <div>
      <div style="font-weight:700; font-size:15.5px;">Nara Suthep</div>
      <div style="font-size:12px; color:var(--ink-soft);">nara.s@email.com</div>
      <span class="pill pill-mint" style="margin-top:4px;">Smart Member</span>
    </div>
  </div>
  <div class="px" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:18px;">
    ${[[state.donationData?state.donationData.totalPoints:'—','points'],['12','orders'],['4.9','rating']].map(([v,l])=>`
    <div class="card" style="padding:12px; text-align:center;"><div style="font-weight:800; font-size:16px; color:var(--forest); font-family:'Sora';">${v}</div><div style="font-size:10.5px; color:var(--ink-soft); margin-top:2px;">${l}</div></div>`).join('')}
  </div>
  <div class="px" style="display:flex; flex-direction:column; gap:8px; margin-top:18px; padding-bottom:20px;">
    ${rows.map(([ic,label,target])=>`
    <div class="card clickable" style="padding:13px 14px; display:flex; align-items:center; gap:12px;" onclick="${target?`go('${target}')`:''}">
      <div style="width:32px;height:32px;border-radius:9px; background:var(--mint-light); display:flex; align-items:center; justify-content:center;">${icon(ic,16,'var(--forest)')}</div>
      <span style="flex:1; font-size:13px; font-weight:600;">${label}</span>${icon('chevronR',16,'var(--ink-soft)')}
    </div>`).join('')}
    <div class="card clickable" style="padding:13px 14px; display:flex; align-items:center; gap:12px; margin-top:6px;" onclick="go('login')">
      <div style="width:32px;height:32px;border-radius:9px; background:var(--coral-light); display:flex; align-items:center; justify-content:center;">${icon('logout',16,'var(--coral)')}</div>
      <span style="flex:1; font-size:13px; font-weight:600; color:var(--coral);">Log out</span>
    </div>
  </div>
  `;
}

/* ---- Donate food ---- */
function screenDonate(){
  const data=state.donationData;
  const donatedIds=new Set((data?.donations||[]).map(d=>d.foodId));
  const donationFoods=data?.foods||[];
  return `
  ${header('Donate Food', "go('profile')")}
  <div class="px" style="padding-bottom:20px;">
    <div class="card" style="background:linear-gradient(120deg,var(--forest),#1F6E4A); border:none; padding:16px; color:#fff; margin-top:4px;">
      <div style="font-size:12px; opacity:.85;">Total points</div>
      <div style="font-size:27px; font-weight:800; font-family:'Sora'; margin-top:2px;">${data?data.totalPoints:'—'} pts</div>
      <div style="font-size:11.5px; opacity:.85; margin-top:4px;">Give eligible food to animals and earn points.</div>
    </div>
    ${state.donationError?`<div class="card" style="margin-top:12px; padding:12px; color:var(--coral); background:var(--coral-light); font-size:12px;">${state.donationError}</div>`:''}
    <h3 style="font-size:13.5px; margin-top:18px;">Available food</h3>
    ${state.donationLoading&&!data?`<div style="padding:28px 0; text-align:center; color:var(--ink-soft); font-size:12px;">Loading donation options…</div>`:
      donationFoods.map(food=>{
        const donated=donatedIds.has(food.id)||food.alreadyDonated;
        const eligible=food.eligible&&!donated;
        const points=Math.max(5,Math.round(food.price/10));
        const displayFood=foods.find(f=>f.id===food.id);
        return `<div class="card" style="display:flex; gap:11px; padding:11px; margin-top:10px; align-items:center; opacity:${eligible?'1':'.72'};">
          <div class="foodthumb" style="background:${displayFood?.grad||'var(--mint-light)'}; width:58px;height:58px;border-radius:12px; font-size:25px; flex:0 0 auto;">${displayFood?.emoji||'🍽️'}</div>
          <div style="flex:1; min-width:0;">
            <div style="font-size:12.5px; font-weight:700; line-height:1.25;">${food.name}</div>
            <div style="font-size:11px; color:var(--ink-soft); margin-top:3px;">${eligible?`Eligible · +${points} pts`:(donated?'Already donated':'Below eligibility threshold')}</div>
          </div>
          ${eligible?`<button class="btn btn-primary btn-sm" style="width:auto; padding:9px 12px;" ${state.donatingFoodId===food.id?'disabled':''} onclick="confirmDonation(${food.id})">${state.donatingFoodId===food.id?'…':'Donate'}</button>`:`<span class="pill ${donated?'pill-mint':'pill-amber'}">${donated?'Done':'Not eligible'}</span>`}
        </div>`;
      }).join('')||`<div style="padding:22px 0; color:var(--ink-soft); font-size:12px;">No donation options available.</div>`}
    <h3 style="font-size:13.5px; margin-top:20px;">Donation history</h3>
    ${(data?.donations||[]).map(d=>`<div class="card" style="padding:12px; margin-top:10px;">
      <div style="display:flex; justify-content:space-between; gap:8px;"><strong style="font-size:12.5px;">${d.foodName}</strong><span class="pill pill-mint">${d.status}</span></div>
      <div style="display:flex; justify-content:space-between; gap:8px; margin-top:7px; font-size:11px; color:var(--ink-soft);"><span>Qty ${d.quantity} · ${new Date(d.donationDate).toLocaleDateString()}</span><b style="color:var(--forest);">+${d.pointsEarned} pts</b></div>
    </div>`).join('')||`<div style="padding:12px 0; color:var(--ink-soft); font-size:12px;">Your completed donations will appear here.</div>`}
  </div>`;
}

/* ---- Rewards ---- */
function screenRewards(){
  return `
  ${header('Rewards & points', "go('profile')")}
  <div class="px">
    <div class="card" style="background:linear-gradient(120deg,var(--forest),#1F6E4A); border:none; padding:18px; color:#fff; margin-top:4px;">
      <div style="font-size:12px; opacity:.85;">Available points</div>
      <div style="font-size:28px; font-weight:800; font-family:'Sora'; margin-top:2px;">320 pts</div>
      <div style="font-size:11.5px; opacity:.85; margin-top:4px;">≈ ฿32.00 in redeemable value</div>
    </div>
    <h3 style="font-size:13px; margin-top:18px;">Ways to earn</h3>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:10px;">
      ${[['box','Buy rescued food','+10 pts / order'],['star','Leave a review','+5 pts'],['leaf','Join sustainability campaigns','+15 pts'],['users','Refer a friend','+50 pts']].map(([ic,l,r])=>`
      <div class="card" style="padding:12px 14px; display:flex; align-items:center; gap:12px;">
        <div style="width:32px;height:32px;border-radius:9px; background:var(--mint-light); display:flex; align-items:center; justify-content:center;">${icon(ic,16,'var(--forest)')}</div>
        <span style="flex:1; font-size:12.5px; font-weight:600;">${l}</span><span style="font-size:11.5px; color:var(--forest); font-weight:700;">${r}</span>
      </div>`).join('')}
    </div>
    <h3 style="font-size:13px; margin-top:18px;">Redeem</h3>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:10px; padding-bottom:20px;">
      ${[['฿20 off next order','200 pts'],['Free coffee at Basil & Bean','150 pts'],['Early access to hotel deals','300 pts']].map(([l,c])=>`
      <div class="card" style="padding:12px 14px; display:flex; align-items:center; justify-content:space-between;">
        <span style="font-size:12.5px; font-weight:600;">${l}</span>
        <button class="btn-sm" style="border:1px solid var(--line); background:#fff;">${c}</button>
      </div>`).join('')}
    </div>
  </div>
  `;
}

/* ---- Sustainability dashboard ---- */
function screenSustainability(){
  return `
  ${header('Your impact', "go('profile')")}
  <div class="px">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:6px;">
      <div class="card" style="padding:14px;"><div style="font-size:11px; color:var(--ink-soft);">Food rescued</div><div style="font-size:19px; font-weight:800; font-family:'Sora'; color:var(--forest); margin-top:3px;">18.4 kg</div></div>
      <div class="card" style="padding:14px;"><div style="font-size:11px; color:var(--ink-soft);">Money saved</div><div style="font-size:19px; font-weight:800; font-family:'Sora'; color:var(--forest); margin-top:3px;">฿1,240</div></div>
      <div class="card" style="padding:14px;"><div style="font-size:11px; color:var(--ink-soft);">CO₂e avoided (est.)</div><div style="font-size:19px; font-weight:800; font-family:'Sora'; color:var(--forest); margin-top:3px;">31.2 kg</div></div>
      <div class="card" style="padding:14px;"><div style="font-size:11px; color:var(--ink-soft);">Orders completed</div><div style="font-size:19px; font-weight:800; font-family:'Sora'; color:var(--forest); margin-top:3px;">12</div></div>
    </div>
    <div class="card" style="margin-top:12px; padding:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="font-size:13px; font-weight:700;">Sustainability score</div><span class="pill pill-mint">Great · 82/100</span>
      </div>
      <div style="height:8px; background:var(--line); border-radius:5px; margin-top:10px; overflow:hidden;">
        <div style="height:100%; width:82%; background:linear-gradient(90deg,var(--mint),var(--forest)); border-radius:5px;"></div>
      </div>
      <p style="font-size:11px; color:var(--ink-soft); margin-top:8px; line-height:1.5;">Estimated using average weight per rescued item and standard emission factors for food waste. Figures are approximate and for awareness only.</p>
    </div>
    <div class="card" style="margin-top:12px; padding:16px; margin-bottom:20px;">
      <div style="font-size:13px; font-weight:700;">Contributing to</div>
      <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
        ${['SDG 2 · Zero Hunger','SDG 12 · Responsible Consumption','SDG 13 · Climate Action'].map(s=>`<span class="pill pill-sky">${s}</span>`).join('')}
      </div>
    </div>
  </div>
  `;
}

/* ---- Favorites ---- */
function screenFavorites(){
  const favs = [foods[0], foods[2], foods[5]];
  return `
  ${header('Favorites', "go('profile')")}
  <div class="px" style="display:flex; flex-direction:column; gap:12px; padding-bottom:20px;">
    ${favs.map(f=>foodCardLg(f)).join('')}
  </div>
  `;
}

/* ---- Support ---- */
function screenSupport(){
  const items = ['How do I get a refund?','What happens if I miss my pickup window?','Is the food safe to eat?','How does the QR pickup work?'];
  return `
  ${header('Support', "go('profile')")}
  <div class="px">
    <div style="display:flex; gap:10px; margin-top:6px;">
      <div class="card" style="flex:1; padding:14px; text-align:center;">${icon('users',20,'var(--forest)')}<div style="font-size:12px; font-weight:700; margin-top:6px;">Live chat</div></div>
      <div class="card" style="flex:1; padding:14px; text-align:center;">${icon('receipt',20,'var(--forest)')}<div style="font-size:12px; font-weight:700; margin-top:6px;">Report an issue</div></div>
    </div>
    <h3 style="font-size:13px; margin-top:18px;">FAQ</h3>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:10px; padding-bottom:20px;">
      ${items.map(q=>`<div class="card" style="padding:13px 14px; display:flex; justify-content:space-between; align-items:center;"><span style="font-size:12.5px; font-weight:600;">${q}</span>${icon('chevronR',15,'var(--ink-soft)')}</div>`).join('')}
    </div>
  </div>
  `;
}

/* ============ SELLER SIDE ============ */
