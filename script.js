const quizData = [
  {
    q: "As a homeroom teacher, what matters most?",
    options: [
      { text: "Discipline and responsibility", type: "responsible" },
      { text: "Emotional support and trust", type: "supportive" },
      { text: "Guiding students academically", type: "academic" }
    ]
  },
  {
    q: "When students face problems, a homeroom teacher should…",
    options: [
      { text: "Set clear rules", type: "responsible" },
      { text: "Listen and understand", type: "supportive" },
      { text: "Help them solve the problem", type: "academic" }
    ]
  },
  {
    q: "A good homeroom class feels like…",
    options: [
      { text: "Organized and structured", type: "responsible" },
      { text: "Safe and friendly", type: "supportive" },
      { text: "Motivating and inspiring", type: "academic" }
    ]
  }
];

let index = 0;
let selected = null;
let score = { supportive: 0, responsible: 0, academic: 0 };

const quiz = document.getElementById("quiz");
const btn = document.getElementById("nextBtn");

function loadQuestion() {
  selected = null;
  const q = quizData[index];
  quiz.innerHTML = `
    <div class="question">${q.q}</div>
    ${q.options.map((o,i) =>
      `<div class="option" onclick="choose(${i})">${o.text}</div>`
    ).join("")}
  `;
}

window.choose = function(i) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  document.querySelectorAll(".option")[i].classList.add("selected");
  selected = quizData[index].options[i].type;
};

btn.onclick = () => {
  if (!selected) return;
  score[selected]++;
  index++;
  if (index < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  const type = Object.keys(score).reduce((a,b) => score[a] > score[b] ? a : b);

  const results = {
    supportive: {
      title: "The Supportive Mentor",
      text: "You create a safe and caring environment where students feel understood.",
      img: "images/supportive.png"
    },
    responsible: {
      title: "The Responsible Guide",
      text: "You emphasize discipline, responsibility, and clear expectations.",
      img: "images/responsible.png"
    },
    academic: {
      title: "The Academic Encourager",
      text: "You motivate students to grow, learn, and achieve their goals.",
      img: "images/academic.png"
    }
  };

  quiz.innerHTML = `
    <img src="${results[type].img}" class="result-img">
    <div class="result-title">${results[type].title}</div>
    <div class="result-text">${results[type].text}</div>
  `;
  btn.style.display = "none";
}

loadQuestion();
