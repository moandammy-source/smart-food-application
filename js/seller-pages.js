/* Seller dashboard pages */
const sellerFoods = [
  {id:1,name:"Roast Chicken Rice Box", qty:6, sold:14, status:"Available", price:69, emoji:"", grad:foods[0].grad},
  {id:2,name:"Basil Fried Rice", qty:0, sold:20, status:"Sold Out", price:59, emoji:"🍚", grad:"linear-gradient(135deg,#F6E7C7,#E7B85C)"},
  {id:3,name:"Green Curry Set", qty:2, sold:9, status:"Low Stock", price:75, emoji:"", grad:"linear-gradient(135deg,#E4F0DC,#B8DFA1)"},
  {id:4,name:"Pad Thai Box", qty:0, sold:11, status:"Expired", price:65, emoji:"", grad:"linear-gradient(135deg,#F6DAC0,#E5A46A)"},
];
const sellerOrders = [
  {id:'SFR-88213', item:'Roast Chicken Rice Box ×1', customer:'Nara S.', status:'Ready for pickup', total:69},
  {id:'SFR-88190', item:'Green Curry Set ×2', customer:'Ploy K.', status:'Paid', total:150},
  {id:'SFR-88155', item:'Basil Fried Rice ×1', customer:'Tan W.', status:'Completed', total:59},
  {id:'SFR-88101', item:'Roast Chicken Rice Box ×3', customer:'Aom P.', status:'Completed', total:207},
];

function renderSeller(){
  const nav = document.getElementById('seller-nav');
  const items = [
    ['dashboard','home','Dashboard'],['upload','plus','Upload food'],['inventory','box','Inventory'],
    ['orders','receipt','Orders'],['scanner','scan','QR scanner'],['analytics','chart','Analytics'],['profile','settings','Business profile'],
  ];
  nav.innerHTML = items.map(([id,ic,label])=>`
    <button class="${state.sellerScreen===id?'active':''}" onclick="goSeller('${id}')">${icon(ic,17,state.sellerScreen===id?'#fff':'rgba(255,255,255,0.72)')}<span>${label}</span></button>`).join('');
  const el = document.getElementById('seller-screen');
  const screens = {
    dashboard: sellerDashboard, upload: sellerUpload, inventory: sellerInventory,
    orders: sellerOrdersScreen, scanner: sellerScanner, analytics: sellerAnalytics, profile: sellerProfile,
  };
  el.innerHTML = `<div class="fade-in" style="padding:26px 30px; overflow-y:auto; height:100%;">${(screens[state.sellerScreen]||sellerDashboard)()}</div>`;
}
function goSeller(s){ state.sellerScreen=s; renderSeller(); }

function sHeader(title, sub){
  return `<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:22px;">
    <div><h2 style="font-size:20px;">${title}</h2>${sub?`<p style="font-size:12.5px; color:var(--ink-soft); margin-top:4px;">${sub}</p>`:''}</div>
  </div>`;
}
function statCard(label,val,ic,trend){
  return `<div class="card" style="padding:16px; flex:1;">
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div style="width:34px;height:34px;border-radius:10px; background:var(--mint-light); display:flex; align-items:center; justify-content:center;">${icon(ic,17,'var(--forest)')}</div>
      ${trend?`<span class="pill pill-mint">${trend}</span>`:''}
    </div>
    <div style="font-size:21px; font-weight:800; font-family:'Sora'; margin-top:12px;">${val}</div>
    <div style="font-size:11.5px; color:var(--ink-soft); margin-top:2px;">${label}</div>
  </div>`;
}

