'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;
    return header;
  };

  const createLogo = title => { // Соответственно это функция которая создает элемент! Для дальнейшей работы которой мы создаем новую переменную в остновной функции!
    const h1 = document.createElement('h1'); // Создаем новый элемент!
    h1.classList.add('logo'); // Присваиваем этому элементу класс!
    h1.textContent = `Телефонный справочник. ${title}`; // Добавляем классу текст!

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main'); // Создаем элемент main!

    const mainContainer = createContainer(); // Создаем контейнер для main!
    main.append(mainContainer); // Аппендим контейнер для main!
    main.mainContainer = mainContainer; // Свойство аозволяющее добавлять в этот контейнер элементы как и хедер!
    return main;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;
    return footer;
  };


  const author = document.createElement('p');
  author.classList.add('author');
  author.textContent = `Все права защищены ©Егор`;


  const createButtonsGroup = params => { // Функция создания кнопок которая принимает в сябя параметры, params это массив
    // и мы можем решить для себя сколько кнопок создавать одну или несколько!
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => { // Массив который му будем перебирать с помощью МАР и возвращать кнопки!
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th>Имя</th>
        <th>Фамилие</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
        <button class="close" type="button"></button>
        <h2 class="form-title">Добавить контакт</h2>
       <div class="form-group">
          <label class="form-label" for="name">Имя:</label>
          <input class="form-input" name="name" id="name" type="text" required>
       </div>
        <div class="form-group">
          <label class="form-label" for="surname">Фамилия:</label>
          <input class="form-input" name="surname" id="surname" type="text" required>
       </div>
        <div class="form-group">
          <label class="form-label" for="phone">Телефон:</label>
          <input class="form-input" name="phone" id="phone" type="number" required>
       </div>
      `);

    const buttonsGroup = createButtonsGroup([ // Парсим?
      {
        classList: 'btn btn-primary',
        type: 'submit',
        text: 'Добавить',
      },
      {
        classList: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonsGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };


  const renderPhoneBook = (app, title) => {
    const header = createHeader(); // И это переменная в которой вызвана функция!
    const logo = createLogo(title); // Вот как раз таки эта перемення в которой вызвана функция и тут же мы принимаем title
    const main = createMain();
    const buttonsGroup = createButtonsGroup([ // Парсим?
      {
        classList: 'btn btn-primary js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        classList: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const form = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo); // Аппендим логотип в хедер!
    main.mainContainer.append(buttonsGroup.btnWrapper, table, form.overlay);
    footer.footerContainer.append(author);
    app.append(header, main, footer); // аппендим на страницу хедер, мэйн и футер!

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonsGroup.btns[0],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');

    const tdDell = document.createElement('td');
    tdDell.classList.add('delete');
    const buttonDell = document.createElement('button');
    buttonDell.classList.add('del-icon');
    tdDell.append(buttonDell);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink
    tdPhone.append(phoneLink);
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-icon');
    phoneLink.append(editBtn);

    tr.append(tdDell, tdName, tdSurname, tdPhone);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () =>  {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () =>  {
      logo.textContent = text;
    });
  });
}

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);
    const {list, logo, btnAdd, formOverlay, form} = phoneBook;

    const allRow = renderContacts(list, data);

    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    form.addEventListener('click', event => {
      event.stopPropagation();
    })

    formOverlay.addEventListener('click', () => {
      formOverlay.classList.remove('is-visible');
    })

  };

  window.phoneBookInit = init;
}
