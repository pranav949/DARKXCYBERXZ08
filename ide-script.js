let workspaceFiles = JSON.parse(localStorage.getItem('dx08_ultimate_workspace')) || {
    "index.html": "<!DOCTYPE html>\n<html>\n<head>\n    <title>Hacker Studio</title>\n    <style>\n        body { background: #0f172a; color: #38bdf8; font-family: sans-serif; text-align: center; padding-top: 50px; }\n        h1 { font-size: 2.5rem; text-shadow: 0 0 10px rgba(56,189,248,0.5); }\n        button { padding: 10px 20px; background: #38bdf8; border: none; font-weight: bold; cursor: pointer; border-radius: 5px; margin-top: 20px; }\n    </style>\n</head>\n<body>\n    <h1>Welcome to DX08 Cyber Lab</h1>\n    <p>Type in the editor and watch it update live!</p>\n    <button onclick=\"alert('System Secure!')\">Test Security</button>\n</body>\n</html>",
    "script.js": "// Custom JS Logic\nconsole.log('Engine Active');",
    "style.css": "body { margin: 0; }"
};

let currentFile = "index.html";

const fileListEl = document.getElementById('file-list');
const codeEditor = document.getElementById('code-editor');
const activeFileDisplay = document.getElementById('active-file-display');
const livePreview = document.getElementById('live-preview');

function initWorkspace() {
    renderFiles();
    openFile(currentFile);
    compilePreview();
}

function renderFiles() {
    fileListEl.innerHTML = '';
    for (let name in workspaceFiles) {
        let li = document.createElement('li');
        li.className = "file-tab " + (name === currentFile ? 'active' : '');
        li.innerHTML = "<span>📄 " + name + "</span>";
        li.onclick = function() {
            workspaceFiles[currentFile] = codeEditor.value;
            openFile(name);
        };
        fileListEl.appendChild(li);
    }
}

function openFile(name) {
    currentFile = name;
    activeFileDisplay.textContent = name;
    codeEditor.value = workspaceFiles[name] || "";
    renderFiles();
}

// REAL-TIME AUTO COMPILE AS YOU TYPE
codeEditor.addEventListener('input', function() {
    workspaceFiles[currentFile] = codeEditor.value;
    localStorage.setItem('dx08_ultimate_workspace', JSON.stringify(workspaceFiles));
    compilePreview();
});

function saveFile() {
    workspaceFiles[currentFile] = codeEditor.value;
    localStorage.setItem('dx08_ultimate_workspace', JSON.stringify(workspaceFiles));
    compilePreview();
    
    // Quick visual notification
    const btn = document.querySelector('.ide-btn');
    let oldText = btn.textContent;
    btn.textContent = "✔ SAVED!";
    setTimeout(() => btn.textContent = oldText, 1200);
}

function compilePreview() {
    let htmlCode = workspaceFiles["index.html"] || "";
    let blob = new Blob([htmlCode], { type: 'text/html' });
    livePreview.src = URL.createObjectURL(blob);
}

function addNewFile() {
    let fileName = prompt("Enter file name (e.g., test.html):");
    if (fileName && !workspaceFiles[fileName]) {
        workspaceFiles[fileName] = "<!-- New file -->\n";
        saveFile();
        openFile(fileName);
    } else if (workspaceFiles[fileName]) {
        alert("File already exists!");
    }
}

initWorkspace();