function sellerDashboard(){
  return `
  ${sHeader('Good evening, Golden Wok Kitchen', 'Here\'s how your surplus food is performing today.')}
  <div style="display:flex; gap:14px;">
    ${statCard('Today\'s sales','฿1,840','chart','+18%')}
    ${statCard('Active listings','3','box')}
    ${statCard('Meals rescued (total)','412','leaf','+22 today')}
    ${statCard('Customer rating','4.8','star')}
  </div>
  <div style="display:flex; gap:16px; margin-top:22px; align-items:flex-start;">
    <div class="card" style="flex:1.4; padding:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:14px;">New orders</h3><a class="link" style="font-size:12px;" onclick="goSeller('orders')">View all</a>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; margin-top:12px;">
        ${sellerOrders.slice(0,3).map(o=>orderRow(o)).join('')}
      </div>
    </div>
    <div class="card" style="flex:1; padding:18px;">
      <h3 style="font-size:14px;">Smart pricing suggestion</h3>
      <div style="display:flex; align-items:center; gap:8px; margin-top:10px;"><span class="pill pill-sky">${icon('bolt',11,'var(--sky)')} AI insight</span></div>
      <p style="font-size:12.5px; color:var(--ink-soft); margin-top:10px; line-height:1.55;">Green Curry Set has 2 units left with 1 hour until pickup closes. Demand for this slot is typically low — consider an extra 10% discount to clear stock.</p>
      <button class="btn btn-mint btn-sm" style="margin-top:12px; width:100%;" onclick="alert('Applied additional 10% discount to Green Curry Set')">Apply suggested discount</button>
    </div>
  </div>
  <div class="card" style="margin-top:16px; padding:18px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="font-size:14px;">Today's listings</h3><button class="btn btn-primary btn-sm" style="width:auto;" onclick="goSeller('upload')">${icon('plus',14,'#fff')} Publish food</button>
    </div>
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:14px;">
      ${sellerFoods.map(f=>sellerFoodCard(f)).join('')}
    </div>
  </div>
  `;
}
function orderRow(o){
  const colors = {'Ready for pickup':'pill-amber','Paid':'pill-sky','Completed':'pill-mint','New':'pill-coral'};
  return `<div style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border:1px solid var(--line); border-radius:12px;">
    <div><div style="font-size:12.5px; font-weight:700;">${o.id}</div><div style="font-size:11.5px; color:var(--ink-soft); margin-top:2px;">${o.item} · ${o.customer}</div></div>
    <span class="pill ${colors[o.status]||'pill-sky'}">${o.status}</span>
  </div>`;
}
function sellerFoodCard(f){
  const statusColor = {Available:'pill-mint','Low Stock':'pill-amber','Sold Out':'pill-coral',Expired:'pill-coral'};
  return `<div class="card" style="overflow:hidden;">
    <div class="foodthumb" style="background:${f.grad}; height:74px; border-radius:14px 14px 0 0; font-size:28px;">${f.emoji}</div>
    <div style="padding:10px;">
      <div style="font-size:12px; font-weight:700; line-height:1.25;">${f.name}</div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:7px;">
        <span style="font-size:12px; font-weight:800; color:var(--forest);">${money(f.price)}</span>
        <span class="pill ${statusColor[f.status]}" style="font-size:10px;">${f.status}</span>
      </div>
      <div style="font-size:10.5px; color:var(--ink-soft); margin-top:5px;">${f.qty} left · ${f.sold} sold</div>
    </div>
  </div>`;
}

function sellerUpload(){
  return `
  ${sHeader('Upload surplus food','List today\'s surplus with clear, honest information — no mystery bags.')}
  <div style="display:flex; gap:18px; align-items:flex-start;">
    <div class="card" style="flex:1; padding:20px;">
      <label>Food photo</label>
      <div style="height:130px; border:2px dashed var(--line); border-radius:14px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; color:var(--ink-soft); margin-bottom:16px;">
        ${icon('camera',24,'var(--ink-soft)')}<span style="font-size:11.5px;">Upload photo or choose an illustration</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div><label>Food name</label><input placeholder="e.g. Roast Chicken Rice Box"></div>
        <div><label>Category</label><select><option>Meals</option><option>Bakery</option><option>Café</option><option>Grocery</option><option>Hotel</option><option>Healthy Food</option></select></div>
        <div><label>Original price (฿)</label><input placeholder="180"></div>
        <div><label>Discounted price (฿)</label><input placeholder="69"></div>
        <div><label>Quantity available</label><input placeholder="6"></div>
        <div><label>Pickup time window</label><input placeholder="18:30 – 19:30"></div>
      </div>
      <div style="margin-top:12px;"><label>Description</label><input placeholder="Short description customers will see"></div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
        <div><label>Ingredients</label><input placeholder="List main ingredients"></div>
        <div><label>Allergens</label><input placeholder="e.g. Gluten, Soy, Dairy"></div>
        <div><label>Prepared at</label><input placeholder="Today, 14:00"></div>
        <div><label>Best before / use by</label><input placeholder="Today, 21:00"></div>
      </div>
      <button class="btn btn-primary" style="margin-top:18px; width:auto; padding:13px 28px;" onclick="alert('Published! Customers nearby can now see this listing.')">Publish food</button>
    </div>
    <div class="card" style="width:270px; padding:16px;">
      <div style="font-size:12px; font-weight:700; color:var(--ink-soft); margin-bottom:10px;">LIVE PREVIEW</div>
      ${foodCardLg({id:99,name:"Roast Chicken Rice Box",store:"Golden Wok Kitchen",grad:foods[0].grad,emoji:"",original:180,price:69,distance:0.6,rating:4.8})}
      <p style="font-size:11px; color:var(--ink-soft); margin-top:12px; line-height:1.5;">This is exactly how the listing will appear to customers — full details, no surprises, so they know exactly what they're buying.</p>
    </div>
  </div>
  `;
}

