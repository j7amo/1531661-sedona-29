const mainPageForm = document.querySelector(".hotel-search-form");
mainPageForm.classList.add("modal-hide");

let isLocalStorageSupported = true;
let adultsStored = "";
let childrenStored = "";

try {
  adultsStored = parseInt(localStorage.getItem("number-of-adults"));
  childrenStored = parseInt(localStorage.getItem("number-of-children"));
} catch (err) {
  isLocalStorageSupported = false;
}

const arrivalDatePicker = document.querySelector(".arrival-date-container .calendar");
const departureDatePicker = document.querySelector(".departure-date-container .calendar");
let arrivalDateField = document.querySelector("input.arrival-date");
let departureDateField = document.querySelector("input.departure-date");

arrivalDatePicker.addEventListener("click", function (evt){
  evt.preventDefault();
  arrivalDateField.focus();
});

departureDatePicker.addEventListener("click", function (evt){
  evt.preventDefault();
  departureDateField.focus();
});

const adultDecrButton = document.querySelector(".adult-number-decrease");
const adultIncrButton = document.querySelector(".adult-number-increase");
const childrenDecrButton = document.querySelector(".children-number-decrease");
const childrenIncrButton = document.querySelector(".children-number-increase");
let numberOfAdultsField = document.querySelector("input.number-of-adults");
let numberOfChildrenField = document.querySelector("input.number-of-children");

let numberOfAdults = 0;
let numberOfChildren = 0;

if (isNaN(adultsStored)) {
  numberOfAdults = parseInt(numberOfAdultsField.placeholder);
} else numberOfAdults = adultsStored;

if (isNaN(childrenStored)) {
  numberOfChildren = parseInt(numberOfChildrenField.placeholder);
} else numberOfChildren = childrenStored;

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

mainPageForm.addEventListener("submit", function(evt){
  if (arrivalDateField.value.length === 0 || departureDateField.value.length === 0 || numberOfAdultsField.value.length === 0 || numberOfChildrenField.value.length === 0) {
    evt.preventDefault();
    mainPageForm.classList.remove("modal-error");
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

const mainPageFormShowHideButton = document.querySelector(".form-show-hide");

mainPageFormShowHideButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (mainPageForm.classList.contains("modal-hide")) {
    mainPageForm.classList.toggle("modal-hide");
    mainPageForm.classList.toggle("modal-show");
  } else if (mainPageForm.classList.contains("modal-show")){
    mainPageForm.classList.toggle("modal-show");
    mainPageForm.classList.toggle("modal-hide");
  }
  if (adultsStored && childrenStored) {
    numberOfAdultsField.value = adultsStored;
    numberOfChildrenField.value = childrenStored;
    }
});
