const canvas = document.getElementById('designCanvas');
const ctx = canvas.getContext('2d');
const drawBtn = document.getElementById('drawBtn');
const clearBtn = document.getElementById('clearBtn');
const calcAreaBtn = document.getElementById('calcArea');
const addProjectBtn = document.getElementById('addProject');
const projectList = document.getElementById('projectList');
const totalProjects = document.getElementById('totalProjects');
const completedDesigns = document.getElementById('completedDesigns');
const areaResult = document.getElementById('areaResult');
let drawing = false;
let drawMode = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
    if (!drawMode) return;
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function stopDrawing() {
    drawing = false;
}

function draw(event) {
    if (!drawing || !drawMode) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#7c5cff';
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

function updateDrawButton() {
    drawBtn.textContent = drawMode ? 'Drawing Enabled' : 'Enable Draw';
    canvas.style.cursor = drawMode ? 'crosshair' : 'default';
}

function calculateArea() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        areaResult.textContent = 'Please enter valid positive numbers.';
        return;
    }
    const area = length * width;
    areaResult.textContent = `Area: ${area.toFixed(2)} m²`;
}

function addProject() {
    const projectName = window.prompt('Enter a new project name:');
    if (!projectName || !projectName.trim()) {
        return;
    }
    const item = document.createElement('li');
    item.textContent = projectName.trim();
    projectList.appendChild(item);
    updateStats();
}

function updateStats() {
    const count = projectList.children.length;
    totalProjects.textContent = count;
    completedDesigns.textContent = count;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

drawBtn.addEventListener('click', () => {
    drawMode = !drawMode;
    updateDrawButton();
});

clearBtn.addEventListener('click', clearCanvas);
calcAreaBtn.addEventListener('click', calculateArea);
addProjectBtn.addEventListener('click', addProject);

updateDrawButton();
updateStats();