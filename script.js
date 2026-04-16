const canvas = document.getElementById('designCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let drawMode = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
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
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2c3e50';
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

document.getElementById('drawBtn').addEventListener('click', () => {
    drawMode = !drawMode;
    document.getElementById('drawBtn').textContent = drawMode ? 'Drawing Mode On' : 'Draw Mode';
    canvas.style.cursor = drawMode ? 'crosshair' : 'default';
});

document.getElementById('clearBtn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('calcArea').addEventListener('click', () => {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    if (isNaN(length) || isNaN(width)) {
        document.getElementById('areaResult').textContent = 'Please enter valid numbers.';
        return;
    }
    const area = length * width;
    document.getElementById('areaResult').textContent = `Area: ${area.toFixed(2)} square meters`;
});

document.getElementById('addProject').addEventListener('click', () => {
    const projectName = prompt('Enter project name:');
    if (projectName && projectName.trim()) {
        const li = document.createElement('li');
        li.textContent = projectName.trim();
        document.getElementById('projectList').appendChild(li);
        updateStats();
    }
});

function updateStats() {
    const projectCount = document.getElementById('projectList').children.length;
    document.getElementById('totalProjects').textContent = projectCount;
    // For simplicity, assume completed designs = projects for now
    document.getElementById('completedDesigns').textContent = projectCount;
}

// Initialize
updateStats();