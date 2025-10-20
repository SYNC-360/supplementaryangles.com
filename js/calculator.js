/* ============================================
   SUPPLEMENTARY ANGLES CALCULATOR
   ============================================ */

/**
 * Calculate the supplement of an angle
 * @param {number} angle - The input angle in degrees
 * @returns {number} The supplementary angle
 */
function calculateSupplement(angle = null) {
    // Get input value if not passed as parameter
    if (angle === null) {
        const input = document.getElementById('angleInput');
        angle = parseFloat(input.value);

        // Validation
        if (isNaN(angle)) {
            showError('Please enter a valid number');
            return;
        }

        if (angle < 0 || angle > 180) {
            showError('Please enter an angle between 0° and 180°');
            return;
        }
    }

    // Calculate supplement
    const supplement = 180 - angle;
    const sum = angle + supplement;

    // Display results
    displayResult(angle, supplement, sum);

    // Clear error message
    clearError();

    // Log to analytics
    logCalculation(angle, supplement);
}

/**
 * Display calculation result
 * @param {number} angle - The input angle
 * @param {number} supplement - The supplementary angle
 * @param {number} sum - The sum (should always be 180)
 */
function displayResult(angle, supplement, sum) {
    const resultSection = document.getElementById('calculatorResult');
    const inputDisplay = document.getElementById('inputAngleDisplay');
    const supplementDisplay = document.getElementById('supplementDisplay');
    const resultVis = document.getElementById('resultVisualization');

    // Update display values
    inputDisplay.textContent = `${formatAngle(angle)}°`;
    supplementDisplay.textContent = `${formatAngle(supplement)}°`;

    // Generate visualization
    generateVisualization(resultVis, angle, supplement);

    // Show result section
    resultSection.classList.remove('hidden');

    // Focus on result for accessibility
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Format angle for display (remove trailing zeros)
 * @param {number} angle - The angle to format
 * @returns {string} Formatted angle string
 */
function formatAngle(angle) {
    // Round to 2 decimal places
    const rounded = Math.round(angle * 100) / 100;
    // Remove trailing zeros
    return rounded.toString();
}

/**
 * Generate SVG visualization of angles
 * @param {SVGElement} svg - The SVG element to draw in
 * @param {number} angle1 - First angle in degrees
 * @param {number} angle2 - Second angle in degrees
 */
function generateVisualization(svg, angle1, angle2) {
    // Clear previous content
    svg.innerHTML = '';

    const viewBoxWidth = 400;
    const viewBoxHeight = 200;
    const centerX = viewBoxWidth / 2;
    const centerY = viewBoxHeight - 30;
    const radius = 50;

    // Set viewBox
    svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', viewBoxWidth);
    bg.setAttribute('height', viewBoxHeight);
    bg.setAttribute('fill', 'white');
    svg.appendChild(bg);

    // Title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', viewBoxWidth / 2);
    title.setAttribute('y', 30);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#0052cc');
    title.textContent = `${formatAngle(angle1)}° + ${formatAngle(angle2)}° = 180°`;
    svg.appendChild(title);

    // Draw first angle
    drawAngle(svg, centerX - 120, centerY, angle1, '#0052cc', 'Angle 1');

    // Draw second angle
    drawAngle(svg, centerX + 120, centerY, angle2, '#28a745', 'Angle 2');

    // Draw supplementary line (straight angle)
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', centerX - 60);
    line.setAttribute('y1', centerY);
    line.setAttribute('x2', centerX + 60);
    line.setAttribute('y2', centerY);
    line.setAttribute('stroke', '#6c757d');
    line.setAttribute('stroke-width', '3');
    svg.appendChild(line);

    const angleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    angleLabel.setAttribute('x', centerX);
    angleLabel.setAttribute('y', centerY + 25);
    angleLabel.setAttribute('text-anchor', 'middle');
    angleLabel.setAttribute('font-size', '14');
    angleLabel.setAttribute('fill', '#6c757d');
    angleLabel.textContent = '180° (Straight Line)';
    svg.appendChild(angleLabel);
}

/**
 * Draw an individual angle in the visualization
 * @param {SVGElement} svg - The SVG element
 * @param {number} centerX - X coordinate of angle center
 * @param {number} centerY - Y coordinate of angle center
 * @param {number} angle - Angle in degrees
 * @param {string} color - Color of the angle arc
 * @param {string} label - Label for the angle
 */
function drawAngle(svg, centerX, centerY, angle, color, label) {
    const radius = 50;

    // Draw baseline
    const baseline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    baseline.setAttribute('x1', centerX);
    baseline.setAttribute('y1', centerY);
    baseline.setAttribute('x2', centerX + radius);
    baseline.setAttribute('y2', centerY);
    baseline.setAttribute('stroke', '#000');
    baseline.setAttribute('stroke-width', '2');
    svg.appendChild(baseline);

    // Convert angle to radians and draw second ray
    const radians = (angle * Math.PI) / 180;
    const endX = centerX + radius * Math.cos(radians);
    const endY = centerY - radius * Math.sin(radians); // Subtract because SVG Y increases downward

    const ray = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    ray.setAttribute('x1', centerX);
    ray.setAttribute('y1', centerY);
    ray.setAttribute('x2', endX);
    ray.setAttribute('y2', endY);
    ray.setAttribute('stroke', color);
    ray.setAttribute('stroke-width', '2');
    svg.appendChild(ray);

    // Draw arc
    const largeArc = angle > 180 ? 1 : 0;
    const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arc.setAttribute('d', `M ${centerX + radius} ${centerY} A ${radius} ${radius} 0 ${largeArc} 0 ${endX} ${endY}`);
    arc.setAttribute('fill', 'none');
    arc.setAttribute('stroke', color);
    arc.setAttribute('stroke-width', '2');
    svg.appendChild(arc);

    // Draw angle label
    const labelAngle = (angle * Math.PI) / 360; // Half angle for label placement
    const labelX = centerX + (radius + 15) * Math.cos(labelAngle);
    const labelY = centerY - (radius + 15) * Math.sin(labelAngle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', labelX);
    text.setAttribute('y', labelY);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '14');
    text.setAttribute('fill', color);
    text.setAttribute('font-weight', 'bold');
    text.textContent = `${formatAngle(angle)}°`;
    svg.appendChild(text);
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    document.getElementById('calculatorResult').classList.add('hidden');
}

/**
 * Clear error message
 */
function clearError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
}

