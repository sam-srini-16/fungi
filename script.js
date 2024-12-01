let mushrooms = [];
let edibleMushrooms = [];
let poisonousMushrooms = [];

async function loadMushrooms() {
    try {
        const response = await fetch('mushrooms.json');
        const mushrooms = await response.json();
        return mushrooms;
    } catch (error) {
        console.error('Error loading mushrooms data:', error);
        return [];
    }
}

async function mainEvent() {

    document.getElementById('edibility-form')
        .addEventListener('submit', (event) => {
            event.preventDefault();
            const probability = calculateProbabilitySafeToEat();
            console.log('Probability:', probability);
        });

    mushrooms = await loadMushrooms();
    edibleMushrooms = mushrooms.filter(mushroom => mushroom["class"] === "e");
    poisonousMushrooms = mushrooms.filter(mushroom => mushroom["class"] === "p");
}

function calculateProbabilitySafeToEat() {
    // Get selected values from form
    const capShape = document.querySelector('input[name="cap-shape"]:checked')?.value;
    const capColor = document.querySelector('input[name="cap-color"]:checked')?.value;
    const capSurface = document.querySelector('input[name="cap-surface"]:checked')?.value;
    const stalkShape = document.querySelector('input[name="stalk-shape"]:checked')?.value;

    if (!capShape || !capColor || !capSurface || !stalkShape) {
        alert('Please fill in all fields');
        return 0;
    }

    function getProbabilityEdible(property, value) {
        const safe = edibleMushrooms.filter(mushroom => mushroom[property] === value).length;
        const unsafe = poisonousMushrooms.filter(mushroom => mushroom[property] === value).length;
        return safe / (safe + unsafe);
    }

    const probabilityCapShape = getProbabilityEdible("cap-shape", capShape);
    const probabilityCapColor = getProbabilityEdible("cap-color", capColor);
    const probabilityCapSurface = getProbabilityEdible("cap-surface", capSurface);
    const probabilityStalkShape = getProbabilityEdible("stalk-shape", stalkShape);

    console.log(probabilityCapShape, probabilityCapColor, probabilityCapSurface, probabilityStalkShape);

    return (probabilityCapShape * probabilityCapColor
        * probabilityCapSurface * probabilityStalkShape);
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());