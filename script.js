
// simple tag filter and theme toggle
const posts = document.querySelectorAll('.post');
const buttons = document.querySelectorAll('.tag');
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const tag = btn.dataset.tag;
  posts.forEach(p => {
    if(tag === 'all'){ p.style.display = ''; return; }
    p.style.display = p.dataset.tags.includes(tag) ? '' : 'none';
  });
}));

// theme toggle and persist
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme){ document.documentElement.setAttribute('data-theme', savedTheme); }
themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});


// chips act as quick filters + jump to first matching post
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const tag = chip.dataset.jump; // 'work' | 'ford' | 'bmw'
    // click matching header button to filter
    const btn = Array.from(document.querySelectorAll('.tag')).find(b => b.dataset.tag === tag);
    if(btn){ btn.click(); }
    // find anchor
    const anchor = document.getElementById(tag + '-top') || document.querySelector('.post[data-tags*="'+tag+'"]');
    if(anchor){
      const y = anchor.getBoundingClientRect().top + window.pageYOffset - 16; // small offset under sticky header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});
