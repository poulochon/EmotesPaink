let images = [];

// Charger la liste des images dynamiquement depuis images.json
fetch("images.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des images.json");
        }
        return response.json();
    })
    .then(data => {
        images = data;
        loadRandomImage(); // Charger la première image une fois les données prêtes
    })
    .catch(error => console.error("Erreur :", error));

// Variables globales pour suivre l'état du jeu
let currentImageIndex = -1;
let correctCount = 0;
let wrongCount = 0;
let streakCount = 0;

// Sélecteurs pour les éléments HTML
const quizImage = document.getElementById("quiz-image");
const answerInput = document.getElementById("answer-input");
const validateBtn = document.getElementById("validate-btn");
const revealBtn = document.getElementById("reveal-btn");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const correctCountElem = document.getElementById("correct-count");
const wrongCountElem = document.getElementById("wrong-count");
const streakCountElem = document.getElementById("streak-count");
const galleryContainer = document.getElementById("gallery-container");
const toggleThemeBtn = document.getElementById("toggle-theme");

// Fonction pour afficher une nouvelle image aléatoire
function loadRandomImage() {
    if (images.length === 0) {
        console.error("Aucune image disponible.");
        return;
    }

    currentImageIndex = Math.floor(Math.random() * images.length);
    quizImage.src = `img/${images[currentImageIndex]}`;
    quizImage.alt = images[currentImageIndex];
    answerInput.value = "";
    feedback.textContent = "";
    nextBtn.style.display = "none";
}

// Fonction pour valider la réponse
function validateAnswer() {
    const userAnswer = answerInput.value.trim();
    const correctAnswer = images[currentImageIndex];

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Bonne réponse ! ✅";
        feedback.style.color = "green";
        correctCount++;
        streakCount++;
    } else {
        feedback.textContent = `Mauvaise réponse. ❌ La bonne réponse était : ${correctAnswer}`;
        feedback.style.color = "red";
        wrongCount++;
        streakCount = 0;
    }

    // Mettre à jour les compteurs
    correctCountElem.textContent = correctCount;
    wrongCountElem.textContent = wrongCount;
    streakCountElem.textContent = streakCount;

    nextBtn.style.display = "block";
}

// Fonction pour révéler la réponse
function revealAnswer() {
    feedback.textContent = `La réponse est : ${images[currentImageIndex]}`;
    feedback.style.color = "blue";
    nextBtn.style.display = "block";
}

// Fonction pour basculer entre le mode clair et sombre
function toggleTheme() {
    document.body.classList.toggle("dark");
    toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "☀️ Mode Clair" : "🌙 Mode Sombre";
}

// Fonction pour afficher la galerie d'images
function displayGallery() {
    if (galleryContainer) {
        images.forEach(image => {
            const imgElem = document.createElement("img");
            imgElem.src = `img/${image}`;
            imgElem.alt = image;
            imgElem.style.margin = "10px";
            imgElem.style.maxWidth = "150px";

            const caption = document.createElement("p");
            caption.textContent = image;

            const imageContainer = document.createElement("div");
            imageContainer.style.display = "inline-block";
            imageContainer.style.textAlign = "center";

            imageContainer.appendChild(imgElem);
            imageContainer.appendChild(caption);
            galleryContainer.appendChild(imageContainer);
        });
    }
}

// Événements pour le quiz
if (validateBtn) {
    validateBtn.addEventListener("click", validateAnswer);
}
if (revealBtn) {
    revealBtn.addEventListener("click", revealAnswer);
}
if (nextBtn) {
    nextBtn.addEventListener("click", loadRandomImage);
}

// Initialiser la galerie si sur la page correspondante
if (galleryContainer) {
    displayGallery();
}

// Initialiser le quiz si sur la page correspondante
if (quizImage) {
    // L'image sera chargée après la récupération de images.json
}

// Événement pour le mode sombre/clair
if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", toggleTheme);
}
