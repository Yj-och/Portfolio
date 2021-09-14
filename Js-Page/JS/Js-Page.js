'use strict';


window.onload = setTimeout(function () {
  const loader = document.getElementById('wrapper');
  const loader2 = document.getElementById('#Loading');
  loader.classList.add('completed');
  loader2.classList.add('completed');
}, 2000);


// モーダルウィンドウ---------------
{
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');
  // 選択された時の開け閉め処理
  open.addEventListener('click', () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });
  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
  mask.addEventListener('click', () => {
    close.click();
  });
}