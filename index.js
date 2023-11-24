"use strict";

const numbers = document.querySelectorAll('.calculator__btn--number');
const operations = document.querySelectorAll('.calculator__btn--operation');
const clear = document.querySelector('.calculator__btn--clear');
const equals = document.querySelector('.calculator__btn--equals');
const del = document.querySelector('.calculator__btn--del');
const previous = document.querySelector('.previous');
const current = document.querySelector('.current');

numbers.forEach(number => number.addEventListener('click', function () {
   const newCurrent = this.dataset.num;
   const currentText = current.textContent;

   if (newCurrent === '.' && currentText.split('.').length - 1 > 0) return;


   if (currentText[0] === '0' &&
      currentText.length === 1 &&
      newCurrent !== '.') return;

   if (!isFinite(currentText) && currentText !== '.') {
      previous.innerHTML += currentText + "&nbsp;";
      current.textContent = '';
   }

   current.textContent += newCurrent;
}));

operations.forEach(operation => operation.addEventListener('click', function () {
   if (!current.textContent) return;

   if (!isFinite(current.textContent)) {
      current.textContent = this.dataset.operation;
      return;
   }

   previous.innerHTML += current.textContent + "&nbsp;";
   current.textContent = this.dataset.operation;
}));

clear.addEventListener('click', function () {
   previous.innerHTML = '';
   current.textContent = '';
});

del.addEventListener('click', function () {
   const previousText = previous.innerHTML.split('&nbsp;');
   previousText.pop();

   current.textContent = previousText.pop();
   previous.innerHTML = previousText.join('&nbsp;') + '&nbsp;';
});

equals.addEventListener('click', function () {
   current.textContent = eval(`${previous.textContent}${current.textContent}`);
   previous.innerHTML = '';
});
