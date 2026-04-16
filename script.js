const projects = [
    {
        id: 'p-001',
        name: 'SBC Residential Complex',
        client: 'Al Riyadh Estate',
        location: 'Riyadh, Saudi Arabia',
        type: 'Residential',
        status: 'Active',
        budget: 920000,
        actualCost: 460000,
        startDate: '2026-01-15',
        endDate: '2026-12-30',
        completionPercentage: 52,
        team: ['Aisha', 'Mohammed', 'Sara'],
    },
    {
        id: 'p-002',
        name: 'Commercial Plaza Design',
        client: 'Jeddah Towers',
        location: 'Jeddah, Saudi Arabia',
        type: 'Commercial',
        status: 'Planning',
        budget: 620000,
        actualCost: 124000,
        startDate: '2026-04-01',
        endDate: '2027-02-20',
        completionPercentage: 18,
        team: ['Faisal', 'Noor'],
    },
    {
        id: 'p-003',
        name: 'Industrial Warehouse Study',
        client: 'Eastern Logistics',
        location: 'Dammam, Saudi Arabia',
        type: 'Industrial',
        status: 'On Hold',
        budget: 480000,
        actualCost: 180000,
        startDate: '2025-10-10',
        endDate: '2026-08-15',
        completionPercentage: 34,
        team: ['Hassan', 'Lina'],
    },
];

const tasks = [
    {
        id: 't-101',
        title: 'Finalize concept layout',
        project: 'SBC Residential Complex',
        status: 'Not Started',
        priority: 'High',
        assignedTo: 'Aisha',
        dueDate: '2026-05-02',
    },
    {
        id: 't-102',
        title: 'Review structural load plan',
        project: 'Industrial Warehouse Study',
        status: 'In Progress',
        priority: 'Medium',
        assignedTo: 'Hassan',
        dueDate: '2026-04-20',
    },
    {
        id: 't-103',
        title: 'Compliance checklist update',
        project: 'Commercial Plaza Design',
        status: 'Under Review',
        priority: 'High',
        assignedTo: 'Noor',
        dueDate: '2026-04-10',
    },
    {
        id: 't-104',
        title: 'Prepare budget variance report',
        project: 'SBC Residential Complex',
        status: 'Completed',
        priority: 'Low',
        assignedTo: 'Sara',
        dueDate: '2026-04-05',
    },
];

const complianceItems = [
    {
        id: 'c-01',
        project: 'SBC Residential Complex',
        section: 'Accessibility',
        requirement: 'Accessible routes and ramps',
        status: 'Compliant',
    },
    {
        id: 'c-02',
        project: 'Commercial Plaza Design',
        section: 'Fire Safety',
        requirement: 'Emergency exit signage',
        status: 'Under Review',
    },
    {
        id: 'c-03',
        project: 'Industrial Warehouse Study',
        section: 'Environmental',
        requirement: 'Dust and sandstorm protection',
        status: 'Non-Compliant',
    },
];

const budgetCategories = [
    {name: 'Materials', budget: 360000, actual: 218000},
    {name: 'Labor', budget: 280000, actual: 146000},
    {name: 'Equipment', budget: 120000, actual: 68000},
    {name: 'Contingency', budget: 160000, actual: 76000},
];

const teamMembers = [
    {name: 'Aisha', role: 'Lead Architect', availability: 'Full-time', skills: 'SBC, BIM, Project Planning'},
    {name: 'Mohammed', role: 'Structural Engineer', availability: 'Part-time', skills: 'Load analysis, Steel design'},
    {name: 'Sara', role: 'Quality Controller', availability: 'Full-time', skills: 'Review, Documentation'},
    {name: 'Noor', role: 'MEP Engineer', availability: 'Full-time', skills: 'HVAC, Plumbing, Energy'},
    {name: 'Hassan', role: 'Project Coordinator', availability: 'Part-time', skills: 'Scheduling, Reporting'},
];

import { createTimeline, createTimer, utils } from 'https://esm.sh/animejs';

const reports = [
    {title: 'Weekly progress report', description: 'Project completion and milestone summary.'},
    {title: 'Budget utilization chart', description: 'Budget vs actual cost analysis.'},
    {title: 'Compliance audit summary', description: 'SBC compliance status by project.'},
];

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
}

function getStatusTag(status) {
    if (status === 'Compliant') return 'status-compliant';
    if (status === 'Under Review') return 'status-review';
    if (status === 'Non-Compliant') return 'status-noncompliant';
    return 'status-na';
}

function renderDashboard() {
    document.getElementById('activeProjectsCount').textContent = projects.length;
    document.getElementById('pendingTasksCount').textContent = tasks.filter(task => task.status !== 'Completed').length;
    document.getElementById('complianceFlagsCount').textContent = complianceItems.filter(item => item.status === 'Non-Compliant').length;
    const utilization = Math.round((projects.reduce((sum, project) => sum + project.actualCost, 0) / projects.reduce((sum, project) => sum + project.budget, 0)) * 100);
    document.getElementById('budgetUtilization').textContent = `${utilization}%`;

    const progressList = document.getElementById('projectProgressList');
    progressList.innerHTML = '';
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'progress-item';
        item.innerHTML = `
            <div class="progress-heading"><span>${project.name}</span><strong>${project.completionPercentage}%</strong></div>
            <div class="progress-bar"><span class="progress-fill" style="width: ${project.completionPercentage}%;"></span></div>
        `;
        progressList.appendChild(item);
    });
}

