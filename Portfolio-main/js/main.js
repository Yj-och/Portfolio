'use strict';
// ハンバーガーメニュー-----------
{
  const open = document.getElementById('materialOpen');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('materialclose');

  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
  })
  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
  })
}


// モーダルウィンドウ---------------
{
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');

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


//トップ画像カルーセル------------------------
// {
// const next = document.getElementById('next');
// const prev = document.getElementById('prev');
// const ul = document.querySelector('ul');
// const slides = ul.children;
// 丸ボタン用配列
// const dots = [];
// スライドさせる画像のインデックス
// let currentIndex = 0;

// 画像が最初か最後まできたらボタンを消す条件分岐処理
// function updateButtons() {
//   prev.classList.remove('hidden');
//   next.classList.remove('hidden');

//   if (currentIndex === 0) {
//     prev.classList.add('hidden');
//   }
//   if (currentIndex === slides.length - 1) {
//     next.classList.add('hidden');
//   }
// }
//画像の幅を取得してスライドさせる処理
// function moveSlides() {
//   const slideWidth = slides[0].getBoundingClientRect().width;
//   ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
// }

// （生成した）丸ボタンを押した時にそれぞれの機能を実行する処理
// function setupDots() {
//   for (let i = 0; i < slides.length; i++) {
//     const button = document.createElement('button');
//     button.addEventListener('click', () => {
//       currentIndex = i;
//       updateDots();
//       updateButtons();
//       moveSlides();
//     });
//     dots.push(button);
//     document.getElementById('js-nav').appendChild(button);
//   }

//   dots[0].classList.add('current');
// }
// 丸ボタンを全て取得して'current'を一度全て外して、クリックされた丸ボタンにのみ'current'処理をつける処理
// function updateDots() {
//   dots.forEach(dot => {
//     dot.classList.remove('current');
//   });
//   dots[currentIndex].classList.add('current');
// }

// ページを読み込みタイミングで実行
// updateButtons();
// setupDots();

// 進むボタン
// next.addEventListener('click', () => {
//   currentIndex++;
//   updateButtons();
//   updateDots()
//   moveSlides();
// });
// 戻るボタン
// prev.addEventListener('click', () => {
//   currentIndex--;
//   updateButtons();
//   updateDots()
//   moveSlides();
// });
// window.addEventListener('resize', () => {
//   moveSlides();
// });
// }
// 上記カルーセルを基盤にクラス処理-------------------
{
  class Carousel {
    constructor() {
      this.next = document.getElementById('next');
      this.prev = document.getElementById('prev');
      this.ul = document.querySelector('ul');
      this.nav = document.getElementById('js-nav');
      this.slides = this.ul.children;
      // 丸ボタン用配列
      this.dots = [];
      // スライドさせる画像のインデックス
      this.currentIndex = 0;
    }
    // 画像が最初か最後まできたらボタンを消す条件分岐処理
    updateButtons() {
      this.prev.classList.remove('hidden');
      this.next.classList.remove('hidden');

      if (this.currentIndex === 0) {
        this.prev.classList.add('hidden');
      }
      if (this.currentIndex === this.slides.length - 1) {
        this.next.classList.add('hidden');
      }
    }
    //画像の幅を取得してスライドさせる処理
    moveSlides() {
      const slideWidth = this.slides[0].getBoundingClientRect().width;
      this.ul.style.transform = `translateX(${-1 * slideWidth * this.currentIndex}px)`;
    }

    // （生成した）丸ボタンを押した時にそれぞれの機能を実行する処理
    setupDots() {
      for (let i = 0; i < this.slides.length; i++) {
        const button = document.createElement('button');

        button.addEventListener('click', () => {
          this.currentIndex = i;
          this.updateDots();
          this.updateButtons();
          this.moveSlides();
        });
        this.dots.push(button);
        this.nav.appendChild(button);
      }

      this.dots[0].classList.add('current');
    }
    // 丸ボタンを全て取得して'current'を一度全て外して、クリックされた丸ボタンにのみ'current'処理をつける処理
    updateDots() {
      this.dots.forEach(dot => {
        dot.classList.remove('current');
      });
      this.dots[this.currentIndex].classList.add('current');
    }

    // 【変更点】クラス内で処理するためプロパティ化
    // 進むボタン
    addListeners() {
      this.next.addEventListener('click', () => {

        this.currentIndex++;
        this.updateButtons();
        this.updateDots()
        this.moveSlides();
      });
      // 戻るボタン
      this.prev.addEventListener('click', () => {
        this.currentIndex--;
        this.updateButtons();
        this.updateDots()
        this.moveSlides();
      });
      window.addEventListener('resize', () => {
        this.moveSlides();
      });
    }
  }

  const carousel = new Carousel();
  // ページを読み込みタイミングで実行
  carousel.updateButtons();
  carousel.setupDots();
  carousel.addListeners();
}
// アコーディオンUI

{
  class Accordion {
    constructor() {
      this.dts = document.querySelectorAll('dt');
    }
    pushed() {
      this.dts.forEach(dt => {
        dt.addEventListener('click', () => {
          dt.parentNode.classList.toggle('appear');
          this.dts.forEach(el => {
            if (dt !== el) {
              el.parentNode.classList.remove('appear');
            }
          })
        });
      });
    }
  }

  const accordion = new Accordion();
  accordion.pushed();

}

