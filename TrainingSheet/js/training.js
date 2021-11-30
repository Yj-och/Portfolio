'use strict';

console.clear();
{
  // 今日の日付を取得
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  // 前月分を求める
  function getCalendarHead() {
    const dates = [];
    // 前月末日の日付
    //今月なら31の数字が入る
    const d = new Date(year, month, 0).getDate();//日は１から始まる
    // 日〜月までの週で1日までに何日あるかの個数
    ///現在9月
    //日〜月なので今月は
    //29,30,31,9/1となるので1日の前に３日ある
    //制作の現段階であればnには３が入る
    const n = new Date(year, month, 1).getDay();//週は０から始まる
    // n 日分の日付を取得する
    for (let i = 0; i < n; i++) {
      dates.unshift({
        // 遡るのでiをマイナス
        date: d - i,
        //31-0
        //31-1
        //31-2となる
        isToday: false,
        // 薄くするクラスをつける
        isDisabled: true,
      });
    }

    // console.log(dates);
    //スコープの外で使うためreturn
    return dates;
  }

  //今月分を求める
  function getCalendarBody() {
    const dates = []; // date:日付, day:曜日
    //日は０からカウントのため(year, month + 1, 0)で０を渡す
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    if (year === today.getFullYear() && month === today.getMonth()) {
      // 今日だったらtrue判定で文字をふと文字にする
      dates[today.getDate() - 1].isToday = true;
    }

    // console.log(dates);
    //スコープの外で使うためreturn
    return dates;
  }


  //翌月分を求める
  function getCalendarTail() {
    const dates = [];
    // 日〜月までの週で今月末日から何日あるかの個数
    const lastDay = new Date(year, month + 1, 0).getDay();
    // 曜日は０からなので2-0,2-1が入ってくる（現在９月）
    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        // 2-0=2
        // 2-1=1
        isToday: false,
        // 薄くするクラスをつける
        isDisabled: true,
      });
    }
    // console.log(dates);
    //スコープの外で使うためreturn
    return dates;
  }
  function clearCalendar() {
    //ボタンを押すたびにカレンダーの表示が増えるバグを直す処理
    const tbody = document.querySelector('tbody');
    //tbodyの最初の子要素がある限りtbodyからその最初の子要素を削除する
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
}

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      //配列の中に配列が入ってしまってしまうためスプレッド構文を使用
      //順番に注意　前→当→翌順
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    // 週毎を求める
    const weeks = [];
    //7日分で区切る
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      //7日分を取り出すで今月が何週分になるか求める
      weeks.push(dates.splice(0, 7));
    }
    //週ごとに処理のためループを回す
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        //weekから取り出した値を入れる
        td.textContent = date.date;

        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        // console.log(date);
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }


  //前月分 今月分 翌月分を統合する
  function creatCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
    //ボタンを押すたびにカレンダーの表示が増えるバグを直す処理
    // const tbody = document.querySelector('tbody');
    //tbodyの最初の子要素がある限りtbodyからその最初の子要素を削除する
    // while (tbody.firstChild) {
    //   tbody.removeChild(tbody.firstChild);
    }

    // const title = `${year}/${String(month + 1).padStart(2,'0')}`;
    // document.getElementById('title').textContent = title;
    
    // const dates = [
      //配列の中に配列が入ってしまってしまうためスプレッド構文を使用
      //順番に注意　前→当→翌順
    //   ...getCalendarHead(),
    //   ...getCalendarBody(),
    //   ...getCalendarTail(),
    // ];
    // 週毎を求める
    // const weeks = [];
    //7日分で区切る
    // const weeksCount = dates.length / 7;

    // for (let i = 0; i < weeksCount; i++) {
      //7日分を取り出すで今月が何週分になるか求める
    //   weeks.push(dates.splice(0, 7));
    // }
    //週ごとに処理のためループを回す
    // weeks.forEach(week => {
    //   const tr = document.createElement('tr');
    //   week.forEach(date => {
    //     const td = document.createElement('td');
        //weekから取り出した値を入れる
    //     td.textContent = date.date;

    //     if (date.isToday) {
    //       td.classList.add('today');
    //     }
    //     if (date.isDisabled) {
    //       td.classList.add('disabled');
    //     }
    //     // console.log(date);
    //     tr.appendChild(td);
    //   });
    //   document.querySelector('tbody').appendChild(tr);
    // });
    // console.log(dates);
    // console.log(weeks);

  // }

  // ボタンを押すと前月に移る処理
  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;//月は０から数えるため１１とすることで12月になる
    }

    creatCalendar();
  });
  //ボタンを押すと翌月に移る処理
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;//月は０から数えるため０とすることで1月になる
    }

    creatCalendar();
  });
  
  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    creatCalendar();
  });

  // デバック用
  // getCalendarBody();
  // getCalendarHead();
  // getCalendarTail();
  // creatCalendar();

  // --------実行
  creatCalendar();
}