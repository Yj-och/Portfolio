'use strict';
{

  const panel = document.getElementById('js-panel');
  const stop = document.getElementById('js-stop');
  var start = document.getElementById('js-start');
  let isPlaying = false;
  let timeOutId;
  function setTime() {

    const results = [
      '極吉!!!',
      '大吉!!',
      '中吉!',
      '小吉',
    ];

    panel.textContent = results[Math.floor(Math.random() * results.length)];
    loc = 0;
    return;
  }

  function Play() {
    start.addEventListener('click', () => {
      if (isPlaying === true) {
        return;
      }
      isPlaying = true;
      timeOutId = setInterval(setTime, 50);
      loc++;
    });
  }

  Play();

    stop.addEventListener('click', () => {
      clearTimeout(timeOutId);
    });


}
