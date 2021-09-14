'use strict';

//スクロール発火イベント
window.addEventListener( "scroll" ,function(){

  //スクロールの高さを取得
  let scroll = window.pageYOffset;

  if (scroll > 4800) {
    document.body.style.backgroundColor = '#fff';
  }else if (scroll > 3900) {
    document.body.style.backgroundColor = '#fffacd';
  }else if( scroll > 3000 ){
    document.body.style.backgroundColor = '#ffc0cb';
  }else if( scroll > 2300 ){
    document.body.style.backgroundColor = '#3cb371';
  }else if( scroll > 1500 ){
    document.body.style.backgroundColor = '#ffa500';
  }else if( scroll > 400 ){
    document.body.style.backgroundColor = '#e0ffff';
  }else{
    document.body.style.backgroundColor = '#FFF';
  }

});

{
  // const targets = document.querySelectorAll('p');
  const targets = document.querySelectorAll('.Introduction-img');
  // const targets = document.getElementById('aaa');

  // 表示されせる
  function callback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
 }
  // 第二引数
  const options = {
    threshold: 1,
    // rootMargin: '0px 0px -150px',
  };


  const observer = new IntersectionObserver(callback, options);
  targets.forEach(target => {
    observer.observe(target);
  });
}
