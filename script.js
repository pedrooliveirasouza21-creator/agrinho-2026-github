// ==================== QUIZ DATA ==================== 
const quizQuestions = [
    {
        question: "Qual das seguintes ações mais contribui para a poupança de água em casa?",
        options: [
            { text: "A) Deixar a torneira aberta enquanto se lavam os dentes.", correct: false },
            { text: "B) Fechar a torneira enquanto se ensaboa as mãos ou os dentes.", correct: true },
            { text: "C) Lavar o carro com a mangueira todos os dias.", correct: false },
            { text: "D) Tomar banhos de imersão longos diariamente.", correct: false }
        ]
    },
    {
        question: "Qual atitude ajuda a preservar o meio ambiente?",
        options: [
            { text: "a) Deixar a torneira aberta sem necessidade", correct: false },
            { text: "b) Jogar lixo nas ruas", correct: false },
            { text: "c) Reciclar papel, plástico e vidro", correct: true },
            { text: "d) Queimar folhas secas na rua", correct: false }
        ]
    },
    {
        question: "O que significa o conceito dos '3 Rs' da sustentabilidade?",
        options: [
            { text: "A) Reduzir, Reutilizar e Reciclar.", correct: true },
            { text: "B) Recolher, Esconder e Reter.", correct: false },
            { text: "C) Rapidez, Força e Riqueza.", correct: false },
            { text: "D) Reparar, Comprar e Reclamar.", correct: false }
        ]
    },
    {
        question: "Qual das seguintes fontes de energia é considerada limpa e renovável?",
        options: [
            { text: "A) O carvão.", correct: false },
            { text: "B) O petróleo.", correct: false },
            { text: "C) A energia solar.", correct: true },
            { text: "D) O gás natural.", correct: false }
        ]
    },
    {
        question: "Qual é o benefício de plantar árvores na cidade?",
        options: [
            { text: "a) Aumenta a poluição", correct: false },
            { text: "b) Proporciona sombra, ar mais limpo e melhora o clima", correct: true },
            { text: "c) Aumenta o lixo", correct: false },
            { text: "d) Diminui o espaço para brincar", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// ==================== DARK MODE ==================== 
const darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    updateIconColor();
}

function updateIconColor() {
    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Load dark mode preference on page load
window.addEventListener('load', () => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    if (darkModePreference) {
        document.body.classList.add('dark-mode');
        updateIconColor();
    }
});

// ==================== ACCESSIBILITY ==================== 
const accessibilityBtn = document.getElementById('acessibilidadeBtn');
const accessibilityModal = document.getElementById('accessibilityModal');
const increaseFont = document.getElementById('increaseFont');
const highContrast = document.getElementById('highContrast');
const textToSpeech = document.getElementById('textToSpeech');

accessibilityBtn.addEventListener('click', () => {
    accessibilityModal.classList.remove('hidden');
});

increaseFont.addEventListener('change', () => {
    if (increaseFont.checked) {
        document.body.classList.add('large-font');
        localStorage.setItem('largeFont', 'true');
    } else {
        document.body.classList.remove('large-font');
        localStorage.setItem('largeFont', 'false');
    }
});

highContrast.addEventListener('change', () => {
    if (highContrast.checked) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('highContrast', 'true');
    } else {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('highContrast', 'false');
    }
});

textToSpeech.addEventListener('change', () => {
    localStorage.setItem('textToSpeech', textToSpeech.checked);
});

// Load accessibility preferences
window.addEventListener('load', () => {
    if (localStorage.getItem('largeFont') === 'true') {
        document.body.classList.add('large-font');
        increaseFont.checked = true;
    }
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
        highContrast.checked = true;
    }
    if (localStorage.getItem('textToSpeech') === 'true') {
        textToSpeech.checked = true;
    }
});

// ==================== CREDITS MODAL ==================== 
const creditsBtn = document.getElementById('creditosBtn');
const creditsModal = document.getElementById('creditsModal');

creditsBtn.addEventListener('click', () => {
    creditsModal.classList.remove('hidden');
});

// Close modals
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
    }
});

