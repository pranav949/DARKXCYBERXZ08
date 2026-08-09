const terminalBody = document.getElementById('terminal-body');
const commandInput = document.getElementById('command-input');
const fileListElement = document.getElementById('file-list');
const editorModal = document.getElementById('editor-modal');
const editorTextarea = document.getElementById('editor-textarea');
const editorFileTitle = document.getElementById('editor-file-title');

let currentActiveFile = null;
let currentPath = "/root";

// Load Virtual File System from Local Storage or default
let virtualFileSystem = JSON.parse(localStorage.getItem('dx08_vfs')) || {
    "/root/script.py": "# Python Development Script\nprint('Hello from DX08 Terminal Shell!')\n",
    "/root/notes.txt": "System Security & Lab Notes\n- Always test scripts locally.\n"
};

refreshSidebar();

commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmdLine = commandInput.value.trim();
        if (!cmdLine) return;

        appendOutput(document.getElementById('prompt-dir').textContent + " " + cmdLine, 'user');
        processCommand(cmdLine);

        commandInput.value = '';
    }
});

function appendOutput(text, type, isHTML) {
    type = type || 'normal';
    isHTML = isHTML || false;
    const div = document.createElement('div');
    div.className = 'output-line';

    if (type === 'user') div.style.color = '#fff';
    else if (type === 'error') div.className += ' error';
    else if (type === 'success') div.className += ' success';
    else if (type === 'warn') div.className += ' warn';
    else if (type === 'info') div.className += ' info';

    if (isHTML) div.innerHTML = text;
    else div.textContent = text;

    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function processCommand(input) {
    const parts = input.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg1 = parts[1] || '';

    switch (cmd) {
        case 'help':
            appendOutput("SYSTEM COMMAND MANUAL:\n" +
                "  ls                 : List files in workspace\n" +
                "  cat <file>         : Display file content\n" +
                "  touch <file>       : Create empty file\n" +
                "  nano <file>        : Open interactive code editor\n" +
                "  python3 <file>     : Execute Python script (simulation)\n" +
                "  rm <file>          : Remove a file\n" +
                "  clear              : Clear terminal screen\n" +
                "  pwd                : Display current working directory\n" +
                "  download <file>    : Download file to local PC", 'info');
            break;

        case 'ls':
            let files = Object.keys(virtualFileSystem);
            if (files.length === 0) {
                appendOutput("[Workspace empty]", 'warn');
            } else {
                files.forEach(f => {
                    const filename = f.replace('/root/', '');
                    appendOutput(" - " + filename, 'success');
                });
            }
            break;

        case 'pwd':
            appendOutput(currentPath, 'info');
            break;

        case 'clear':
            clearTerminal();
            break;

        case 'touch':
            if (!arg1) {
                appendOutput("Usage: touch <filename>", 'error');
                break;
            }
            let filePath = "/root/" + arg1;
            if (!virtualFileSystem[filePath]) {
                virtualFileSystem[filePath] = "";
                saveVFS();
                refreshSidebar();
                appendOutput("[+] Created file: " + arg1, 'success');
            } else {
                appendOutput("[!] File already exists.", 'warn');
            }
            break;

        case 'cat':
            if (!arg1) {
                appendOutput("Usage: cat <filename>", 'error');
                break;
            }
            let catPath = "/root/" + arg1;
            if (virtualFileSystem[catPath] !== undefined) {
                appendOutput(virtualFileSystem[catPath] || "[File Empty]", 'normal');
            } else {
                appendOutput("cat: " + arg1 + ": No such file", 'error');
            }
            break;

        case 'nano':
            if (!arg1) {
                appendOutput("Usage: nano <filename>", 'error');
                break;
            }
            openEditor("/root/" + arg1);
            break;

        case 'python3':
        case 'python':
            if (!arg1) {
                appendOutput("Usage: python3 <script.py>", 'error');
                break;
            }
            let pyPath = "/root/" + arg1;
            if (virtualFileSystem[pyPath] !== undefined) {
                appendOutput("[*] Executing " + arg1 + "...", 'info');
                appendOutput("--- OUTPUT START ---", 'warn');
                appendOutput(virtualFileSystem[pyPath], 'normal');
                appendOutput("--- OUTPUT END --- [Process finished with exit code 0]", 'success');
            } else {
                appendOutput("python3: can't open file '" + arg1 + "': No such file", 'error');
            }
            break;

        case 'rm':
            if (!arg1) {
                appendOutput("Usage: rm <filename>", 'error');
                break;
            }
            let rmPath = "/root/" + arg1;
            if (virtualFileSystem[rmPath] !== undefined) {
                delete virtualFileSystem[rmPath];
                saveVFS();
                refreshSidebar();
                appendOutput("[+] Removed " + arg1, 'success');
            } else {
                appendOutput("rm: cannot remove '" + arg1 + "': No such file", 'error');
            }
            break;

        case 'download':
            if (!arg1) {
                appendOutput("Usage: download <filename>", 'error');
                break;
            }
            let dlPath = "/root/" + arg1;
            if (virtualFileSystem[dlPath] !== undefined) {
                downloadFile(arg1, virtualFileSystem[dlPath]);
                appendOutput("[+] Downloading " + arg1, 'success');
            } else {
                appendOutput("File not found for download.", 'error');
            }
            break;

        default:
            appendOutput("bash: " + cmd + ": command not found. Type 'help' for valid commands.", 'error');
            break;
    }
}

function refreshSidebar() {
    fileListElement.innerHTML = '';
    Object.keys(virtualFileSystem).forEach(fullPath => {
        const fileName = fullPath.replace('/root/', '');
        const li = document.createElement('li');
        li.className = 'file-item';
        li.innerHTML = `<span>${fileName}</span> <span style="color:#ff0055; cursor:pointer;" onclick="deleteFile('${fullPath}')">×</span>`;
        li.querySelector('span').onclick = () => openEditor(fullPath);
        fileListElement.appendChild(li);
    });
}

function createNewFilePrompt() {
    const name = prompt("Enter new filename (e.g. script.py, index.js):");
    if (name) {
        let path = "/root/" + name;
        virtualFileSystem[path] = "# New file\n";
        saveVFS();
        refreshSidebar();
        appendOutput("[+] File created: " + name, 'success');
    }
}

function openEditor(fullPath) {
    currentActiveFile = fullPath;
    if (virtualFileSystem[fullPath] === undefined) {
        virtualFileSystem[fullPath] = "";
    }
    editorFileTitle.textContent = "Editing: " + fullPath.replace('/root/', '');
    editorTextarea.value = virtualFileSystem[fullPath];
    editorModal.style.display = 'flex';
}

function saveFileFromEditor() {
    if (currentActiveFile) {
        virtualFileSystem[currentActiveFile] = editorTextarea.value;
        saveVFS();
        refreshSidebar();
        appendOutput("[+] Saved changes to " + currentActiveFile.replace('/root/', ''), 'success');
    }
    closeEditor();
}

function closeEditor() {
    editorModal.style.display = 'none';
    currentActiveFile = null;
}

function deleteFile(fullPath) {
    if (confirm("Delete " + fullPath + "?")) {
        delete virtualFileSystem[fullPath];
        saveVFS();
        refreshSidebar();
    }
}

function saveVFS() {
    localStorage.setItem('dx08_vfs', JSON.stringify(virtualFileSystem));
}

function saveCurrentWorkspace() {
    saveVFS();
    appendOutput("[+] Full workspace saved successfully to local browser enclave.", 'success');
}

function clearTerminal() {
    terminalBody.innerHTML = '<div class="output-line success">[+] TERMINAL BUFFER CLEARED.</div><br>';
}

function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}