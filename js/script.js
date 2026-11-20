/* ============================== typing animation ============================ */
var typed = new Typed(".typing",{
    strings:["","Data Analyst","BI Professional","Problem Solver"],
    typeSpeed:150,
    backSpeed:100,
    loop:true
})

/* ========================== Restore active section =========================== */
window.addEventListener("load", () => {

    const currentHash = window.location.hash;

    if (!currentHash) {
        return;
    }

    const targetSection = document.querySelector(currentHash);
    const targetLink = document.querySelector(
        '.aside .nav a[href="' + currentHash + '"]'
    );

    if (!targetSection || !targetLink) {
        return;
    }

    /* Restore active section */
    for(let i = 0; i < totalSection; i++)
    {
        allSection[i].classList.remove("active");
    }

    targetSection.classList.add("active");

    /* Restore active sidebar item */
    for(let i = 0; i < totalNavList; i++)
    {
        navList[i].querySelector("a").classList.remove("active");
    }

    targetLink.classList.add("active");
});

/* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for(let i=0; i<totalNavList; i++)
{
    const a = navList[i].querySelector("a");

    a.addEventListener("click", function()
    {
        removeBackSection();

        for(let j=0; j<totalNavList; j++)
        {
            if(navList[j].querySelector("a").classList.contains("active"))
            {
                addBackSection(j);
                // allSection[j].classList.add("back-section");
            }

            navList[j].querySelector("a").classList.remove("active");
        }

        this.classList.add("active");
        showSection(this);

        if(window.innerWidth < 1200)
        {
            asideSectionTogglerBtn();
        }
    })
}

function removeBackSection()
{
    for(let i=0; i<totalSection; i++)
    {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num)
{
    allSection[num].classList.add("back-section");
}

function showSection(element)
{
    for(let i=0; i<totalSection; i++)
    {
        allSection[i].classList.remove("active");
    }

    const target = element.getAttribute("href").split("#")[1];

    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element)
{
    for(let i=0; i<totalNavList; i++)
    {
        navList[i].querySelector("a").classList.remove("active");

        const target = element.getAttribute("href").split("#")[1];

        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
        {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener("click", function()
{
    const sectionIndex = this.getAttribute("data-section-index");
    //console.log(sectionIndex);

    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () =>
{
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn()
{
    /* Mobile / tablet keeps the original behaviour */
    if(window.innerWidth < 1200)
    {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");

        for(let i = 0; i < totalSection; i++)
        {
            allSection[i].classList.toggle("open");
        }

        return;
    }

    /* Remember the currently active section position */
    const activeSection = document.querySelector(".section.active");

    const oldTop = activeSection
        ? activeSection.getBoundingClientRect().top
        : null;

    /* Prevent section transitions during the layout change */
    document.documentElement.classList.add("sidebar-changing");

    /* Collapse / expand sidebar */
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");

    /* Save desktop sidebar state */
    if(aside.classList.contains("open"))
    {
        localStorage.setItem("sidebarState", "collapsed");
        document.documentElement.classList.add("sidebar-collapsed");
    }
    else
    {
        localStorage.setItem("sidebarState", "expanded");
        document.documentElement.classList.remove("sidebar-collapsed");
    }

    /*
       Keep the active section at the same vertical position.
       This compensates for the page reflow caused by the
       sidebar changing width.
    */
    if(activeSection && oldTop !== null)
    {
        const newTop = activeSection.getBoundingClientRect().top;
        const difference = newTop - oldTop;

        if(Math.abs(difference) > 0.5)
        {
            const root = document.documentElement;
            const previousScrollBehavior = root.style.scrollBehavior;

            root.style.scrollBehavior = "auto";

            window.scrollTo(
                0,
                Math.max(0, window.scrollY + difference)
            );

            root.style.scrollBehavior = previousScrollBehavior;
        }
    }

    /* Allow normal transitions again */
    document.documentElement.classList.remove("sidebar-changing");
}


/* Restore sidebar state after refresh */
window.addEventListener("load", () =>
{
    if (window.innerWidth >= 1200)
    {
        const savedSidebarState = localStorage.getItem("sidebarState");

        if (savedSidebarState === "collapsed")
        {
            aside.classList.add("open");
            navTogglerBtn.classList.add("open");
        }
    }
});

/* ========================== Technical Skills Filters ========================== */

const toolkitFilters = document.querySelectorAll(".toolkit-filter");
const toolkitCards = document.querySelectorAll(".toolkit-card-item");

if(toolkitFilters.length && toolkitCards.length)
{
    toolkitFilters.forEach(filter =>
    {
        filter.addEventListener("click", function()
        {
            const selectedFilter = this.getAttribute("data-filter");

            toolkitFilters.forEach(button =>
            {
                button.classList.remove("active");
            });

            this.classList.add("active");

            toolkitCards.forEach(card =>
            {
                const category = card.getAttribute("data-category");

                if(selectedFilter === "all" || category === selectedFilter)
                {
                    card.classList.remove("is-hidden");
                }
                else
                {
                    card.classList.add("is-hidden");
                }
            });
        });
    });
}