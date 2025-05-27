document.addEventListener('DOMContentLoaded', () => {
    const glitchTitle = document.getElementById('glitch-title');
    const glitchText = document.getElementById('glitch-text');

    // Store the original text for glitch effects
    glitchTitle.setAttribute('data-text', glitchTitle.innerText);
    glitchText.setAttribute('data-text', glitchText.innerText);

    // Function to apply a temporary glitch effect
    function applyGlitch(element) {
        const originalText = element.getAttribute('data-text');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?';
        let glitchCount = 0;
        const maxGlitches = 5; // How many times it glitches before returning to normal

        const glitchInterval = setInterval(() => {
            if (glitchCount >= maxGlitches) {
                element.innerText = originalText; // Revert to original
                clearInterval(glitchInterval);
                return;
            }

            let newText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.3) { // 30% chance to glitch a character
                    newText += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    newText += originalText[i];
                }
            }
            element.innerText = newText;
            glitchCount++;
        }, 100); // Faster flicker

        // Revert after a short duration if not already reverted
        setTimeout(() => {
            if (glitchCount < maxGlitches) {
                element.innerText = originalText;
                clearInterval(glitchInterval);
            }
        }, maxGlitches * 100 + 200); // Ensure it reverts even if interval is cleared early
    }

    // Initial glitch on load
    applyGlitch(glitchTitle);
    applyGlitch(glitchText);

    // Make the glitch effect re-trigger on hover for a subtle interaction
    glitchTitle.addEventListener('mouseover', () => applyGlitch(glitchTitle));
    glitchText.addEventListener('mouseover', () => applyGlitch(glitchText));

    // Optional: Add a continuous, subtle random glitch for the text
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 2 seconds
            applyGlitch(glitchText);
        }
    }, 2000);

    // Optional: Add a continuous, subtle random glitch for the title
    setInterval(() => {
        if (Math.random() < 0.05) { // 5% chance every 3 seconds
            applyGlitch(glitchTitle);
        }
    }, 3000);

});