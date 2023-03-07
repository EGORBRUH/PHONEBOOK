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

  const addContactData = contact => {
    data.push(contact);
    console.log('data: ', data);
  }
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
    h1.textContent = `Телефонный справочник ${title}`; // Добавляем классу текст!

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
    thead.classList.add('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr class="head">
        <th class="delete">Удалить</th>
        <th class="name">Имя</th>
        <th class="surname">Фамилие</th>
        <th>Телефон</th>
      </tr>
    `);
    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;
    table.thead = thead;

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
        <label class="form-label">
            Имя
          <input class="form-input" name="name" type="text" required>
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">
            Фамилия
          <input class="form-input" name="surname" type="text" required>
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">
            Телефон
          <input class="form-input" name="phone" type="number" required>
        </label>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-4',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-4',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay}= createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo); // Аппендим логотип в хедер!
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    footer.footerContainer.append(author);
    app.append(header, main, footer); // аппендим на страницу хедер, мэйн и футер!

    return {
      list: table.tbody,
      listSort: table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };


  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

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
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    const editBtn = document.createElement('button');
    editBtn.classList.add('icon-edit');
    tdPhone.append(editBtn);

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
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    }

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    }

    btnAdd.addEventListener('click', openModal)

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay
        || target.classList.contains('close')) {
        closeModal();
      }
    });
    return {
      closeModal,
    }
  }

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });
    list.addEventListener('click', e => {
      const target = e.target;
      if (e.target.closest('.del-icon')) {
        e.target.closest('.contact').remove();
      }
    });
  }


  const addContactPage = (contact, list) => {
    list.append(createRow(contact))
  }
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      addContactData(newContact);
      form.reset();
      closeModal();
    })
  }

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
      listSort,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    let position;

    const sortArea = (position) => allRow.sort((x, y) => ((x.children[position].innerText <
        y.children[position].innerText) ? -1 : 1));
    const sortAreaBack = (position) => allRow.sort((x, y) => ((x.children[position]. innerText >
      y.children[position].innerText) ? -1 : 1));

    listSort.addEventListener('click', e => {
      const target = e.target;
      const headTarget = listSort.children[0].children;
      if (headTarget) {
        position = [...headTarget].findIndex(elem => elem === target);
        list.replaceChildren(...sortArea(position));
      }
    });

  };

  window.phoneBookInit = init;
}
