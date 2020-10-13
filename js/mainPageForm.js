// объявляем переменные:
// 1) кнопка показа/сокрытия основного содержимого формы
const mainPageFormShowHideButton = document.querySelector(".form-top-search-submit");
// 2) само основное содержимое формы
const mainPageFormMainContent = document.querySelector(".hotel-search-form-main-content");


// вешаем обработчик событий на кнопку показа/сокрытия формы
mainPageFormShowHideButton.addEventListener("onclick", function(showHideEvent) {
  // отключаем дефолтное действие кнопки
  showHideEvent.preventDefault();
  //
});