// ==================== SMOOTH SCROLL & ANIMATIONS ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== HAMBURGER MENU ==================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== QUIZ FUNCTIONALITY ==================== 
let speechSynthesis = window.speechSynthesis;

function initializeQuiz() {
    displayQuestion();
}

function displayQuestion() {
    const quiz = document.getElementById('quizContent');
    const question = quizQuestions[currentQuestion];
    
    let optionsHTML = '<div class="quiz-options">';
    question.options.forEach((option, index) => {
        optionsHTML += `
            <label class="quiz-option">
                <input type="radio" name="answer" value="${index}" data-correct="${option.correct}">
                <span>${option.text}</span>
            </label>
        `;
    });
    optionsHTML += '</div>';

    quiz.innerHTML = `
        <div class="quiz-question">
            <h4>${question.question}</h4>
            ${optionsHTML}
            <button class="btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="submitAnswer()">Responder</button>
        </div>
    `;

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedAnswer = e.target.value;
        });
    });

    updateProgress();
    
    // Text to speech
    if (localStorage.getItem('textToSpeech') === 'true') {
        speakQuestion(question.question);
    }
}

function speakQuestion(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

function submitAnswer() {
    if (selectedAnswer === null) {
        alert('Por favor, selecione uma resposta!');
        return;
    }

    const question = quizQuestions[currentQuestion];
    const isCorrect = question.options[selectedAnswer].correct;
    
    if (isCorrect) {
        score++;
    }

    showResult(isCorrect);
}

function showResult(isCorrect) {
    const resultContainer = document.getElementById('quizResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');

    if (isCorrect) {
        resultTitle.textContent = '✓ Correto!';
        resultTitle.style.color = '#28a745';
        resultMessage.textContent = 'Excelente! Você acertou a pergunta!';
    } else {
        resultTitle.textContent = '✗ Incorreto!';
        resultTitle.style.color = '#dc3545';
        resultMessage.textContent = `Desculpe, a resposta correta é: ${quizQuestions[currentQuestion].options.find(opt => opt.correct).text}`;
    }

    document.getElementById('quizContent').classList.add('hidden');
    resultContainer.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    selectedAnswer = null;

    if (currentQuestion < quizQuestions.length) {
        document.getElementById('quizResult').classList.add('hidden');
        document.getElementById('quizContent').classList.remove('hidden');
        displayQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('quizFinal').classList.remove('hidden');

    const percentage = Math.round((score / quizQuestions.length) * 100);
    document.getElementById('finalScoreNum').textContent = score;
    document.getElementById('finalPercentage').textContent = `${percentage}%`;

    if (percentage === 100) {
        document.querySelector('.final-card h3').textContent = '🏆 Perfeito!';
    } else if (percentage >= 80) {
        document.querySelector('.final-card h3').textContent = '⭐ Excelente!';
    } else if (percentage >= 60) {
        document.querySelector('.final-card h3').textContent = '👍 Bom!';
    } else {
        document.querySelector('.final-card h3').textContent = '📚 Continue estudando!';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    document.getElementById('quizFinal').classList.add('hidden');
    document.getElementById('quizContent').classList.remove('hidden');
    displayQuestion();
}

// Initialize quiz on page load
window.addEventListener('load', () => {
    initializeQuiz();
});

// ==================== PRICE TABS ==================== 
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tabName = e.target.getAttribute('data-tab');
        
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        document.getElementById(tabName).classList.add('active');
        e.target.classList.add('active');
    });
});

// Set first tab as active by default
window.addEventListener('load', () => {
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }
});

// ==================== UTILITY FUNCTIONS ==================== 
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    
    progressFill.style.width = progress + '%';
    progressText.textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
}