'use strict';


window.onload = setTimeout(function () {
  const loader = $('#wrapper');
  const loader2 = $('#Loading');
  loader.addClass('completed');
}, 2000);


// モーダルウィンドウ---------------
{
  const $open = $('#open');
  const $close = $('#close');
  const $modal = $('#modal');
  const $mask = $('#mask');
  // 選択された時の開け閉め処理
  $open.click(() => {
    console.log($modal)
    $modal.removeClass('hidden');
    $mask.removeClass('hidden');
  });
  $close.click(() => {
    $modal.addClass('hidden');
    $mask.addClass('hidden');
  });
  $mask.click(() => {
    // $closeと同じ処理↓※テクニック
    $close.click();
  });
}

// {
//   const open = document.getElementById('open');
//   const close = document.getElementById('close');
//   const modal = document.getElementById('modal');
//   const mask = document.getElementById('mask');
//   // 選択された時の開け閉め処理
//   open.addEventListener('click', () => {
//     modal.classList.remove('hidden');
//     mask.classList.remove('hidden');
//   });
//   close.addEventListener('click', () => {
//     modal.classList.add('hidden');
//     mask.classList.add('hidden');
//   });
//   mask.addEventListener('click', () => {
//     close.click();
//   });
// }
// ---------------タブ--------------------
const menuItems = document.querySelectorAll('.menu li a');
const contents = document.querySelectorAll('.content');

menuItems.forEach((clickedItem) => {
  clickedItem.addEventListener('click', (e) => {
    // ページ遷移を停止
    e.preventDefault();
    // 一度activeを外す
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    // そしてクリックされたものだけにつける
    clickedItem.classList.add('active');
    // 内容を一度消す
    contents.forEach((content) => {
      content.classList.remove('active');
    });
    // そしてクリックされた内容を識別してactiveをつける
    document.getElementById(clickedItem.dataset.id).classList.add('active');
  });
});

// カルーセル----------------------------------
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const ul = document.querySelector('.cal-container ul');
const slides = ul.children;
const dots = [];
let currentIndex = 0;

// 画像が無くなった時押せないようにするボタン処理
function updateButtons() {
  // 下記以外の時はhiddenを外しておく
  prev.classList.remove('hidden');
  next.classList.remove('hidden');
  // currentIndexが０の時はhiddenをつける
  if (currentIndex === 0) {
    prev.classList.add('hidden')
  }
  // currentIndexが最後の時はhiddenをつける
  if (currentIndex === slides.length - 1) {
    next.classList.add('hidden')
  }
}
// 移動の長さの計算---
function moveSlides() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
}
// ボタン生成/イベント
function setupDots() {
  for (let i = 0; i < slides.length; i++) {
    const button = document.createElement('button');
    button.addEventListener('click',() => {
      currentIndex = i;
      // 丸をクリックに合わせて移動させる処理
      // dots.forEach(dot => {
      //   dot.classList.remove('current')
      // });
      // クリックされた丸にcurrentをつける
      // dots[currentIndex].classList.add('current');
      updateDots();
      updateButtons();
      moveSlides();
    });
    dots.push(button);
    document.querySelector('.carousel nav').appendChild(button);
  }
  dots[0].classList.add('current');
}
// prev/nextボタンを押したら一緒に丸も移動する処理
function updateDots() {
  dots.forEach(dot => {
    dot.classList.remove('current');
  });
  dots[currentIndex].classList.add('current');
}
// -----------------------実行処理

// ページが読み込まれた直後に処理を走らせる場所
updateButtons();
setupDots();

next.addEventListener('click', () => {
  // スライド分の長さをカウン---
  currentIndex++;
  // ボタンをクリックした時にも実行してボタンの状態を更新
  updateButtons();
  updateDots()
  // 移動の長さの計算---
  // const slideWidth = slides[0].getBoundingClientRect().width;
  // nextを押した時のスライド動作--
  // ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  moveSlides();
});

prev.addEventListener('click', () => {
  // スライド分の長さをカウント---
  currentIndex--;
  // ボタンをクリックした時にも実行してボタンの状態を更新---
  updateButtons();
  updateDots()
  // 移動の長さの計算---
  // const slideWidth = slides[0].getBoundingClientRect().width;
  // nextを押した時のスライド動作---
  // ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  moveSlides();
});
window.addEventListener('resize', () => {
  moveSlides();
});