function renderProjects() {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';
    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card card';
        card.innerHTML = `
            <div class="tag">${project.type}</div>
            <h4>${project.name}</h4>
            <p>${project.client} · ${project.location}</p>
            <p>Timeline: ${project.startDate} to ${project.endDate}</p>
            <p>Budget: ${formatCurrency(project.budget)} · Actual: ${formatCurrency(project.actualCost)}</p>
            <div class="progress-bar"><span class="progress-fill" style="width: ${project.completionPercentage}%;"></span></div>
            <small>${project.completionPercentage}% complete · ${project.status}</small>
        `;
        grid.appendChild(card);
    });
}

function renderTasks() {
    const mapping = {
        'Not Started': 'todoColumn',
        'In Progress': 'inProgressColumn',
        'Under Review': 'reviewColumn',
        'Completed': 'doneColumn',
    };

    Object.values(mapping).forEach(id => {
        document.getElementById(id).innerHTML = '';
    });

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.innerHTML = `
            <h5>${task.title}</h5>
            <small>${task.project} · ${task.assignedTo}</small>
            <small>Priority: ${task.priority} · Due ${task.dueDate}</small>
        `;
        document.getElementById(mapping[task.status]).appendChild(card);
    });
}

function renderCompliance() {
    const list = document.getElementById('complianceList');
    list.innerHTML = '';
    complianceItems.forEach(item => {
        const block = document.createElement('div');
        block.className = 'compliance-item';
        block.innerHTML = `
            <div><strong>${item.project}</strong> · ${item.section}</div>
            <p>${item.requirement}</p>
            <span>Status: <span class="status-tag ${getStatusTag(item.status)}">${item.status}</span></span>
        `;
        list.appendChild(block);
    });
}

function renderBudget() {
    const totalBudget = budgetCategories.reduce((sum, item) => sum + item.budget, 0);
    const actualCost = budgetCategories.reduce((sum, item) => sum + item.actual, 0);
    const variance = totalBudget - actualCost;

    document.getElementById('totalBudget').textContent = formatCurrency(totalBudget);
    document.getElementById('actualCost').textContent = formatCurrency(actualCost);
    document.getElementById('budgetVariance').textContent = formatCurrency(variance);

    const tbody = document.getElementById('budgetTable');
    tbody.innerHTML = '';
    budgetCategories.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${formatCurrency(item.budget)}</td><td>${formatCurrency(item.actual)}</td><td>${formatCurrency(item.budget - item.actual)}</td>`;
        tbody.appendChild(row);
    });
}

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = '';
    teamMembers.forEach(member => {
        const card = document.createElement('article');
        card.className = 'team-card';
        card.innerHTML = `
            <h4>${member.name}</h4>
            <small>${member.role}</small>
            <p>Availability: ${member.availability}</p>
            <p>Skills: ${member.skills}</p>
        `;
        grid.appendChild(card);
    });
}

function renderReports() {
    const grid = document.getElementById('reportsGrid');
    grid.innerHTML = '';
    reports.forEach(report => {
        const card = document.createElement('article');
        card.className = 'report-card';
        card.innerHTML = `
            <h4>${report.title}</h4>
            <p>${report.description}</p>
        `;
        grid.appendChild(card);
    });
}

function addProject() {
    const name = prompt('Enter project name:');
    if (!name) return;
    const project = {
        id: `p-${Date.now()}`,
        name,
        client: 'New client',
        location: 'New location',
        type: 'Residential',
        status: 'Planning',
        budget: 150000,
        actualCost: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
        completionPercentage: 0,
        team: [],
    };
    projects.push(project);
    renderDashboard();
    renderProjects();
}

function addTask() {
    const title = prompt('Enter task title:');
    if (!title) return;
    const task = {
        id: `t-${Date.now()}`,
        title,
        project: projects[0]?.name || 'General',
        status: 'Not Started',
        priority: 'Medium',
        assignedTo: 'Team Member',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    };
    tasks.push(task);
    renderDashboard();
    renderTasks();
}

function exportSummary() {
    const rows = [
        ['Project', 'Status', 'Completion', 'Budget', 'Actual Cost'],
        ...projects.map(project => [project.name, project.status, `${project.completionPercentage}%`, project.budget, project.actualCost]),
    ];
    const csv = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project-summary.csv';
    link.click();
    URL.revokeObjectURL(url);
}

function importExcelPlaceholder() {
    alert('Excel import is a future enhancement. Use real XLSX integration in the next phase.');
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function initTimers() {
    const [ $timer01, $timer02, $timer03 ] = utils.$('.timer');
    if (!$timer01 || !$timer02 || !$timer03) return;

    const timer1 = createTimer({
        duration: 1500,
        onUpdate: self => $timer01.innerHTML = Math.round(self.currentTime),
    });

    const tl = createTimeline()
        .sync(timer1)
        .add({
            duration: 500,
            onUpdate: self => $timer02.innerHTML = Math.round(self.currentTime),
        })
        .add({
            duration: 1000,
            onUpdate: self => $timer03.innerHTML = Math.round(self.currentTime),
        });

    if (tl.play) tl.play();
}

function init() {
    renderDashboard();
    renderProjects();
    renderTasks();
    renderCompliance();
    renderBudget();
    renderTeam();
    renderReports();
    initTimers();

    document.getElementById('addProject').addEventListener('click', addProject);
    document.getElementById('addTask').addEventListener('click', addTask);
    document.getElementById('exportExcel').addEventListener('click', exportSummary);
    document.getElementById('importExcel').addEventListener('click', importExcelPlaceholder);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
}

window.addEventListener('DOMContentLoaded', init);
