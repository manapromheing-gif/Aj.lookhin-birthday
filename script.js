const quizData = [
  {
    q: "When students are noisy, you...",
    options: [
      { text: "Talk calmly", type: "supportive" },
      { text: "Set clear rules", type: "responsible" },
      { text: "Turn it into a lesson", type: "academic" }
    ]
  },
  {
    q: "Your main goal as a teacher?",
    options: [
      { text: "Students feel safe", type: "supportive" },
      { text: "Discipline & order", type: "responsible" },
      { text: "Academic success", type: "academic" }
    ]
  }
];

let index = 0;
let selected = null;
let score = { supportive: 0, responsible: 0, academic: 0 };

const intro = document.getElementById("intro");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

function startQuiz() {
  intro.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  selected = null;
  questionEl.textContent = quizData[index].q;
  optionsEl.innerHTML = "";

  quizData[index].options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt.text;
    div.onclick = () => choose(i, div);
    optionsEl.appendChild(div);
  });
}

function choose(i, el) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  selected = quizData[index].options[i].type;
}

nextBtn.onclick = () => {
  if (!selected) return;
  score[selected]++;
  index++;
  if (index < quizData.length) loadQuestion();
  else showResult();
};

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const type = Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b);

  const results = {
    supportive: {
      title: "The Supportive Mentor",
      img: "images/teacher2.PNG",
      text: "Warm, caring, and always there."
    },
    responsible: {
      title: "The Responsible Guide",
      img: "images/teacher1.PNG",
      text: "Structure, rules, and respect."
    },
    academic: {
      title: "The Academic Encourager",
      img: "images/teacher3.PNG",
      text: "Knowledge is power."
    }
  };

  resultBox.innerHTML = `
    <img src="${results[type].img}" class="result-img">
    <h2>${results[type].title}</h2>
    <p>${results[type].text}</p>
  `;
}
