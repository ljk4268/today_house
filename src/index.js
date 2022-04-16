const $sidebarBtn = document.querySelector(".side-bar-toggle");
const $sidebar = document.querySelector(".side-bar");
const $backDriop = document.querySelector('.back-drop');


$sidebarBtn.addEventListener('click', () => {
  $sidebar.classList.toggle('open');
  $backDriop.style.display = 'block';
});

$backDriop.addEventListener('click', ()=>{
  $sidebar.classList.toggle('open');
  $backDriop.style.display = 'none';
})

