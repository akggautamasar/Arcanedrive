/* Premium v2. Uses existing controls and data, with no synthetic transfer statistics. */
(function(){
'use strict';
const $=q=>document.querySelector(q);
const svg={cloud:'<path d="M7 19H6a4 4 0 0 1-1-7.8A7 7 0 0 1 18.5 9 5 5 0 0 1 18 19H7Z"/>',home:'<path d="m3 10 9-7 9 7v11H3z"/><path d="M9 21v-7h6v7"/>',folder:'<path d="M3 6h7l2 2h9v12H3z"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',tools:'<path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M19 5l-3 3M8 16l-3 3"/><circle cx="12" cy="12" r="4"/>',transfers:'<path d="M7 3v16m-4-4 4 4 4-4M17 21V5m-4 4 4-4 4 4"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',upload:'<path d="M12 16V3m-5 5 5-5 5 5M4 17v4h16v-4"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h2M3 12h2M3 18h2"/>',star:'<path d="m12 2 3 7 7 .5-5.5 5 1.5 7.5-6-4-6 4 1.5-7.5L2 9.5 9 9z"/>'};
const icon=k=>'<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">'+svg[k]+'</svg>';
function init(){
const main=$('.main-content');if(!main||$('.arc-v2'))return;
const wrap=document.createElement('section');wrap.className='arc-v2';
wrap.innerHTML='<div class="arc-v2-head" id="v2-head"><div class="arc-v2-top"><div class="arc-v2-logo">'+icon('cloud')+'</div><div class="arc-v2-brand"><strong>ArcaneDrive</strong><small>Telegram Storage · Personal Cloud</small></div><button class="arc-v2-icon" id="v2-search" aria-label="Search files">'+icon('search')+'</button></div><div class="arc-v2-storage" id="v2-storage"><small>MY STORAGE</small><strong id="v2-storage-total">Loading…</strong><p>Stored in Telegram · No fixed quota assumed</p><div class="arc-v2-storage-meter"></div></div></div><div class="arc-v2-quick" id="v2-quick"><button data-v2-action="files">'+icon('folder')+'Files</button><button data-v2-action="upload">'+icon('upload')+'Upload</button><button data-v2-action="search">'+icon('search')+'Search</button><button data-v2-action="tools">'+icon('tools')+'Tools</button></div><h2 class="arc-v2-title" id="v2-title">My Files</h2><section class="arc-v2-panel" id="v2-transfers" hidden><h3>Transfers</h3><p class="arc-v2-note">Use the existing upload workflow. A persistent transfer queue will be added only when backed by real transfer events.</p><div class="arc-v2-toolgrid"><button data-v2-action="upload">'+icon('upload')+'Upload</button></div></section><section class="arc-v2-panel" id="v2-tools" hidden><h3>Tools & Utilities</h3><div class="arc-v2-toolgrid"><button data-v2-action="upload">'+icon('upload')+'Upload file</button><button data-v2-action="folder">'+icon('folder')+'New folder</button><button data-v2-action="search">'+icon('search')+'Find files</button><button data-v2-action="grid">'+icon('grid')+'Grid view</button><button data-v2-action="list">'+icon('list')+'List view</button><button data-v2-action="storage">'+icon('cloud')+'Storage info</button></div><p class="arc-v2-note">PDF conversion, compression and advanced tools are not enabled until their backends are implemented.</p></section>';
main.insertBefore(wrap,main.firstChild);
const nav=document.createElement('nav');nav.className='arc-v2-tabs';nav.setAttribute('aria-label','ArcaneDrive navigation');
[['Home','home'],['Files','folder'],['Transfers','transfers'],['Tools','tools'],['Menu','menu']].forEach(([label,k])=>{let b=document.createElement('button');b.type='button';b.dataset.v2Tab=label.toLowerCase();b.innerHTML=icon(k)+'<span>'+label+'</span>';b.addEventListener('click',()=>show(label.toLowerCase()));nav.appendChild(b)});
document.body.appendChild(nav);
const area=$('.content-area'),toolbar=$('.toolbar'),crumb=$('.breadcrumb-container');
function show(tab){
if(tab==='menu'){$('#mobile-menu-toggle')?.click();return}
const home=tab==='home',files=tab==='files',tools=tab==='tools',transfers=tab==='transfers';
$('#v2-head').hidden=!(home||files);$('#v2-storage').hidden=!home;$('#v2-quick').hidden=!home;
$('#v2-title').hidden=tools||transfers;$('#v2-title').textContent=home?'My Files':'Files';
$('#v2-tools').hidden=!tools;$('#v2-transfers').hidden=!transfers;
if(area)area.style.display=tools||transfers?'none':'';
if(toolbar)toolbar.style.display=tools||transfers?'none':'';
if(crumb)crumb.style.display=tools||transfers?'none':'';
nav.querySelectorAll('button').forEach(b=>{if(b.dataset.v2Tab===tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
}
function action(key){
if(key==='files'){show('files');return}
if(key==='tools'){show('tools');return}
if(key==='upload'){$('#fileInput')?.click();return}
if(key==='folder'){$('#new-folder-btn')?.click();return}
if(key==='search'){$('#search-toggle-btn')?.click();setTimeout(()=>$('#file-search')?.focus(),100);return}
if(key==='grid'){$('#grid-view-btn')?.click();show('files');return}
if(key==='list'){$('#list-view-btn')?.click();show('files');return}
if(key==='storage'){$('#storage-refresh')?.click();show('home')}
}
wrap.addEventListener('click',e=>{const b=e.target.closest('[data-v2-action]');if(b)action(b.dataset.v2Action)});
$('#v2-search').addEventListener('click',()=>action('search'));
const total=$('#storage-total');if(total){const sync=()=>{const value=total.textContent.trim();if(value&&value!=='Loading…')$('#v2-storage-total').textContent=value};sync();new MutationObserver(sync).observe(total,{childList:true,subtree:true})}
show('home');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
