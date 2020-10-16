
// I. Сначала проверим доступность локального хранилища (согласно ТЗ мы можем хранить локально данные о кол-ве взрослых и детей)
// для этого объявим соответствующие переменные
let isLocalStorageSupported = true;
let adultsStored = "";
let childrenStored = "";

// и попробуем обратиться к локальному хранилищу (try-catch позволит нам отловить исключение и продолжить нормальную работу скрипта)
try {
  adultsStored = parseInt(localStorage.getItem("number-of-adults"));
  childrenStored = parseInt(localStorage.getItem("number-of-children"));
} catch (err) {
  isLocalStorageSupported = false;
}

// II. Теперь займёмся кнопками и полями формы

// 1) кнопки-иконки календаря, которые заменили собой кнопки user-agent(Chrome) либо добавились в принципе (Safari)

// объявляем переменные для доступа к интерактивным элементам (кнопки и поля)
// (2 кнопки)
const arrivalDatePicker = document.querySelector(".arrival-date-container .calendar");
const departureDatePicker = document.querySelector(".departure-date-container .calendar");
// поля
let arrivalDateField = document.querySelector("input.arrival-date");
let departureDateField = document.querySelector("input.departure-date");

// вешаем обработчики на каждую кнопку и передаём фокус самим полям ввода по нажатию этих кнопок, что в свою очередь приведёт к вызову jQuery datepicker'а
arrivalDatePicker.addEventListener("click", function (evt){
  evt.preventDefault();
  arrivalDateField.focus();
});

departureDatePicker.addEventListener("click", function (evt){
  evt.preventDefault();
  departureDateField.focus();
});
// 2) кнопки уменьшения/увеличения значений в полях ввода "Взрослые" и "Дети"

// объявляем переменные для доступа к интерактивным элементам (кнопки и поля)
// (4 кнопки)
const adultDecrButton = document.querySelector(".adult-number-decrease");
const adultIncrButton = document.querySelector(".adult-number-increase");
const childrenDecrButton = document.querySelector(".children-number-decrease");
const childrenIncrButton = document.querySelector(".children-number-increase");
// поля
let numberOfAdultsField = document.querySelector("input.number-of-adults");
let numberOfChildrenField = document.querySelector("input.number-of-children");

// также объявим переменные для хранения текущих значений этих полей (обязательно нужно строковое содержимое спарсить в целое число, чтобы с ним потом можно было нормально производить математические действия)
let numberOfAdults = 0;
let numberOfChildren = 0;

if (isNaN(adultsStored)) {
  numberOfAdults = parseInt(numberOfAdultsField.placeholder);
} else numberOfAdults = adultsStored;

if (isNaN(childrenStored)) {
  numberOfChildren = parseInt(numberOfChildrenField.placeholder);
} else numberOfChildren = childrenStored;

// вешаем обработчики на каждую кнопку
adultDecrButton.addEventListener("click", function(evt){
  evt.preventDefault();
  if (numberOfAdults > 0) {
    numberOfAdults = numberOfAdults - 1;
    numberOfAdultsField.value = numberOfAdults;
  }
});

adultIncrButton.addEventListener("click", function(evt){
  evt.preventDefault();
  numberOfAdults = numberOfAdults + 1;
  numberOfAdultsField.value = numberOfAdults;
});

childrenDecrButton.addEventListener("click", function(evt){
  evt.preventDefault();
  if (numberOfChildren > 0) {
    numberOfChildren = numberOfChildren - 1;
    numberOfChildrenField.value = numberOfChildren;
  }
});

childrenIncrButton.addEventListener("click", function(evt){
  evt.preventDefault();
  numberOfChildren = numberOfChildren + 1;
  numberOfChildrenField.value = numberOfChildren;
});

// сама форма (повесим на неё анимации)
const mainPageForm = document.querySelector(".hotel-search-form");

// здесь есть нюансы:
// 1) нужно изменить тип события с "click" на "submit"
// 2) сохранить по возможности кол-во взрослых и детей в локальное хранилище
// 3) дать пользователю обратную связь о том, что он не заполнил какое-то поле (делаем как в демке - с помощью анимации тряски + фокус на то поле, которое требует заполнения)
mainPageForm.addEventListener("submit", function(evt){
  if (arrivalDateField.value.length === 0 || departureDateField.value.length === 0 || numberOfAdultsField.value.length === 0 || numberOfChildrenField.value.length === 0) {
    evt.preventDefault();
    mainPageForm.classList.remove("modal-error");
    // трюк из демки, который позволяет анимации обновляться бесконечное количество раз
    mainPageForm.offsetWidth;
    mainPageForm.classList.add("modal-error");
    if (numberOfChildrenField.value.length === 0) numberOfChildrenField.focus();
    if (numberOfAdultsField.value.length === 0) numberOfAdultsField.focus();
    if (departureDateField.value.length === 0) departureDateField.focus();
    if (arrivalDateField.value.length === 0) arrivalDateField.focus();
  } else {
    if (isLocalStorageSupported) {
      localStorage.setItem("number-of-adults", numberOfAdultsField.value);
      localStorage.setItem("number-of-children", numberOfChildrenField.value);
    }
  }
});

// III. И наконец реализуем механизм показа/сокрытия формы

// объявляем переменные:
// кнопка показа/сокрытия основного содержимого формы
const mainPageFormShowHideButton = document.querySelector(".form-show-hide");

// вешаем обработчик событий на кнопку показа/сокрытия формы
mainPageFormShowHideButton.addEventListener("click", function(evt) {
  // отключаем дефолтное действие кнопки
  evt.preventDefault();
  // удаляем/добавляем класс modal-hide при помощи метода toggle(), чтобы форма показывалась/скрывалась
  // задача осложняется тем, что форма изначально должна быть открыта, а также тем, что на ней может висеть класс ошибки заполнения параллельно с этими операциями
  // 1) прячем форму первый раз
  if (!mainPageForm.classList.contains("modal-hide") && !mainPageForm.classList.contains("modal-show")) {
    mainPageForm.classList.toggle("modal-hide");
    if (mainPageForm.classList.contains("modal-error")) mainPageForm.classList.toggle("modal-error");
  }
  // 2) показываем форму с анимацией (здесь убираем класс, который скрывает форму и добавляем тот, который добавляет анимацию)
  else if (mainPageForm.classList.contains("modal-hide")) {
    mainPageForm.classList.toggle("modal-hide");
    mainPageForm.classList.toggle("modal-show");
    if (mainPageForm.classList.contains("modal-error")) mainPageForm.classList.toggle("modal-error");
  }
  // 3) прячем форму после повторного её показа
  else if (mainPageForm.classList.contains("modal-show")) {
    mainPageForm.classList.toggle("modal-show");
    mainPageForm.classList.toggle("modal-hide");
    if (mainPageForm.classList.contains("modal-error")) mainPageForm.classList.toggle("modal-error");
  }
  // ускоряем процесс ввода данных в форму путём подстановки данных из локального хранилища (если такие данные имеются)
  if (adultsStored && childrenStored) {
    numberOfAdultsField.value = adultsStored;
    numberOfChildrenField.value = childrenStored;
    }
});