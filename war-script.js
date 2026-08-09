let files = JSON.parse(localStorage.getItem('dx08_war_files')) || {
    "index.html": "<!DOCTYPE html>\n<html>\n<head>\n    <title>War Room App</title>\n    <style>\n        body { background: #0b0f19; color: #38bdf8; font-family: Arial; text-align: center; padding-top: 60px; }\n        h1 { text-shadow: 0 0 10px #38bdf8; }\n    </style>\n</head>\n<body>\n    <h1>Cyber Operations Center</h1>\n    <p>System status: All nodes operational.</p>\n</body>\n</html>",
    "script.js": "console.log('War Room Script Loaded');",
    "style.css": "body { margin: 0; }"
};

let currentFile = "index.html";
const fileListEl = document.getElementById('file-list');
const codeEditor = document.getElementById('code-editor');
const activeFileLabel = document.getElementById('active-file-label');
const livePreview = document.getElementById('live-preview');

function initIDE() {
    renderFileList();
    openFile(currentFile);
    syncPreview();
}

function renderFileList() {
    fileListEl.innerHTML = '';
    for (let name in files) {
        let li = document.createElement('li');
        li.className = "file-item " + (name === currentFile ? 'active' : '');
        li.innerHTML = "📄 " + name;
        li.onclick = () => { files[currentFile] = codeEditor.value; openFile(name); };
        fileListEl.appendChild(li);
    }
}

function openFile(name) {
    currentFile = name;
    activeFileLabel.textContent = name;
    codeEditor.value = files[name] || "";
    renderFileList();
}

codeEditor.addEventListener('input', () => {
    files[currentFile] = codeEditor.value;
    syncPreview();
});

function syncPreview() {
    let htmlCode = files["index.html"] || "";
    let blob = new Blob([htmlCode], { type: 'text/html' });
    livePreview.src = URL.createObjectURL(blob);
}

function saveWorkspace() {
    files[currentFile] = codeEditor.value;
    localStorage.setItem('dx08_war_files', JSON.stringify(files));
    alert("Project saved successfully to secure local vault!");
}

function createNewFile() {
    let name = prompt("Enter filename (e.g. payload.py, index.html):");
    if (name && !files[name]) {
        files[name] = "/* New file */\n";
        saveWorkspace();
        openFile(name);
    }
}

function switchView(mode) {
    document.getElementById('view-ide').classList.remove('active');
    document.getElementById('view-term').classList.remove('active');
    document.getElementById('btn-ide').classList.remove('active');
    document.getElementById('btn-term').classList.remove('active');

    if (mode === 'ide') {
        document.getElementById('view-ide').classList.add('active');
        document.getElementById('btn-ide').classList.add('active');
        syncPreview();
    } else {
        document.getElementById('view-term').classList.add('active');
        document.getElementById('btn-term').classList.add('active');
        document.getElementById('terminal-input').focus();
    }
}

const termOutput = document.getElementById('terminal-output');
const termInput = document.getElementById('terminal-input');

termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let cmd = termInput.value.trim();
        if (!cmd) return;
        appendTerm("dx08@war-room:~# " + cmd, 'user');
        processTermCommand(cmd);
        termInput.value = '';
    }
});

function appendTerm(text, type) {
    let div = document.createElement('div');
    div.className = 'output-line';
    if (type === 'user') div.style.color = '#fff';
    else if (type === 'success') div.className = 't-success';
    else if (type === 'error') div.className = 't-error';
    else if (type === 'warn') div.className = 't-warn';
    else if (type === 'info') div.className = 't-info';
    div.textContent = text;
    termOutput.appendChild(div);
    termOutput.scrollTop = termOutput.scrollHeight;
}

function processTermCommand(input) {
    let parts = input.split(' ');
    let cmd = parts[0].toLowerCase();

    switch(cmd) {
        case 'help':
            appendTerm("AVAILABLE WAR ROOM COMMANDS:\n  help         - Show manual\n  scan         - Run mock network vulnerability scan\n  clear        - Wipe terminal screen\n  status       - Display core system health\n  projects     - List workspace files", 'info');
            break;
        case 'scan':
            appendTerm("[*] Initiating deep network probe...", 'warn');
            setTimeout(() => appendTerm("[+] Target acquired: 127.0.0.1 - Port 80/443 OPEN [Secure]", 'success'), 800);
            break;
        case 'status':
            appendTerm("[+] KERNEL: SECURE | ENCRYPTION: AES-256 | MEMORY: OPTIMAL", 'success');
            break;
        case 'projects':
            appendTerm("Stored project files: " + Object.keys(files).join(', '), 'info');
            break;
        case 'clear':
            termOutput.innerHTML = '<div class="t-success">[+] TERMINAL BUFFER CLEARED.</div><br>';
            break;
        default:
            appendTerm("bash: command not found: " + cmd + ". Type 'help' for options.", 'error');
            break;
    }
}

initIDE();