/**
 * Clear calculator form and results
 */
function clearCalculator() {
    document.getElementById('angleInput').value = '';
    document.getElementById('calculatorResult').classList.add('hidden');
    clearError();
    document.getElementById('angleInput').focus();
}

/**
 * Show embed code modal
 */
function showEmbedCode() {
    const modal = document.getElementById('embedModal');
    modal.classList.remove('hidden');
}

/**
 * Close embed code modal
 */
function closeEmbedModal() {
    const modal = document.getElementById('embedModal');
    modal.classList.add('hidden');
}

/**
 * Copy embed code to clipboard
 */
function copyEmbedCode() {
    const embedCode = document.getElementById('embedCode');
    const code = embedCode.textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
        // Show success feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy. Please try again.');
    });
}

/**
 * Share result on social media or via URL
 */
function shareResult() {
    const angle = document.getElementById('inputAngleDisplay').textContent;
    const supplement = document.getElementById('supplementDisplay').textContent;

    const url = `${window.location.origin}/?angle=${angle.replace('°', '')}`;
    const text = `Check out this calculation: ${angle} + ${supplement} = 180° Supplementary angles! 📐`;

    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Supplementary Angles Calculator',
            text: text,
            url: url,
        }).catch((err) => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard and show message
        navigator.clipboard.writeText(url).then(() => {
            alert(`Share this: ${text}\n\nURL copied to clipboard!`);
        });
    }
}

/**
 * Log calculation for analytics
 * @param {number} angle - Input angle
 * @param {number} supplement - Supplementary angle
 */
function logCalculation(angle, supplement) {
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_used', {
            'angle': angle,
            'supplement': supplement,
            'event_category': 'engagement',
        });
    }

    // Log to console for development
    console.log(`Calculation: ${angle}° + ${supplement}° = 180°`);
}

/**
 * Initialize calculator on page load
 */
function initCalculator() {
    const input = document.getElementById('angleInput');
    const calculateBtn = document.getElementById('calculateBtn');

    // Enter key to calculate
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateSupplement();
            }
        });
    }

    // Check for URL parameters (for sharing)
    const urlParams = new URLSearchParams(window.location.search);
    const angle = urlParams.get('angle');

    if (angle && !isNaN(angle)) {
        input.value = angle;
        calculateSupplement();
    }

    // Close modal when clicking outside
    const modal = document.getElementById('embedModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeEmbedModal();
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}

/**
 * Export for embeddable version
 */
if (typeof window.SupplementaryAnglesCalculator === 'undefined') {
    window.SupplementaryAnglesCalculator = {
        calculate: calculateSupplement,
        init: initCalculator,
    };
}
