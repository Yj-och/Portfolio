'use strict';

{
  // wordsの中をランダムで取り出す処理
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    // リセット
    loc = 0;
  }

  const words = [
    'business',
    'blue',
    'javascript',
    'program',
  ];

  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const target = document.getElementById('target');

  // クリックしたら開始する処理
  document.addEventListener('click', () => {
    target.classList.add('border');
    if (isPlaying === true) {

      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
  })

  document.addEventListener('keydown', e => {
    if (e.key !== word[loc]) {
      return;
    }
    loc++;
    // アンダーバーが変数locの分だけできてその分文字が抜ける処理　　　　
    target.textContent = '_'.repeat(loc) + word.substring(loc);
    if (loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} second!`;
        const aa = document.querySelector('.finish');
        aa.classList.add('balloons');

        return;
      }
      setWord();
    }
  });


}