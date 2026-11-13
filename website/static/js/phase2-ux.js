/* ArcaneDrive Phase 2: progressive mobile/accessibility enhancements.
   Deliberately does not replace existing file operations or API handlers. */
(function () {
  'use strict';
  function ready() {
    const menu = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('bg-blur');
    if (menu && sidebar) {
      menu.setAttribute('type', 'button');
      menu.setAttribute('aria-label', 'Toggle navigation');
      menu.setAttribute('aria-controls', 'sidebar');
      const sync = () => {
        const opened = sidebar.classList.contains('open');
        menu.setAttribute('aria-expanded', String(opened));
        sidebar.setAttribute('aria-label', 'File navigation');
        if (overlay) overlay.setAttribute('aria-hidden', 'true');
      };
      sync();
      new MutationObserver(sync).observe(sidebar, {attributes:true, attributeFilter:['class']});
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !sidebar.classList.contains('open')) return;
        menu.click();
        menu.focus();
      });
    }
    const list = document.getElementById('directory-data');
    if (list) {
      list.setAttribute('aria-label', 'Files and folders');
      const enhance = () => {
        list.querySelectorAll('button.more-btn:not([data-arc-a11y])').forEach(button => {
          button.dataset.arcA11y = '1';
          button.setAttribute('type', 'button');
          button.setAttribute('aria-label', 'File or folder actions');
          button.title = 'More actions';
        });
        list.querySelectorAll('.directory-item:not([data-arc-a11y])').forEach(item => {
          item.dataset.arcA11y = '1';
          const name = item.querySelector('.item-title');
          if (name) item.setAttribute('aria-label', name.textContent.trim());
        });
      };
      enhance();
      new MutationObserver(enhance).observe(list, {childList:true, subtree:true});
    }
    const grid = document.getElementById('grid-view');
    if (grid) grid.setAttribute('aria-label', 'Grid view of files and folders');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