function sellerInventory(){
  return `
  ${sHeader('Inventory','Live status of every listing.')}
  <table style="width:100%; border-collapse:collapse;">
    <thead><tr style="text-align:left; font-size:11.5px; color:var(--ink-soft);">
      <th style="padding:8px 10px;">Item</th><th>Available</th><th>Sold</th><th>Status</th><th>Price</th><th></th>
    </tr></thead>
    <tbody>
    ${sellerFoods.map(f=>`
      <tr style="background:#fff;">
        <td style="padding:12px 10px; border-radius:12px 0 0 12px; display:flex; align-items:center; gap:10px;">
          <div class="foodthumb" style="background:${f.grad}; width:38px;height:38px;border-radius:9px; font-size:16px;">${f.emoji}</div>
          <span style="font-size:12.5px; font-weight:700;">${f.name}</span>
        </td>
        <td style="font-size:12.5px;">${f.qty}</td>
        <td style="font-size:12.5px;">${f.sold}</td>
        <td><span class="pill ${{Available:'pill-mint','Low Stock':'pill-amber','Sold Out':'pill-coral',Expired:'pill-coral'}[f.status]}">${f.status}</span></td>
        <td style="font-size:12.5px; font-weight:700;">${money(f.price)}</td>
        <td style="border-radius:0 12px 12px 0;"><button class="btn-sm" style="border:1px solid var(--line); background:#fff;">Edit</button></td>
      </tr>
      <tr><td colspan="6" style="height:8px;"></td></tr>
    `).join('')}
    </tbody>
  </table>
  `;
}

function sellerOrdersScreen(){
  const tabs = ['All','New','Paid','Ready for pickup','Completed'];
  return `
  ${sHeader('Orders','Track every order from payment to pickup.')}
  <div style="display:flex; gap:8px; margin-bottom:14px;">
    ${tabs.map((t,i)=>`<button class="btn-sm" style="border:1px solid var(--line); background:${i===0?'var(--forest)':'#fff'}; color:${i===0?'#fff':'var(--ink)'};">${t}</button>`).join('')}
  </div>
  <div style="display:flex; flex-direction:column; gap:10px;">
    ${sellerOrders.map(o=>`
    <div class="card" style="padding:14px 16px; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:13px; font-weight:700;">${o.id}</div>
        <div style="font-size:11.5px; color:var(--ink-soft); margin-top:3px;">${o.item} · ${o.customer}</div>
      </div>
      <div style="display:flex; align-items:center; gap:14px;">
        <span style="font-weight:700; font-size:13px;">${money(o.total)}</span>
        <span class="pill ${{'Ready for pickup':'pill-amber','Paid':'pill-sky','Completed':'pill-mint','New':'pill-coral'}[o.status]}">${o.status}</span>
      </div>
    </div>`).join('')}
  </div>
  `;
}

function sellerScanner(){
  return `
  ${sHeader('QR pickup scanner','Scan the customer\'s order QR code to confirm collection.')}
  <div style="display:flex; gap:20px;">
    <div class="card" style="flex:1; padding:26px; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:340px;">
      <div style="width:220px;height:220px; border:3px dashed var(--mint); border-radius:20px; display:flex; align-items:center; justify-content:center; position:relative;">
        ${icon('scan',52,'var(--forest)')}
      </div>
      <p style="font-size:12px; color:var(--ink-soft); margin-top:16px;">Point the camera at the customer's QR code</p>
      <button class="btn btn-primary" style="margin-top:14px; width:auto; padding:12px 26px;" onclick="alert('Order #SFR-88213 verified — mark as collected.')">Simulate scan</button>
    </div>
    <div class="card" style="width:300px; padding:18px;">
      <div style="font-size:12px; font-weight:700; color:var(--ink-soft);">LAST SCANNED ORDER</div>
      <div style="margin-top:12px; font-size:15px; font-weight:800;">#SFR-88213</div>
      <div style="font-size:12px; color:var(--ink-soft); margin-top:3px;">Nara S. · Roast Chicken Rice Box ×1</div>
      <div style="display:flex; justify-content:space-between; margin-top:14px; font-size:12.5px;"><span style="color:var(--ink-soft);">Payment</span><span class="pill pill-mint">Paid</span></div>
      <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:12.5px;"><span style="color:var(--ink-soft);">Pickup status</span><span class="pill pill-amber">Pending</span></div>
      <button class="btn btn-primary btn-sm" style="width:100%; margin-top:16px;" onclick="alert('Marked as collected. Nice work!')">Confirm pickup</button>
    </div>
  </div>
  `;
}

