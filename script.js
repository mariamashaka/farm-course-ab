// Language data
const translations = {
    en: {
        'Safe Antibiotics Training': 'Safe Antibiotics Training',
        'Safe Use of Antibiotics in Children: Training for Pharmacists': 'Safe Use of Antibiotics in Children: Training for Pharmacists',
        'Your Progress': 'Your Progress',
        '45 / 395 Points Earned': '45 / 395 Points Earned',
        '15% Complete': '15% Complete',
        'Module 1: Dosage Calculations': 'Module 1: Dosage Calculations',
        'Learning Objective:': 'Learning Objective:',
        'objective_text': 'To teach pharmacists how to correctly calculate drug doses for children, convert mg to ml, calculate mg per kg, work with different concentrations, and verify medication sufficiency for complete treatment courses.',
        'Lesson 1.1: Converting mg to ml - calculating correctly': 'Lesson 1.1: Converting mg to ml - calculating correctly',
        'Lesson 1.2: When to prescribe antibiotics + calculating mg/kg': 'Lesson 1.2: When to prescribe antibiotics + calculating mg/kg',
        'Lesson 1.3: Antibiotic selection + common errors': 'Lesson 1.3: Antibiotic selection + common errors',
        'Lesson 1.4: Double control': 'Lesson 1.4: Double control',
        '25 minutes': '25 minutes',
        '30 minutes': '30 minutes',
        '25 minutes': '25 minutes',
        '20 minutes': '20 minutes',
        'Start Lesson': 'Start Lesson',
        'Continue': 'Continue',
        'Locked': 'Locked',
        '15 points': '15 points',
        '20 points': '20 points',
        '25 points': '25 points',
        'DEMO': 'DEMO'
    },
    sw: {
        'Safe Antibiotics Training': 'Mafunzo ya Antibiotics Salama',
        'Safe Use of Antibiotics in Children: Training for Pharmacists': 'Matumizi Salama ya Antibiotics kwa Watoto: Mafunzo kwa Wachuuzi wa Dawa',
        'Your Progress': 'Maendeleo Yako',
        '45 / 395 Points Earned': 'Alama 45 / 395 Zimepata',
        '15% Complete': '15% Imekamilika',
        'Module 1: Dosage Calculations': 'Sehemu ya 1: Mahesabu ya Kipimo',
        'Learning Objective:': 'Lengo la Kujifunza:',
        'objective_text': 'Kuwafundisha wachuuzi wa dawa jinsi ya kuhesabu vizuri kipimo cha dawa kwa watoto, kubadilisha mg kuwa ml, kuhesabu mg kwa kilo, kufanya kazi na mkusanyiko tofauti, na kuthibitisha kutosha kwa dawa kwa mzunguko kamili wa matibabu.',
        'Lesson 1.1: Converting mg to ml - calculating correctly': 'Somo 1.1: Kubadilisha mg kuwa ml - kuhesabu kwa usahihi',
        'Lesson 1.2: When to prescribe antibiotics + calculating mg/kg': 'Somo 1.2: Wakati wa kuagiza antibiotics + kuhesabu mg/kg',
        'Lesson 1.3: Antibiotic selection + common errors': 'Somo 1.3: Kuchagua antibiotic + makosa ya kawaida',
        'Lesson 1.4: Double control': 'Somo 1.4: Udhibiti mkuu',
        '25 minutes': 'dakika 25',
        '30 minutes': 'dakika 30',
        '20 minutes': 'dakika 20',
        'Start Lesson': 'Anza Somo',
        'Continue': 'Endelea',
        'Locked': 'Imefungwa',
        '15 points': 'alama 15',
        '20 points': 'alama 20',
        '25 points': 'alama 25',
        'DEMO': 'MFANO'
    }
};

let currentLanguage = 'en';
let userProgress = {
    completedLessons: [],
    totalPoints: 45,
    currentLesson: '1.1'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    updateLanguage();
});

// Language switching
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.getAttribute(`data-${currentLanguage}`);
        if (key && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Progress management
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (userProgress.totalPoints / 395) * 100;
    progressFill.style.width = `${percentage}%`;
}

// Lesson management
function startLesson(lessonId) {
    // For demo, we'll only allow lesson 1.1
    if (lessonId === '1.1') {
        window.location.href = `course-lessons/lesson-1-1.html?lang=${currentLanguage}`;
    } else {
        alert(currentLanguage === 'en' ? 'This lesson is not yet available in the demo.' : 'Somo hili bado halipo katika mfano.');
    }
}

function isLessonUnlocked(lessonId) {
    // Demo logic - only 1.1 is unlocked
    return lessonId === '1.1';
}

function getLessonStatus(lessonId) {
    if (userProgress.completedLessons.includes(lessonId)) {
        return 'completed';
    } else if (isLessonUnlocked(lessonId)) {
        return 'available';
    } else {
        return 'locked';
    }
}

// Update lesson cards based on progress
function updateLessonCards() {
    const lessons = ['1.1', '1.2', '1.3', '1.4'];
    
    lessons.forEach(lessonId => {
        const card = document.querySelector(`[data-lesson="${lessonId}"]`);
        const status = getLessonStatus(lessonId);
        const button = card.querySelector('.start-btn');
        const icon = card.querySelector('.status-icon');
        
        card.className = `lesson-card ${status === 'locked' ? 'locked' : ''}`;
        
        if (status === 'completed') {
            icon.className = 'status-icon status-completed';
            icon.textContent = '✓';
            button.textContent = currentLanguage === 'en' ? 'Review' : 'Hakiki';
        } else if (status === 'available') {
            icon.className = 'status-icon status-available';
            icon.textContent = '▶';
            button.textContent = currentLanguage === 'en' ? 'Start Lesson' : 'Anza Somo';
            button.disabled = false;
        } else {
            icon.className = 'status-icon status-locked';
            icon.textContent = '🔒';
            button.textContent = currentLanguage === 'en' ? 'Locked' : 'Imefungwa';
            button.disabled = true;
        }
    });
}

// Call this when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    updateLanguage();
    updateLessonCards();
});
