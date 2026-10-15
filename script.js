const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(item => {const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));});
  let count = 0;
  document.querySelectorAll('.project').forEach(project => { const show = category === 'all' || project.dataset.category.split(' ').includes(category); project.hidden = !show; if(show) count++; });
  document.getElementById('filter-status').textContent = `${count} projects shown`;
}));
document.getElementById('play-simulation').addEventListener('click', event => {
  const button = event.currentTarget;
  const playing = button.getAttribute('aria-pressed') !== 'true';
  document.getElementById('kinematics-image').src = playing ? 'assets/kinematics.gif' : 'assets/kinematics-poster.png';
  button.setAttribute('aria-pressed', String(playing));
  button.textContent = playing ? 'Ⅱ Stop simulation' : '▶ Play simulation';
});
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try { await navigator.clipboard.writeText('erf.riazati@gmail.com'); status.textContent = 'Email copied!'; }
  catch { status.textContent = 'erf.riazati@gmail.com'; }
});
document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) {entry.target.classList.add('reveal'); observer.unobserve(entry.target);} }); }, {threshold: .08});
  document.querySelectorAll('.project, .publication, .timeline article').forEach(element => observer.observe(element));
}
