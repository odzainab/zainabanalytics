/* ========================== toggle style switcher =========================== */

const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");

styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});


// hide style-switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});


/* ========================== theme colors =========================== */

const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color)
{
    alternateStyles.forEach((style) => {

        if (color === style.getAttribute("title"))
        {
            style.removeAttribute("disabled");
        }
        else
        {
            style.setAttribute("disabled", "true");
        }

    });

    const colors = {
        "color-1": "#ec1839",
        "color-2": "#fa5b0f",
        "color-3": "#37b182",
        "color-4": "#1854b4",
        "color-5": "#f021b2"
    };

    if (colors[color])
    {
        localStorage.setItem("selectedColor", color);
        localStorage.setItem("skinColor", colors[color]);

        document.documentElement.style.setProperty(
            "--skin-color",
            colors[color]
        );
    }
}


window.addEventListener("load", () => {

    const savedColor = localStorage.getItem("selectedColor");

    if (savedColor)
    {
        setActiveStyle(savedColor);
    }

});


/* ========================== theme light and dark mode =========================== */

const dayNight = document.querySelector(".day-night");


function applyTheme(theme)
{
    const root = document.documentElement;

    if (theme === "dark")
    {
        root.style.setProperty("--bg-black-900", "#151515");
        root.style.setProperty("--bg-black-100", "#222222");
        root.style.setProperty("--bg-black-50", "#393939");
        root.style.setProperty("--text-black-900", "#ffffff");
        root.style.setProperty("--text-black-700", "#e9e9e9");

        document.body.classList.add("dark");

        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else
    {
        root.style.removeProperty("--bg-black-900");
        root.style.removeProperty("--bg-black-100");
        root.style.removeProperty("--bg-black-50");
        root.style.removeProperty("--text-black-900");
        root.style.removeProperty("--text-black-700");

        document.body.classList.remove("dark");

        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}


dayNight.addEventListener("click", () => {

    const currentTheme =
        localStorage.getItem("theme") === "dark"
            ? "light"
            : "dark";

    localStorage.setItem("theme", currentTheme);

    applyTheme(currentTheme);

});


window.addEventListener("load", () => {

    const savedTheme =
        localStorage.getItem("theme") === "dark"
            ? "dark"
            : "light";

    applyTheme(savedTheme);

});