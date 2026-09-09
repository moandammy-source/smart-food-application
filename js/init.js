/* Application bootstrap */
function upgradeRowItems(){
	document.querySelectorAll('row-item').forEach(r=>{
		const ic=r.getAttribute('icon'), label=r.getAttribute('label'), value=r.getAttribute('value');
		r.outerHTML = `<div style="display:flex; align-items:center; gap:10px;">
			<div style="width:30px;height:30px;border-radius:8px; background:var(--mint-light); display:flex; align-items:center; justify-content:center; flex:0 0 auto;">${icon(ic,15,'var(--forest)')}</div>
			<div><div style="font-size:11px; color:var(--ink-soft);">${label}</div><div style="font-size:12.5px; font-weight:600;">${value}</div></div>
		</div>`;
	});
}
const _origRenderCustomer = renderCustomer;
renderCustomer = function(animate=true){ _origRenderCustomer(animate); upgradeRowItems(); renderOrderQr(); };
renderCustomer();
loadDonationData();
