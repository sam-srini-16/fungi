// constants
const LEGEND =  {
    'cap-shape': {
        'b': 'Bell',
        'c': 'Conical',
        'x': 'Convex',
        'f': 'Flat',
        'k': 'Knobbed',
        's': 'Sunken'
    },
    'cap-surface': {
        'f': 'Fibrous',
        'g': 'Grooves',
        'y': 'Scaly',
        's': 'Smooth'
    },
    'cap-color': {
        'n': 'Brown',
        'b': 'Buff',
        'c': 'Cinnamon',
        'g': 'Gray',
        'r': 'Green',
        'p': 'Pink',
        'u': 'Purple',
        'e': 'Red',
        'w': 'White',
        'y': 'Yellow'
    },
    'bruises': {
        't': 'Bruises',
        'f': 'No Bruises'
    },
    'odor': {
        'a': 'Almond',
        'l': 'Anise',
        'c': 'Creosote',
        'y': 'Fishy',
        'f': 'Foul',
        'm': 'Musty',
        'n': 'None',
        'p': 'Pungent',
        's': 'Spicy'
    },
    'gill-attachment': {
        'a': 'Attached',
        'd': 'Descending',
        'f': 'Free',
        'n': 'Notched'
    },
    'gill-spacing': {
        'c': 'Close',
        'w': 'Crowded',
        'd': 'Distant'
    },
    'gill-size': {
        'b': 'Broad',
        'n': 'Narrow'
    },
    'gill-color': {
        'k': 'Black',
        'n': 'Brown',
        'b': 'Buff',
        'h': 'Chocolate',
        'g': 'Gray',
        'r': 'Green',
        'o': 'Orange',
        'p': 'Pink',
        'u': 'Purple',
        'e': 'Red',
        'w': 'White',
        'y': 'Yellow'
    },
    'stalk-shape': {
        'e': 'Enlarging',
        't': 'Tapering'
    },
    'stalk-root': {
        'b': 'Bulbous',
        'c': 'Club',
        'u': 'Cup',
        'e': 'Equal',
        'z': 'Rhizomorphs',
        'r': 'Rooted',
        '?': 'Missing'
    },
    'stalk-surface-above-ring': {
        'f': 'Fibrous',
        'y': 'Scaly',
        'k': 'Silky',
        's': 'Smooth'
    },
    'stalk-surface-below-ring': {
        'f': 'Fibrous',
        'y': 'Scaly',
        'k': 'Silky',
        's': 'Smooth'
    },
    'stalk-color-above-ring': {
        'n': 'Brown',
        'b': 'Buff',
        'c': 'Cinnamon',
        'g': 'Gray',
        'o': 'Orange',
        'p': 'Pink',
        'e': 'Red',
        'w': 'White',
        'y': 'Yellow'
    },
    'stalk-color-below-ring': {
        'n': 'Brown',
        'b': 'Buff',
        'c': 'Cinnamon',
        'g': 'Gray',
        'o': 'Orange',
        'p': 'Pink',
        'e': 'Red',
        'w': 'White',
        'y': 'Yellow'
    },
    'veil-type': {
        'p': 'Partial',
        'u': 'Universal'
    },
    'veil-color': {
        'n': 'Brown',
        'o': 'Orange',
        'w': 'White',
        'y': 'Yellow'
    },
    'ring-number': {
        'n': 'None',
        'o': 'One',
        't': 'Two'
    },
    'ring-type': {
        'c': 'Cobwebby',
        'e': 'Evanescent',
        'f': 'Flaring',
        'l': 'Large',
        'p': 'Pendant',
        's': 'Sheathing',
        'z': 'Zone'
    },
    'spore-print-color': {
        'k': 'Black',
        'n': 'Brown',
        'b': 'Buff',
        'h': 'Chocolate',
        'r': 'Green',
        'o': 'Orange',
        'u': 'Purple',
        'w': 'White',
        'y': 'Yellow'
    },
    'population': {
        'a': 'Abundant',
        'c': 'Clustered',
        'n': 'Numerous',
        's': 'Scattered',
        'v': 'Several',
        'y': 'Solitary'
    },
    'habitat': {
        'g': 'Grasses',
        'l': 'Leaves',
        'm': 'Meadows',
        'p': 'Paths',
        'u': 'Urban',
        'w': 'Waste',
        'd': 'Woods'
    }
}

// Global variables
let mushrooms = [];
let edibleMushrooms = [];
let poisonousMushrooms = [];
const edibleProbabilities = {};
const poisonousProbabilities = {};

// DOM elements
const calculateButton = document.getElementById('calculate-btn');
const property1Select = document.getElementById('visualition-property-1');
const property2Select = document.getElementById('visualition-property-2');

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
    calculateButton.addEventListener('click', handleCalculate);

    if (mushrooms.length === 0) {
        mushrooms = await loadMushrooms();
        edibleMushrooms = mushrooms.filter(mushroom => mushroom["class"] === "e");
        poisonousMushrooms = mushrooms.filter(mushroom => mushroom["class"] === "p");

        populateVisualizationSelect();
    }
    
    loadSVG();
}

// SVG
// https://github.com/HoanghoDev/youtube_v2/blob/main/gsap_animation/
function loadSVG () {
    fetch("forest.svg")
    .then((response) => { return response.text();})
    .then((svg) => {
        document.getElementById('bg_forest').innerHTML = svg;
        document.querySelector('#bg_forest svg').setAttribute("preserveAspectRatio", "xMidYMid slice");
        setAnimationScroll();
    })
}

