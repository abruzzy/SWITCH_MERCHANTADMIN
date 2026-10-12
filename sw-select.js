(function () {
  if (window.__swSelect) return; window.__swSelect = true;
  let menu = null, cur = null;
  const close = () => { if (menu) { menu.remove(); menu = null; cur = null; } };
  const check = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const open = (sel) => {
    close(); cur = sel;
    const anchor = sel.closest('label') || sel, r = anchor.getBoundingClientRect();
    menu = document.createElement('div');
    const w = Math.max(r.width, 210), below = window.innerHeight - r.bottom, up = below < 260 && r.top > below;
    Object.assign(menu.style, { position: 'fixed', zIndex: 9999, left: Math.min(r.left, window.innerWidth - w - 8) + 'px', width: w + 'px', maxHeight: '300px', overflowY: 'auto', padding: '6px', border: '1px solid var(--border-strong)', borderRadius: '12px', background: 'var(--surface)', boxShadow: 'var(--shadow-lg)', boxSizing: 'border-box', fontFamily: 'inherit' });
    if (up) menu.style.bottom = (window.innerHeight - r.top + 8) + 'px'; else menu.style.top = (r.bottom + 8) + 'px';
    [...sel.options].forEach((o) => {
      const on = o.value === sel.value, it = document.createElement('div');
      Object.assign(it.style, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '9px 10px', borderRadius: '8px', cursor: o.disabled ? 'default' : 'pointer', fontSize: '13px', fontWeight: on ? '700' : '600', color: o.disabled ? 'var(--text-muted)' : on ? 'var(--mint)' : 'var(--text)', background: on ? 'var(--mint-soft)' : 'transparent', whiteSpace: 'nowrap' });
      it.innerHTML = '<span style="overflow:hidden;text-overflow:ellipsis"></span>' + (on ? check : '');
      it.firstChild.textContent = o.textContent;
      if (!on && !o.disabled) { it.onmouseenter = () => { it.style.background = 'var(--surface-hover)'; it.style.color = 'var(--mint)'; }; it.onmouseleave = () => { it.style.background = 'transparent'; it.style.color = 'var(--text)'; }; }
      it.onmousedown = (e) => e.preventDefault();
      it.onclick = () => {
        if (o.disabled) return;
        const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
        setter.call(sel, o.value); sel.dispatchEvent(new Event('change', { bubbles: true })); close(); sel.focus();
      };
      menu.appendChild(it);
    });
    document.body.appendChild(menu);
    const onIt = menu.querySelector('[style*="mint-soft"]'); if (onIt) menu.scrollTop = onIt.offsetTop - 60;
  };
  document.addEventListener('mousedown', (e) => {
    let sel = e.target.closest && e.target.closest('select');
    if (!sel && e.target.closest && !e.target.closest('input,textarea,button')) { const lb = e.target.closest('label'); const s2 = lb && lb.querySelector('select'); if (s2 && lb.querySelectorAll('select').length === 1) sel = s2; }
    if (sel && !sel.multiple && !sel.disabled) { e.preventDefault(); if (cur === sel) close(); else open(sel); return; }
    if (menu && !menu.contains(e.target)) close();
  }, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, true);
  window.addEventListener('scroll', (e) => { if (menu && !menu.contains(e.target)) close(); }, true);
  window.addEventListener('resize', close);
})();
