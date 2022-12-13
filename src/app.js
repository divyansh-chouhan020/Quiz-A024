console.log('Moazam');
const question = [
  {
    ques: 'Which of the following is the markup Language?',
    a: 'HTML',
    b: 'CSS',
    c: 'JavaScript',
    d: 'PHP',
    correct: 'a',
  },
  {
    ques: 'In Which JavaScript was launched?',
    a: '1995',
    b: '1996',
    c: '1998',
    d: '2000',
    correct: 'b',
  },
  {
    ques: 'What does CSS stands for?',
    a: 'Cascade Style Sheet',
    b: 'Cascading Style Sheet',
    c: 'Hyper Text Markup Lanaguage',
    d: 'Jason object Notation',
    correct: 'b',
  },
];

const total = question.length;
const display = document.querySelector('.box');
const ques = document.querySelector('.Ques');
const options = document.querySelectorAll('.options');
const btn = document.querySelector('.submit');
let index = 0;
let right = 0;
let wrong = 0;
const loadQues = function () {
  if (index !== total) {
    console.log(index);
    let data = question[index];
    console.log(data);
    ques.innerText = `Q${index + 1}) ${data.ques}`;

    options[0].nextElementSibling.innerText = data.a;
    options[1].nextElementSibling.innerText = data.b;
    options[2].nextElementSibling.innerText = data.c;
    options[3].nextElementSibling.innerText = data.d;
  } else {
    endQuiz();
  }
};
const getResult = function () {
  let data = question[index];
  console.log(data);
  const answer = checkAnswer();
  if (answer == data.correct) {
    right++;
  } else {
    wrong++;
  }
  index++;
  reset();
  loadQues();
  return;
};
const reset = () => {
  options.forEach(input => {
    input.checked = false;
  });
};

const checkAnswer = function () {
  let answer;
  options.forEach(input => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};
const endQuiz = () => {
  let html = '';
  if (right === total) {
    html = `Excellent👏`;
  } else if (right == total - 1) {
    html = `Good 👍`;
  } else if (right == total - 2) {
    html = `Satisfactory `;
  } else {
    html = `Better Luck Next time`;
  }
  //   console.log(display);
  display.innerHTML = `<h2 class="head">Thank you for solving the quiz!! </h2>
    <h3 class="marks">Correct Options: ${right}/${total}
    </h3>
    <h2 class="result">${html}</h2>
    `;
};
loadQues();
btn.addEventListener('click', getResult);