function setAnimationScroll() {
    
}

// Calculate Probability

function handleCalculate(event) {
    event.preventDefault();
    const probability = getProbabilityEdibleAll();
    document.getElementById('probability-result').textContent = `${Math.round(probability * 100)}%`;
    document.querySelectorAll('#result-div p').forEach(element => {
        element.hidden = false;
    });

    calculateButton.textContent = 'Reset';

    calculateButton.removeEventListener('click', handleCalculate);
    calculateButton.addEventListener('click', handleReset);
}

function handleReset(event) {
    event.preventDefault();
    document.getElementById('probability-form').reset();

    document.querySelectorAll('#result-div p').forEach(element => {
        element.hidden = true;
    });

    calculateButton.textContent = 'Calculate Probability';

    calculateButton.removeEventListener('click', handleReset);
    calculateButton.addEventListener('click', handleCalculate);
}

function getProbabilityEdible(property, value) {
    if (!edibleProbabilities[property]) {
        edibleProbabilities[property] = edibleMushrooms.filter(mushroom => mushroom[property] === value).length;
    }
    if (!poisonousProbabilities[property]) {
        poisonousProbabilities[property] = poisonousMushrooms.filter(mushroom => mushroom[property] === value).length;
    }
    return edibleProbabilities[property] / (edibleProbabilities[property] + poisonousProbabilities[property]);
}

function getProbabilityEdibleAll() {
    const capShape = document.querySelector('input[name="cap-shape"]:checked')?.value;
    const capColor = document.querySelector('input[name="cap-color"]:checked')?.value;
    const capSurface = document.querySelector('input[name="cap-surface"]:checked')?.value;
    const stalkShape = document.querySelector('input[name="stalk-shape"]:checked')?.value;

    if (!capShape || !capColor || !capSurface || !stalkShape) {
        alert('Please fill in all fields');
        return 0;
    }

    const probabilityCapShape = getProbabilityEdible("cap-shape", capShape);
    const probabilityCapColor = getProbabilityEdible("cap-color", capColor);
    const probabilityCapSurface = getProbabilityEdible("cap-surface", capSurface);
    const probabilityStalkShape = getProbabilityEdible("stalk-shape", stalkShape);

    console.log(probabilityCapShape, probabilityCapColor, probabilityCapSurface, probabilityStalkShape);

    return (probabilityCapShape * probabilityCapColor
        * probabilityCapSurface * probabilityStalkShape);
}

// Visualization

function populateVisualizationSelect() {
    Object.keys(mushrooms[0]).forEach(property => {
        if (property === "class") return;
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');

        option1.value = property;
        option1.textContent = property;
        option2.value = property;
        option2.textContent = property;

        property1Select.appendChild(option1);
        property2Select.appendChild(option2);
    });

    property2Select.selectedIndex = 1;
    property1Select.addEventListener('change', handleVisualizationChange);
    property2Select.addEventListener('change', handleVisualizationChange);
    buildVisualization(property1Select.value, property2Select.value);
}

function handleVisualizationChange(event) {
    const property1 = property1Select.value;
    const property2 = property2Select.value;

    if (property1 === property2) {
        alert('Properties cannot be the same');
        return;
    }

    buildVisualization(property1, property2);
}

function buildVisualization(property1, property2) {
    const property1Values = Object.entries(LEGEND[property1]).map(([key, value]) => ({ key, value }));
    const property2Values = Object.entries(LEGEND[property2]).map(([key, value]) => ({ key, value }));
    
    const zValues = property1Values.map(p1 => {
        return property2Values.map(p2 => {
            const edibleCount = edibleMushrooms.filter(m => 
                m[property1] === p1.key && m[property2] === p2.key
            ).length;
            const poisonousCount = poisonousMushrooms.filter(m => 
                m[property1] === p1.key && m[property2] === p2.key
            ).length;
            
            return edibleCount + poisonousCount === 0 ? 0 :
                Math.round((edibleCount / (edibleCount + poisonousCount)) * 100);
        });
    });

    const data = [{
        z: zValues,
        x: property2Values.map(p => p.value),
        y: property1Values.map(p => p.value),
        type: 'heatmap',
        colorscale: [
            [0, 'red'],
            [0.5, 'yellow'],
            [1, 'darkgreen']
        ],
        hoverongaps: false
    }];

    const layout = {
        title: `Probability that a mushroom is edible given ${property1} and ${property2}`,
        xaxis: {
            title: property2.replace(/-/g, ' '),
            tickangle: 45,
            side: 'bottom'
        },
        yaxis: {
            title: property1.replace(/-/g, ' ')
        },
        margin: {
            l: 150,
            b: 150
        },
        annotations: []
    };

    // https://plotly.com/javascript/heatmaps/
    for (let i = 0; i < property1Values.length; i++) {
        for (let j = 0; j < property2Values.length; j++) {
            const currentValue = zValues[i][j];
            const textColor = 'black'
            
            layout.annotations.push({
                xref: 'x',
                yref: 'y',
                x: property2Values[j].value,
                y: property1Values[i].value,
                text: currentValue + '%',
                font: {
                    family: 'Arial',
                    size: 12,
                    color: textColor
                },
                showarrow: false
            });
        }
    }

    Plotly.newPlot('visualization', data, layout);
}
document.addEventListener("DOMContentLoaded", async () => mainEvent());
