document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('changeColorBtn');
    const colorDisplay = document.getElementById('colorDisplay');

    const randomColorValue = () => Math.floor(Math.random() * 256);

    const updateBackground = () => {
        const r = randomColorValue();
        const g = randomColorValue();
        const b = randomColorValue();
        const rgbString = `rgb(${r}, ${g}, ${b})`;

        document.body.style.backgroundColor = rgbString;
        colorDisplay.textContent = rgbString;
    };

    document.body.style.backgroundColor = 'rgb(255, 255, 255)';

    button.addEventListener('click', updateBackground);
});