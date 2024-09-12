(() => {
  const INITIAL_COUNT = 4;
  let interval;
  let minutes = 0;
  let seconds = 60;
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  function createNumbersArray(count) {
    const numbersArray = [];
    for (let i = 1; i <= Math.pow(count, 2) / 2; i++) {
      numbersArray.push(i);
      numbersArray.push(i);
    }
    return numbersArray;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * array.length);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function createCards(numbers) {
    const cards = [];

    for (let index in numbers) {
      cards.push({ content: numbers[index], isOpened: false, id: +index + 1, disabled: false });
    }

    return cards;
  }

  function createDomCards(numbers) {
    const cards = document.createElement('ul');
    cards.classList.add('card-list');
    cards.id = 'card-list';

    for (number of numbers) {
      const card = document.createElement('li');
      card.innerText = number.content;
      card.id = number.id;
      card.number = number;

      card.classList.add('card');

      card.addEventListener('click', (event) => {
        const openedAvaliableCards = numbers.filter((number) => number.isOpened && !number.disabled);

        if (openedAvaliableCards.length >= 2) {
          for (let openedCard of openedAvaliableCards) {
            const card = document.getElementById(openedCard.id);
            card.number.isOpened = false;
            card.classList.remove('card-is-opened-true');
          }
        }

        if (openedAvaliableCards.length == 1 && event.target.number.content == openedAvaliableCards[0].content) {
          event.target.number.disabled = true;
          openedAvaliableCards[0].disabled = true;
        }

        event.target.number.isOpened = true;
        event.target.classList.add('card-is-opened-true');


        const openedCards = numbers.filter((number) => number.isOpened && number.disabled);

        if (openedCards.length == numbers.length) {
          const finalTitle = document.getElementById('final-title');
          const finalButton = document.getElementById('final-button');

          finalButton.classList.toggle('hidden');
          finalTitle.classList.toggle('hidden');

          clearInterval(interval);
          minutesElement.innerText = '0' + minutes + " : ";

          if (seconds > 9) {
            secondsElement.innerText = seconds;
          }

          if (seconds <= 9) {
            secondsElement.innerText = '0' + seconds;
          }

          finalButton.addEventListener('click', () => window.location.reload());
        }

      });

      cards.append(card);
    }

    return cards;

  }

  function startTimer() {
    seconds--;
    minutesElement.innerText = '0' + minutes + " : ";

    if (seconds > 9) {
      secondsElement.innerText = seconds;
    }

    if (seconds <= 9) {
      secondsElement.innerText = '0' + seconds;
    }

    if (seconds <= 0) {

      clearInterval(interval);

      minutesElement.innerText = '0' + minutes + " : ";
      secondsElement.innerText = '0' + seconds;

      if (document.getElementsByClassName('card').length > document.getElementsByClassName('card-is-opened-true').length) {
        document.getElementById('loss-title').classList.remove('hidden');
      }

      document.getElementById('final-button').classList.remove('hidden');
      document.getElementById('final-button').addEventListener('click', () => window.location.reload());

      Array.from(document.getElementsByClassName('card')).forEach(card => card.classList.add('blocked-card'));
    }

  }

  function startGame(count) {

    const numbers = shuffle(createNumbersArray(count));
    const cards = createCards(numbers);
    const timer = document.getElementById('timer');

    document.getElementById('start-game-form').classList.add('hidden');

    document.getElementById('timer').classList.remove('hidden');
    timer.after(createDomCards(cards));

    const cardsList = document.getElementById('card-list');
    cardsList.style.columnCount = count;
  }

  function createStartWindow() {

    const form = document.getElementById('start-game-form');

    form.addEventListener('submit', (event) => {

      event.preventDefault();

      if (input.value >= 2 && input.value <= 10 && input.value % 2 === 0) {
        startGame(input.value);
        clearInterval(interval);
        interval = setInterval(startTimer, 1000);
      }
      else {
        input.value = INITIAL_COUNT;
        alert('Введённое значение должно быть чётным от 2 до 10');
      }
    });

  }

  createStartWindow();

})()
