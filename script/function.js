export const translatePage = (translations, lang) => {
  localStorage.setItem("currentLang", lang.trim().toLowerCase());

  // Функция перевода страницы, принимает все переводы и язык на который нужно пееревести
  const translates = translations[lang.trim().toLowerCase()]; // получаем переводы по нужному язык
  for (const classname in translates) {
    // Проходка по классам элементов котроые нужно перевести
    const els = document.querySelectorAll(classname);

    els.forEach((el, idx) => {
      const isInputEl = el.tagName === "INPUT";

      el[isInputEl ? "placeholder" : "textContent"] =
        translates[classname][idx];
    });
  }
};

export const initTranslate = (pageName) => {
  // функция которая инициализирует перевод страницы и принимает название страницы которую нужно перевести

  const currentLang = localStorage.getItem("currentLang");

  if (currentLang) {
    const allSidebarLangCurrentEls = document.querySelectorAll(
      ".sidebar-lang-current"
    );

    fetch(`./translations/${pageName}.json`) // получаем нужный json файл для перевода страницы
      .then((resp) => resp.json()) // после получения файла переводов парсим его из JSON в объект JS
      .then((translations) => {
        // Получаем объект всех переводов для страницы
        allSidebarLangCurrentEls.forEach(
          (el) => (el.textContent = currentLang)
        );
        translatePage(translations, currentLang); // вызываем функцию перевода страницы передав туда объект переводов для нужной страницы и название языка на который нужно перевесьи
      });
  }

  const sidebarLangMenuEls = document.querySelectorAll(".lang");
  sidebarLangMenuEls.forEach((sidebarMenuEl) => {
    const sidebarLangCurrentEl = sidebarMenuEl.querySelector(".lang-current");
    const allSidebarLangCurrentEls = document.querySelectorAll(".lang-current");
    const langBtnEls = sidebarMenuEl.querySelectorAll(".lang-btn-menu-item"); // получаем все кнопки языков в меню выбора языка

    langBtnEls.forEach(
      (
        btnEl // проходимся по каждой кнопке смены языка
      ) =>
        btnEl.addEventListener("click", () => {
          // вешаем обрабочтик события на кнопку на события клика
          fetch(`./translations/${pageName}.json`) // получаем нужный json файл для перевода страницы
            .then((resp) => resp.json()) // после получения файла переводов парсим его из JSON в объект JS
            .then((translations) => {
              // Получаем объект всех переводов для страницы
              allSidebarLangCurrentEls.forEach(
                (el) => (el.textContent = btnEl.textContent)
              );
              translatePage(translations, btnEl.textContent); // вызываем функцию перевода страницы передав туда объект переводов для нужной страницы и название языка на который нужно перевесьи
            });
        })
    );
  });
};
