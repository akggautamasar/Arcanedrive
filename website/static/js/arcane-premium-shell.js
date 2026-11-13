/* Premium UI shell: reuses real existing controls, does not simulate transfers or file operations. */
(function(){
 const $=s=>document.querySelector(s);
 function init(){
  const main=$('.main-content');if(!main||$('.arc-shell'))return;
  const shell=document.createElement('section');shell.className='arc-shell';
  shell.innerHTML='<header class="arc-head"><div><strong>☁ ArcaneDrive</strong><small>Telegram Storage · Personal Cloud</small></div><button type="button" id="arc-search" aria-label="Search">⌕</button></header><section class="arc-storage" id="arc-storage"><small>MY STORAGE</small><strong id="arc-total">Loading storage…</strong><small id="arc-storage-sub">Telegram-backed personal cloud</small><div class="arc-meter"><span id="arc-meter-fill"></span></div></section><div class="arc-shortcuts" id="arc-shortcuts"><button data-action="files"><span>📄</span>Files</button><button data-action="folders"><span>📁</span>Folders</button><button data-action="search"><span>⌕</span>Search</button><button data-action="tools"><span>⚙</span>Tools</button></div><h2 class="arc-screen-title" id="arc-screen-title">My Files</h2><section class="arc-panel" id="arc-tools" hidden><h3>Tools & Utilities</h3><div class="arc-tool-grid"><button data-action="upload"><span>☁</span>Upload files</button><button data-action="newfolder"><span>📁</span>New folder</button><button data-action="search"><span>⌕</span>Find files</button><button data-action="grid"><span>▦</span>Grid view</button><button data-action="list"><span>☷</span>List view</button><button data-action="storage"><span>◴</span>Storage info</button></div><p class="arc-notice">More file tools will appear here as they become available.</p></section><section class="arc-panel" id="arc-transfers" hidden><h3>Transfers</h3><p class="arc-notice">Existing upload and download operations remain available. A persistent transfer queue is not yet supported by the current frontend.</p><button type="button" data-action="upload">Upload a file</button></section>';
  main.insertBefore(shell,main.firstChild);
  const nav=$('.premium-mobile-nav');
  if(nav){
   nav.innerHTML='';
   [['Home','⌂','home'],['Files','▱','files'],['Transfers','⇅','transfers'],['Tools','▦','tools'],['Menu','☰','menu']].forEach(([label,ico,key])=>{
    const b=document.createElement('button');b.type='button';b.dataset.arcTab=key;b.textContent=ico+' '+label;b.setAttribute('aria-label',label);b.addEventListener('click',()=>select(key));nav.appendChild(b);
   });
  }
  function select(tab){
   const home=tab==='home',tools=tab==='tools',transfers=tab==='transfers';
   $('#arc-storage').hidden=!home;$('#arc-shortcuts').hidden=!home;
   $('#arc-tools').hidden=!tools;$('#arc-transfers').hidden=!transfers;
   $('#arc-screen-title').hidden=tools||transfers;
   const area=$('.content-area');if(area)area.style.display=(tools||transfers)?'none':'';
   if(tab==='files')$('#list-view-btn')?.click();
   if(tab==='menu'){$('#mobile-menu-toggle')?.click();return;}
   nav?.querySelectorAll('button').forEach(b=>{if(b.dataset.arcTab===tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  }
  function action(key){
   if(key==='files'||key==='folders'){select('files');return}
   if(key==='tools'){select('tools');return}
   if(key==='search'){$('#search-toggle-btn')?.click();setTimeout(()=>$('#file-search')?.focus(),100);return}
   if(key==='upload'){$('#fileInput')?.click();return}
   if(key==='newfolder'){$('#new-folder-btn')?.click();return}
   if(key==='grid'){$('#grid-view-btn')?.click();select('files');return}
   if(key==='list'){$('#list-view-btn')?.click();select('files');return}
   if(key==='storage'){$('#storage-refresh')?.click();select('home');return}
  }
  shell.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b)action(b.dataset.action)});
  $('#arc-search').addEventListener('click',()=>action('search'));
  select('home');
  const total=$('#storage-total');if(total){
   const sync=()=>{const value=total.textContent.trim();if(value&&value!=='Loading…')$('#arc-total').textContent=value};
   sync();new MutationObserver(sync).observe(total,{childList:true,subtree:true});
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
