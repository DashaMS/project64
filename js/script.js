//'use strict';
//Tabs

window.addEventListener('DOMContentLoaded', function () {

  // Tabs

  let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {

    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  } 

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  /* додавання року в таймері

  const years = document.createElement('year');
       years.style.cssText = 'display: block; margin-top: 20px; margin-bottom: 5px;
       font-size: 56px; font-weight: 700;box-sizing: border-box;text-align: center;  
       margin: 0; padding: 0; font-family: Roboto,sans-serif; display: block;';
       years.classList.add('timer__block');
       document.querySelector('.timer').prepend(years); 
     */


  // Timer

  const deadLine = '2022-11-22';

  // функція яка визначає різницю між дедлайном та теперішнім часом
  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const timer = document.querySelectorAll('.promotion');

    // створюємо технічну змінну яка містить різницю
    // між дедлайном та теперішнім часом. Отримуємо кількість у мілісекундах
    const t = Date.parse(endTime) - Date.parse(new Date());
    if (t <= 0) {

      timer.forEach(item => { item.remove(); }
      ); // видаляє таймер
      timer.textContent = 'На жаль, ви не встигли';
      /* days = 0;
       hours = 0;
       minutes = 0;
       seconds = 0; */

      /*
      const timer = document.querySelector('.timet');
      timer.remove(); */


    } else {
      //years = Math.floor(t / (1000 * 60 * 60 * 24 * 365));
      days = Math.floor(t / (1000 * 60 * 60 * 24)); // 1 секунда = 1 000 мл.сек
      hours = Math.floor(t / (1000 * 60 * 60) % 24); // прописуємо оператор залишку від 24
      minutes = Math.floor(t / (1000 * 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    // використовуємо "return" щоб повернути дані з "const" назовні

    return {
      'total': t,
      //'years': years,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  // ф-ція перевірки кількості цифр та підставляння 0
  function getZero(num) {
    if (num > 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  // функція розміщення даних на сторінці

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      // заг. змінна, щоб ф-цію можна було використ. для різних таймерів; selector = '.timer'
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000); // функція для запуску ф-ції оновлення таймеру щосекунди

    // запускаємо на початку ф-цію  updateClock() вручну, щою уникнути відобр на сторінці із затримкою в секунду
    updateClock();

    // функція оновлення таймеру щосекунди

    function updateClock() {
      // розрахунок часу, який залишився на дану секуду 

      const t = getTimeRemaining(endTime);

      //розміщуємо отримані дані на сторрінці
      //years.innerHTML = getZero(t.years);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      //перевірка досягнення дедлайну
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadLine);


  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');
   // modalCloseBtn = document.querySelector('[data-close]');
   // ця кнопка використовувалась для закриття модального вікна.Т.як ми створили нове модальне вікно в js, вона працювати не буде

  // ф-ція із відкриття вікна
  function openModal () {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // прибираємо прокрутку сторінки
  }


  // ф-ція із закриття вікна (після утворення вікна в js не працюватиме)
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // повертаємо прокрутку сторінки
    //  clearInterval(modalTimerId); // очищення інтервалу для уникнення повторного завант.мод.вікна
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // modalCloseBtn.addEventListener('click', closeModal); не прауюватиме після утворення вікна в js

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  //закриття модального вікна за допомогою клавіши 'esc'
  // keydown - натискання клавіші
  // e.code - код клавіши
  // modal.classList.contains('show') - умова, щоб 'esc' закривала лише мод. вікно
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // вспливання модального вікна після певного часу
  const modalTimerId = setTimeout(openModal, 50000);

  // функція, що обраховує коли користувач дійшов до низу сторінки
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      // видаляємо обробник події, що мод.вікно зявл.лише раз
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  //вспливаюче вікно при досягненні кінця сторінки
  // window.pageYOffset властивість вікна, що показує скільки пікселів зверху відлистав користувач по Y
  // document.documentElement.clientHeight - видима частина на сайті без прокрутки
  //document.documentElement.scrollHeight - загальна довжина сторінки
  window.addEventListener('scroll', showModalByScroll);

  // використання класів для карток

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH(); // метод, який конвертує валюту
    }

    changeToUAH() {
      this.price = this.price*this.transfer;
    }

    // метод render
    render() {
      const element = document.createElement('div');
    

      if (this.classes.length === 0) {
       this.element = 'menu__item';
        element.classList.add(this.element);
      } else {this.classes.forEach(className => element.classList.add(className));}

      element.innerHTML = `
  <img src=${this.src} alt=${this.alt}>
  <h3 class="menu__item-subtitle">${this.title}</h3>
  <div class="menu__item-descr">${this.descr}</div>
  <div class="menu__item-divider"></div>
  <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
  </div>
  `;
 this.parent.append(element);
    }
  }

new MenuCard(
"img/tabs/vegy.jpg",
"vegy",
'Меню "Фитнес"',
'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
9,
'.menu .container',
'menu__item',
'big'
).render();

new MenuCard(
  "img/tabs/elite.jpg",
  "elit",
  'Меню “Премиум”',
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  11,
  '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    8,
    '.menu .container'
    ).render(); 


    // Forms
const forms = document.querySelectorAll('form');

const message = {
  loading: 'img/spinner.svg',
  success:"'Дякуємо! Скоро з вами зв'яжемося",
  fail: "Щось пішло не так"
};

forms.forEach (item => {
  postData(item);
});

function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // прибираємо оновлення сторінки при введенні даних в форму, яке стає за замовчуванням


    let statusMessage = document.createElement('img');// утворюємо змінну для виводу повідомлення про результати вводу ін-ції
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
    display: block;
    margin: 0 auto;
    `;
    form.insertAdjacentElement('afterend', statusMessage); // метод дозволяє вставити спінер зі статус в кінець 

    const request = new XMLHttpRequest();// утворюємо об'єкт для передачі даних на сервер
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); 
    
    // !!! Коли використовуэмо XMLHttpRequest та FormData заголовок (request.setRequestHeader) не прописуємо, він встан.автоматино!!!
    // якщо FormData не переписуэмо у JSON
    const formData = new FormData(form); 

    // конвертуємо formData в JSON формат
    
    const object = {};
    formData.forEach(function(value, key) {
      object[key]=value;
    });

    const json = JSON.stringify(object);


    // об'єкт form data формує усі дані, отримані з форми та відправляє їх на сервер
    // !!!! Дуже важливо у верстці прописувати атрибут name="...." в input!!! інакше FormData не зможе знайти input
    
    request.send(json); // відправляємо зібрані дані з formData, у даному випадку ковертовані в json

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log(request.response);
        showThanksModal(message.success);
        statusMessage.remove();  // видаляємо повідомлення після отримання даних
        form.reset(); // очищуємо форму після отримання даних
      } else {
        showThanksModal(message.fail);
      }
    });


  });
}

// функція з приховування вікна

function showThanksModal (message) {
  const prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide'); // сховуємо старе вікно, в яке вводили дані
  openModal(); // функція, яка відповідає за відкриття модальних вікон

  // створємо новий контент

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog'); // додаємо старий клас та прописуємо нову верстку
  thanksModal.innerHTML = `
  <div class="modal__content">
       <div data-close class="modal__close">&times;</div> 
      <div class="modal__title">${message}</div>
  </div>`;

document.querySelector('.modal').append(thanksModal);

setTimeout( ()=> {
  thanksModal.remove(); // видаляємо вікно після відпрацювання
  prevModalDialog.classList.add('show'); // показуємо звичайну форму на випадок нового її заповнення
  prevModalDialog.classList.remove('hide');
  closeModal();
}, 4000);

}

});





/* Timer 1

const deadLine = '2022-11-25';

function getTimeRemaining (endTime) {
  const t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(t/ (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60 ) % 60),
        seconds = Math.floor((t / 1000) % 60);

        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
}

function getZero(num) {
if(num >=0 && num < 10){
  return `0${num}`;
} else {
  return num;
}
}

function setClock(selector, endTime) {
  const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#days'),
        minutes = timer.querySelector('#minutes'),
        seconds =  timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
          const t = getTimeRemaining(endTime);

          days.innerHTML = getZero(t.days);
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = getZero(t.minutes);
          seconds.innerHTML = getZero(t.seconds);

          if (t.total <= 0) {
            clearInterval(timeInterval);
          }
        }
}

setClock('.timer', deadLine); */




/*
const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
  tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
  });

  tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
  });
}

function showTabContent (i=0) {
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
const target = event.target;

if (target && target.classList.contains('tabheader__item')) {
  tabs.forEach((item, i)=> {
      if(target === item) {
hideTabContent();
showTabContent(i);
      }
  });
}

}); */