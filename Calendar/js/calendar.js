'use strict';

// console.clear();

{
  // 今日の年月
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  // 月のはじめ
  function getCalendarHead() {
    const dates = [];
    // 末日を取得
    const d = new Date(year, month, 0).getDate();
    // 週の何日目かを取得
    const n = new Date(year, month, 1).getDay();
    // ０から末日まで回す
    for (let i = 0; i < n; i++) {
      dates.unshift({
        // 日付
        date: d - i,
        //今日かどうかの判定
        isToday: false,
        //薄くするかの判定
        isDisabled: true,
      });
    }
    return dates;
  }

  //今月
  function getCalendarBody() {
    const dates = [];
    // 末日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    // 今日の日付か判定する処理
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  // 翌月
  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }
  // clearCalendar()実行時のクリア処理
  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
  // 年月表示項目
  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }
  // 一つの配列に7日ごとに統合
  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    // 週ごとの配列
    const weeks = [];
    // 何週分あるか計算
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      // 7日ごとに取り出す
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }


  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  // 前ボタン
  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalendar();
  });
  // 進むボタン
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });

  createCalendar();
}

// -----------Vue.js--------------
// --------ToDo----------------

(function () {

  let vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },
    watch: {
      todos: {
        handler: function () {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function () {
        let item = {
          title: this.newItem,
          isDone: false,
        }
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function (index) {
        if (confirm('削除しますか？')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function () {
        if (!confirm('完了したタスクを削除しますか？')) {
          return;
        }
        this.todos = this.todos.filter(function (todo) {
          return !todo.isDone;
        });
      }
    },
    computed: {
      remaining: function () {
        let items = this.todos.filter(function (todo) {
          return !todo.isDone;
        });
        return items.length;
      }
    }
  });

})();