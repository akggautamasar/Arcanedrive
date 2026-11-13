/* Premium mobile navigation uses existing actions; no fake destinations or API calls. */
(function(){
  function init(){
    if(document.querySelector('.premium-mobile-nav'))return;
    const main=document.querySelector('.main-content');
    if(!main)return;
    const nav=document.createElement('nav');
    nav.className='premium-mobile-nav';
    nav.setAttribute('aria-label','Mobile navigation');
    const icons={
      home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
      files:'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3z"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
      menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'
    };
    const buttons=[
      ['Home','home',()=>{ const crumb=document.querySelector('#breadcrumb .breadcrumb-item');if(crumb)crumb.click();else window.scrollTo({top:0,behavior:'smooth'}); }],
      ['Files','files',()=>{document.querySelector('#list-view-btn')?.click();}],
      ['Search','search',()=>{document.querySelector('#search-toggle-btn')?.click();setTimeout(()=>document.querySelector('#file-search')?.focus(),50);}],
      ['Menu','menu',()=>document.querySelector('#mobile-menu-toggle')?.click()]
    ];
    buttons.forEach(([name,key,action],i)=>{
      const btn=document.createElement('button');btn.type='button';btn.setAttribute('aria-label',name);
      if(i===1)btn.setAttribute('aria-current','page');
      btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[key]+'</svg><span>'+name+'</span>';
      btn.addEventListener('click',()=>{action();if(i<2){nav.querySelectorAll('button').forEach(b=>b.removeAttribute('aria-current'));btn.setAttribute('aria-current','page');}});
      nav.appendChild(btn);
    });
    document.body.appendChild(nav);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