function sellerAnalytics(){
  return `
  ${sHeader('Sales & food waste analytics')}
  <div style="display:flex; gap:14px;">
    ${statCard('Revenue recovered (30d)','฿34,200','chart','+12%')}
    ${statCard('Meals rescued (30d)','412','leaf')}
    ${statCard('Repeat customers','58%','users')}
    ${statCard('Avg. rating','4.8','star')}
  </div>
  <div class="card" style="margin-top:16px; padding:18px;">
    <h3 style="font-size:13.5px; margin-bottom:14px;">Weekly sales</h3>
    <div style="display:flex; align-items:flex-end; gap:12px; height:140px;">
      ${[40,55,35,70,60,90,75].map((h,i)=>`<div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
        <div style="width:100%; height:${h}%; background:linear-gradient(180deg,var(--mint),var(--forest)); border-radius:6px 6px 2px 2px;"></div>
        <span style="font-size:10px; color:var(--ink-soft);">${['M','T','W','T','F','S','S'][i]}</span>
      </div>`).join('')}
    </div>
  </div>
  <div class="card" style="margin-top:16px; padding:18px;">
    <h3 style="font-size:13.5px;">Food waste prevented</h3>
    <p style="font-size:12px; color:var(--ink-soft); margin-top:6px;">Estimated using average portion weight of listed items. For awareness only, not a certified measurement.</p>
    <div style="display:flex; gap:24px; margin-top:14px;">
      <div><div style="font-size:19px; font-weight:800; font-family:'Sora'; color:var(--forest);">96 kg</div><div style="font-size:11px; color:var(--ink-soft);">food waste avoided</div></div>
      <div><div style="font-size:19px; font-weight:800; font-family:'Sora'; color:var(--forest);">163 kg</div><div style="font-size:11px; color:var(--ink-soft);">CO₂e avoided (est.)</div></div>
    </div>
  </div>
  `;
}

function sellerProfile(){
  return `
  ${sHeader('Business profile')}
  <div style="display:flex; gap:18px;">
    <div class="card" style="flex:1; padding:20px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
        <div><label>Business name</label><input value="Golden Wok Kitchen"></div>
        <div><label>Business type</label><select><option>Restaurant</option><option>Café</option><option>Bakery</option><option>Supermarket</option><option>Hotel</option></select></div>
        <div style="grid-column:1/3;"><label>Address</label><input value="88 Sukhumvit Soi 24, Bangkok"></div>
        <div><label>Opening hours</label><input value="10:00 – 21:00"></div>
        <div><label>Contact number</label><input value="+66 2 123 4567"></div>
      </div>
      <button class="btn btn-primary" style="margin-top:18px; width:auto; padding:12px 26px;">Save changes</button>
    </div>
    <div class="card" style="width:260px; padding:18px; text-align:center;">
      <div style="width:56px;height:56px;border-radius:16px; background:linear-gradient(135deg,var(--forest),var(--mint)); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-family:'Sora'; margin:0 auto;">GW</div>
      <div style="font-weight:700; margin-top:10px; font-size:13.5px;">Golden Wok Kitchen</div>
      <span class="pill pill-mint" style="margin-top:6px;">${icon('check',11,'var(--forest)')} Verified seller</span>
      <div style="display:flex; justify-content:center; gap:4px; margin-top:10px;">${icon('star',14,'var(--amber)','var(--amber)')}<span style="font-weight:700; font-size:13px;">4.8</span><span style="color:var(--ink-soft); font-size:12px;">(212 reviews)</span></div>
    </div>
  </div>
  `;
}

