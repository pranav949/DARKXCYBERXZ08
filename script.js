document.addEventListener("DOMContentLoaded", () => {

    const bootScreen = document.getElementById("boot-screen");
    const mainSite = document.getElementById("main-site");
    const progressBar = document.getElementById("boot-progress-bar");

    let progress = 0;

    const bootInterval = setInterval(() => {

        progress += Math.floor(Math.random() * 8) + 3;

        if (progress >= 100) {
            progress = 100;
        }

        progressBar.style.width = `${progress}%`;

        if (progress === 100) {

            clearInterval(bootInterval);

            setTimeout(() => {

                bootScreen.classList.add("hidden");
                mainSite.classList.add("visible");

            }, 700);
        }

    }, 180);

});