document.addEventListener('DOMContentLoaded', () => {
    // ROUTE PROTECTION
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
    // LOGOUT LOGIC
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
    // USER GREETING
    const userGreeting = document.getElementById('userGreeting');
    const userName = localStorage.getItem('loggedInUser');

    if (userGreeting && userName) {
        userGreeting.textContent = `Hi ${userName} 👋`;
    }
    // DECISION ANALYSIS LOGIC
    const moneySlider = document.getElementById('moneySlider');
    const stressSlider = document.getElementById('stressSlider');
    const growthSlider = document.getElementById('growthSlider');

    const moneyValueSpan = document.getElementById('moneyValue');
    const stressValueSpan = document.getElementById('stressValue');
    const growthValueSpan = document.getElementById('growthValue');

    // QUESTION → SLIDER MAPPING (FINAL)
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {

            const moneyValue = document.querySelector('input[name="money"]:checked');
            const stressValue = document.querySelector('input[name="stress"]:checked');
            const growthValue = document.querySelector('input[name="growth"]:checked');

            if (moneyValue) {
                moneySlider.value = moneyValue.value;
                moneyValueSpan.textContent = moneyValue.value;
            }

            if (stressValue) {
                stressSlider.value = stressValue.value;
                stressValueSpan.textContent = stressValue.value;
            }

            if (growthValue) {
                growthSlider.value = growthValue.value;
                growthValueSpan.textContent = growthValue.value;
            }

            checkIfAllAnswered();

            const decisionFactors = document.getElementById('decisionFactors');

            const moneySelected = document.querySelector('input[name="money"]:checked');
            const stressSelected = document.querySelector('input[name="stress"]:checked');
            const growthSelected = document.querySelector('input[name="growth"]:checked');

            if (moneySelected && stressSelected && growthSelected) {
                decisionFactors.classList.remove('hidden');
            }
        });
    });
    //   Analyze button
    analyzeBtn.addEventListener('click', () => {

        decisionFactors.classList.remove('hidden');

        const inlineMsg = document.getElementById('inlineMsg');

        const moneySelected = document.querySelector('input[name="money"]:checked');
        const stressSelected = document.querySelector('input[name="stress"]:checked');
        const growthSelected = document.querySelector('input[name="growth"]:checked');
        const decisionText = document.getElementById('decision').value.trim();

        inlineMsg.textContent = ''; // clear old msg

        if (!moneySelected || !stressSelected || !growthSelected) {
            inlineMsg.textContent = 'Please answer all the questions first.';
            return;
        }

        if (decisionText === '') {
            inlineMsg.textContent = 'Please write what decision you are trying to make.';
            document.getElementById('decision').focus();
            return;
        }

        // ✅ Step 3: All good → analysis continues below

        document.querySelector('.app-container').classList.add('dimmed');

        document.getElementById('resultCard').style.display = 'none';

        document.getElementById('explainText').textContent = '';

        analyzeBtn.textContent = 'Analyzing...';

        setTimeout(() => {
            analyzeBtn.textContent = 'Analyze Again';
            analyzeBtn.disabled = false;

            document.getElementById('resultCard').style.display = 'block';
            const resultCard = document.getElementById('resultCard');
            const resultText = document.getElementById('resultText');

            const money = parseInt(moneySlider.value);
            const stress = parseInt(stressSlider.value);
            const growth = parseInt(growthSlider.value);

            const decisionScore = (money + growth) - stress;

            document.getElementById('scoreText').textContent = 'Decision Score: ' + decisionScore;

            // 🔥 Smooth scroll to result
            document.getElementById('resultCard').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            const insightText = document.getElementById('insightText');

            // HUMAN + INSIGHTFUL RESULT
            if (decisionScore >= 8) {
                resultCard.className = 'result-card yes';
                resultText.textContent = decisionText ?
                    `Based on what you shared about "${decisionText}", this decision looks promising.` :
                    'Based on what you shared, this decision looks promising.';
                document.getElementById('explainText').textContent =
                    'Your financial stability and growth potential outweigh the stress involved.';
                insightText.textContent =
                    'Insight: Strong growth and manageable stress create a favorable balance.';
                document.getElementById('resultIcon').textContent = '✅';

            } else if (decisionScore >= 0) {
                resultCard.className = 'result-card think';
                resultText.textContent = decisionText ?
                    `Thinking about "${decisionText}", this decision needs more clarity.` :
                    'This decision needs more clarity.';
                document.getElementById('explainText').textContent =
                    'You are facing a balance between benefits and pressure.';
                insightText.textContent =
                    'Insight: Pausing or gathering more clarity could improve outcomes.';
                document.getElementById('resultIcon').textContent = '🤔';

            } else {
                resultCard.className = 'result-card no';
                resultText.textContent = decisionText ?
                    `"${decisionText}" might not be the right decision at this time.` :
                    'This might not be the right decision at this time.';
                document.getElementById('explainText').textContent =
                    'The stress involved currently outweighs the benefits.';
                insightText.textContent =
                    'Insight: Reducing stress or risk could change the outcome later.';
                document.getElementById('resultIcon').textContent = '❌';
            }
            document.querySelector('.app-container').classList.remove('dimmed');
        }, 2000);
    });

    //  Reset button 
    const resetBtn = document.getElementById('resetBtn');

    resetBtn.addEventListener('click', () => {

        // Clear decision text
        document.getElementById('decision').value = '';

        // Clear radios
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Reset sliders
        moneySlider.value = 5;
        stressSlider.value = 5;
        growthSlider.value = 5;

        moneyValueSpan.textContent = '5';
        stressValueSpan.textContent = '5';
        growthValueSpan.textContent = '5';

        // Hide decision factors
        document.getElementById('decisionFactors').classList.add('hidden');

        // Hide result
        document.getElementById('resultCard').style.display = 'none';

        // Clear inline message (agar hai)
        const inlineMsg = document.getElementById('inlineMsg');
        if (inlineMsg) inlineMsg.textContent = '';
    });

    // Fade-in animation for question cards
    document.querySelectorAll('.question-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), 200 + i * 150);
        // Pulse animation on radio select
        card.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => {
                card.classList.add('selected');
                setTimeout(() => card.classList.remove('selected'), 400);
            });
        });
    });

});