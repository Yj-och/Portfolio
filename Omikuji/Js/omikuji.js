'use strict';
{

  const panel = document.getElementById('js-panel');
  const stop = document.getElementById('js-stop');
  var start = document.getElementById('js-start');
  // let timeOutId;

  function setTime() {

    const results = [
      '極吉!!!', //0
      '大吉!!', //1
      '中吉!', //2
      '小吉', //3
    ];

    panel.textContent = results[Math.floor(Math.random() * results.length)];
    return;
  }

  start.addEventListener('click', () => {
    this.timeOutId = setInterval(setTime, 50);
  });

  stop.addEventListener('click', () => {
    this.clearTimeout(timeOutId);
  });

}
