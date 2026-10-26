'use strict';

// Задание 1. Проверить, содержит ли строка только цифры.
// Регулярное выражение ^\d+$ означает: от начала до конца строки — одна или более цифр.
const containsOnlyDigits = (str) => {
  return /^\d+$/.test(str);
};

console.log('Задание 1. Проверка строки на цифры:');
console.log(containsOnlyDigits('12345')); // true
console.log(containsOnlyDigits('12a45')); // false

const digitsInput = document.getElementById('digitsInput');
const digitsResult = document.getElementById('digitsResult');
document.getElementById('checkDigitsButton').addEventListener('click', () => {
  const value = digitsInput.value;
  const result = containsOnlyDigits(value);
  digitsResult.textContent = result
    ? `Результат: true — строка "${value}" содержит только цифры.`
    : `Результат: false — строка "${value}" не состоит только из цифр.`;
  console.log(`containsOnlyDigits(${JSON.stringify(value)}) =>`, result);
});

// Задание 2. Каждую секунду выводить сообщение с помощью setInterval.
let messageInterval = null;
const messageStatus = document.getElementById('messageStatus');

const startMessageInterval = () => {
  if (messageInterval !== null) return;
  messageInterval = setInterval(() => {
    console.log('Прошла секунда');
  }, 1000);
  messageStatus.textContent = 'Интервал запущен: «Прошла секунда» выводится каждую секунду.';
};

const stopMessageInterval = () => {
  if (messageInterval !== null) {
    clearInterval(messageInterval);
    messageInterval = null;
  }
  messageStatus.textContent = 'Интервал остановлен.';
};

document.getElementById('startMessageButton').addEventListener('click', startMessageInterval);
document.getElementById('stopMessageButton').addEventListener('click', stopMessageInterval);

// Задание 3. Вывести числа от 1 до 10 каждую секунду и затем остановить интервал.
let countInterval = null;
const countStatus = document.getElementById('countStatus');

const count = () => {
  if (countInterval !== null) {
    clearInterval(countInterval);
  }

  let i = 1;
  countStatus.textContent = 'Отсчёт выполняется… Смотри Console.';
  console.log('Задание 3. Числа от 1 до 10:');

  countInterval = setInterval(() => {
    console.log(i);
    countStatus.textContent = `Последнее выведенное число: ${i}`;

    if (i === 10) {
      clearInterval(countInterval);
      countInterval = null;
      countStatus.textContent = 'Готово: выведены числа от 1 до 10, интервал остановлен.';
    }

    i++;
  }, 1000);
};

document.getElementById('startCountButton').addEventListener('click', count);

// Задание 4. Переключать цвет фона через classList.toggle().
const colorBox = document.getElementById('colorBox');
const toggleBoxColor = () => {
  const isActive = colorBox.classList.toggle('active');
  colorBox.setAttribute('aria-pressed', String(isActive));
};
colorBox.addEventListener('click', toggleBoxColor);
colorBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleBoxColor();
  }
});

// Задание 5. Выполнить GET-запрос к файлу data.json с помощью XMLHttpRequest.
// Запускай страницу через VS Code Live Server, чтобы браузер мог запросить JSON по HTTP.
const loadJsonButton = document.getElementById('loadJsonButton');
const jsonStatus = document.getElementById('jsonStatus');
const jsonOutput = document.getElementById('jsonOutput');

const loadJson = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'data.json', true);
  jsonStatus.textContent = 'Отправлен GET-запрос к data.json…';
  jsonOutput.textContent = 'Загрузка…';

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        console.log('Задание 5. JSON получен с помощью XMLHttpRequest:');
        console.log(data);
        jsonOutput.textContent = JSON.stringify(data, null, 2);
        jsonStatus.textContent = `Успешно! HTTP-статус: ${xhr.status}. Данные выведены в Console.`;
      } catch (error) {
        jsonStatus.textContent = 'Ошибка: ответ сервера не является корректным JSON.';
        jsonOutput.textContent = error.message;
        console.error('Не удалось разобрать JSON:', error);
      }
    } else {
      jsonStatus.textContent = `Ошибка GET-запроса. HTTP-статус: ${xhr.status}. Проверь, что файл data.json существует.`;
      jsonOutput.textContent = xhr.responseText || 'Сервер не вернул данные.';
      console.error('Ошибка GET-запроса. HTTP-статус:', xhr.status);
    }
  };

  xhr.onerror = () => {
    jsonStatus.textContent = 'Не удалось выполнить запрос. Запусти index.html через Live Server в VS Code.';
    jsonOutput.textContent = 'Проверь запуск сервера и наличие файла data.json.';
    console.error('Сетевая ошибка при GET-запросе к data.json. Используй Live Server.');
  };

  xhr.send();
};

loadJsonButton.addEventListener('click', loadJson);

// Выполнить задания 2, 3 и 5 автоматически при открытии страницы.
startMessageInterval();
count();
loadJson();
