const quizData = [
  {
    q: "When students are noisy, you...",
    options: [
      ["Talk calmly", "supportive"],
      ["Set clear rules", "responsible"],
      ["Turn it into a lesson", "academic"]
    ]
  },
  {
    q: "Your homework style?",
    options: [
      ["Optional but meaningful", "supportive"],
      ["Always on time", "responsible"],
      ["Challenging problems", "academic"]
    ]
  },
  {
    q: "Students see you as...",
    options: [
      ["A safe space", "supportive"],
      ["A leader", "responsible"],
      ["A mentor", "academic"]
    ]
  }
];

let index = 0;
let selected = null;
let score = {
  supportive: 0,
  responsible: 0,
  academic: 0
};

const quiz = document.getElementById("quiz");
const btn = document.getElementById("nextBtn");

function startQuiz() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  selected = null;
  const q = quizData[index];
  quiz.innerHTML = `
    <h2>${q.q}</h2>
    ${q.options.map((o,i)=>`
      <div class="option" onclick="choose('${o[1]}', this)">
        ${o[0]}
      </div>
    `).join("")}
  `;
}

function choose(type, el) {
  document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"));
  el.classList.add("selected");
  selected = type;
}

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
  const type = Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b);

  const results = {
    supportive: {
      title: "The Supportive Mentor",
      text: "You create a safe, warm classroom where students feel understood.",
      img: "images/teacher1.PNG"
    },
    responsible: {
      title: "The Responsible Guide",
      text: "You bring structure, discipline, and trust to your class.",
      img: "images/teacher2.PNG"
    },
    academic: {
      title: "The Academic Inspirer",
      text: "You push students to think deeper and aim higher.",
      img: "images/teacher3.PNG"
    }
  };

  quiz.innerHTML = `
    <img src="${results[type].img}" class="result-img">
    <h2>${results[type].title}</h2>
    <p>${results[type].text}</p>
  `;
  btn.style.display = "none";
}
