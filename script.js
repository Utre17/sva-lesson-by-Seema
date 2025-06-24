// Enhanced Interactive Script for Subject-Verb Agreement Lessons
// Handles hint toggles, answer checking, and all interactive behaviors

// Global variables for tracking progress
let userProgress = {
    hintsUsed: 0,
    exercisesCompleted: 0,
    correctAnswers: 0,
    totalQuestions: 0
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeHints();
    initializeProgressTracking();
});

// Hint System
function initializeHints() {
    // Handle hint button clicks
    document.querySelectorAll('[data-hint]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const hintId = this.getAttribute('data-hint');
            const hintElement = document.getElementById(hintId);
            
            if (hintElement) {
                if (hintElement.style.display === 'none' || hintElement.style.display === '') {
                    hintElement.style.display = 'block';
                    this.textContent = 'Hide Hint';
                    this.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
                    userProgress.hintsUsed++;
                } else {
                    hintElement.style.display = 'none';
                    this.textContent = 'Hint';
                    this.style.background = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)';
                }
            }
        });
    });
}

// Progress Tracking
function initializeProgressTracking() {
    // Track when users start exercises
    const exerciseElements = document.querySelectorAll('.exercise');
    exerciseElements.forEach(exercise => {
        exercise.addEventListener('click', function() {
            userProgress.exercisesCompleted++;
        });
    });
}

// Original guided practice answers (for backward compatibility)
const answers = {
    q1: "sings",
    q2: "play", 
    q3: "explains"
};

const hintTexts = {
    q1: "Hint: Singular subject = verb with -s (e.g., He ___).",
    q2: "Hint: Plural subject = verb with no -s (e.g., They ___).",
    q3: "Hint: Singular subject = verb with -s."
};

// Enhanced Answer Checking System
function checkAnswers(answerKey, questionPrefix = 'q', resultPrefix = 'a') {
    let correct = 0;
    let total = Object.keys(answerKey).length;
    
    for (const questionId in answerKey) {
        const userAnswer = getUserAnswer(questionId);
        const resultElement = document.getElementById(resultPrefix + questionId.slice(1));
        
        if (resultElement) {
            if (userAnswer.toLowerCase() === answerKey[questionId].toLowerCase()) {
                resultElement.innerHTML = '<span class="correct">✓ Correct!</span>';
                correct++;
            } else if (userAnswer === "") {
                resultElement.innerHTML = '<span class="incorrect">Please provide an answer</span>';
            } else {
                resultElement.innerHTML = `<span class="incorrect">✗ Try "${answerKey[questionId]}"</span>`;
            }
        }
    }
    
    // Update progress
    userProgress.correctAnswers += correct;
    userProgress.totalQuestions += total;
    
    return { correct, total, percentage: Math.round((correct / total) * 100) };
}

// Get user answer from various input types
function getUserAnswer(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return "";
    
    if (element.tagName === 'INPUT') {
        return element.value.trim();
    } else if (element.tagName === 'SELECT') {
        return element.value;
    } else if (element.tagName === 'TEXTAREA') {
        return element.value.trim();
    }
    return "";
}

// Original check button functionality (for backward compatibility)
document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById("checkBtn");
    if (checkBtn) {
        checkBtn.addEventListener("click", function() {
            for (const id in answers) {
                const userAnswer = getUserAnswer(id);
                const resultElement = document.getElementById("a" + id.slice(1));
                
                if (resultElement) {
                    if (userAnswer.toLowerCase() === answers[id].toLowerCase()) {
                        resultElement.textContent = "✔ Correct";
                        resultElement.className = "correct";
                    } else {
                        resultElement.textContent = `✘ Incorrect (Answer: ${answers[id]})`;
                        resultElement.className = "incorrect";
                    }
                }
            }
        });
    }
});

// Utility Functions for Enhanced Interactivity

// Show success message with animation
function showSuccessMessage(message, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="success-animation correct">${message}</div>`;
        
        // Add animation effect
        const successElement = container.querySelector('.success-animation');
        if (successElement) {
            successElement.style.transform = 'scale(0.8)';
            successElement.style.opacity = '0';
            setTimeout(() => {
                successElement.style.transform = 'scale(1)';
                successElement.style.opacity = '1';
                successElement.style.transition = 'all 0.3s ease';
            }, 100);
        }
    }
}

// Show error message with shake animation
function showErrorMessage(message, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="error-animation incorrect">${message}</div>`;
        
        // Add shake animation
        const errorElement = container.querySelector('.error-animation');
        if (errorElement) {
            errorElement.style.animation = 'shake 0.5s ease-in-out';
        }
    }
}

// Progress indicator
function updateProgressIndicator() {
    const progressElements = document.querySelectorAll('.progress-indicator');
    progressElements.forEach(element => {
        const percentage = userProgress.totalQuestions > 0 
            ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100)
            : 0;
        element.textContent = `Progress: ${percentage}% (${userProgress.correctAnswers}/${userProgress.totalQuestions})`;
    });
}

// Celebration effects for achievements
function triggerCelebration() {
    // Create confetti effect (simple version)
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉 🌟 🎯 ✨ 🎊';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        z-index: 1000;
        animation: celebration 2s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        document.body.removeChild(celebration);
    }, 2000);
}

// Add CSS animations for enhanced interactions
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes celebration {
        0% { 
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    .success-animation {
        animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(styleSheet);

// Enhanced feedback system
function provideFeedback(score, total) {
    const percentage = Math.round((score / total) * 100);
    let message = "";
    let emoji = "";
    
    if (percentage >= 90) {
        message = "Outstanding work! You've mastered this concept!";
        emoji = "🌟";
        triggerCelebration();
    } else if (percentage >= 80) {
        message = "Excellent job! You're doing great!";
        emoji = "🎯";
    } else if (percentage >= 70) {
        message = "Good work! Keep practicing to improve further.";
        emoji = "👍";
    } else if (percentage >= 60) {
        message = "You're getting there! Review the hints and try again.";
        emoji = "💪";
    } else {
        message = "Don't give up! Review the rules and practice more.";
        emoji = "📚";
    }
    
    return `${emoji} ${message} (Score: ${score}/${total} - ${percentage}%)`;
}

// Local storage for progress persistence
function saveProgress() {
    localStorage.setItem('subjectVerbProgress', JSON.stringify(userProgress));
}

function loadProgress() {
    const saved = localStorage.getItem('subjectVerbProgress');
    if (saved) {
        userProgress = { ...userProgress, ...JSON.parse(saved) };
    }
}

// Initialize progress loading
document.addEventListener('DOMContentLoaded', loadProgress);
window.addEventListener('beforeunload', saveProgress);

// Export functions for global access
window.checkAnswers = checkAnswers;
window.showSuccessMessage = showSuccessMessage;
window.showErrorMessage = showErrorMessage;
window.updateProgressIndicator = updateProgressIndicator;
window.triggerCelebration = triggerCelebration;
window.provideFeedback = provideFeedback;
  