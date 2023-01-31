const toggleSwitch = document.getElementById("checkbox");
const body = document.getElementsByTagName("body")[0];
const wiki = document.getElementById("wiki");

toggleSwitch.checked = true;
body.classList.toggle("dark");
document.documentElement.setAttribute("data-theme", "dark");

function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 100);
    }
}

$(document).on("click", 'a[href^="#"]', function(event) {
    window.setTimeout(function() {
        offsetAnchor();
    }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
    body.classList.toggle("dark");
}

toggleSwitch.addEventListener("change", switchTheme, false);

const lang = {};
const langSwitchButton = document.getElementById("langswitch");
const content = document.getElementById("content");
let englishBool = true;

function swapLang(languageTag) {
    let append = "";
    for (let element in lang[languageTag]) {
        append += `
        <div class="precontentbox"></div>
        <div data-aos="fade-up"><div class="contentboxwall">
          <div class="contentbox">
            <img src="${lang[languageTag][element]["img"]}">
            <div>
              <h1 id="${element}title">${lang[languageTag][element]["title"]}</h1>
              <span id="${element}0">${lang[languageTag][element]["content"]}</span>
            </div>
          </div>
        </div></div>`;
    }

    content.innerHTML = append;
}

function langSwitch() {
    if (englishBool) {
        englishBool = false;
        //swapLang("fr-fr");
    } else {
        englishBool = true;
        //swapLang("en-uk");
    }
    console.error("Stop!!! it hurts...");
}

//swapLang("en-uk");

function dropdown() {}

async function doFetch() {
    const rsp = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/html/Vine_%28service%29?redirect=false&stash=true", {
            "Api-User-Agent": "MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)",
        }
    );
    const data = await rsp.text();
    return data;
}

async function fetchAsync() {
    try {
        let result = await doFetch();
        let a = result.split("<section");
        a.shift();
        a.pop();
        a.pop();
        a.pop();
        wiki.innerHTML = "<section" + a.join("<section");
        document.getElementsByClassName("infobox vevent")[0].remove();

        const sections = document.querySelectorAll("section");
        const nav = document.getElementById("nav");

        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.add("contentboxwall");
            sections[i].classList.add("dropdowns");
            sections[i].dataset.aos = "fade-up";
            let storedHTML = sections[i].innerHTML;
            let links = sections[i].getElementsByTagName("a");

            [...links].forEach((link) => {
                storedHTML.replaceAll(link, "");
            });

            sections[
                i
            ].innerHTML = `<div class="contentbox"><div>${storedHTML}</div></div>`;

            [...sections[i].getElementsByTagName("h2")].forEach((a) => {
                a.outerHTML = `<button class="dropdownbutton" id="dropdownbutton-${i}">${a.outerHTML}</button>`;
                let link = document.createElement("a");
                link.href = "#" + a.id;
                link.innerText = a.innerText;
                link.classList.add("navlink");
                nav.insertBefore(link, nav.children[-1]);
            });
            [...sections[i].getElementsByTagName("a")].forEach(
                (a) => (a.outerHTML = a.innerHTML)
            );
            [...sections[i].querySelectorAll("span.mw-reflink-text")].forEach(
                (a) => (a.outerHTML = "")
            );

            if (i !== 0) {
                const subcontentbox = sections[i].querySelector("div.contentbox div");
                const contentbox = sections[i].getElementsByClassName("contentbox")[0];
                const h2e = subcontentbox.firstChild;
                subcontentbox.removeChild(h2e);
                subcontentbox.innerHTML = `<div class="dropdowncontent muted">${subcontentbox.innerHTML}</div>`;
                subcontentbox.insertBefore(h2e, subcontentbox.firstChild);
                contentbox.onclick = function(self) {
                    let output = false;

                    if (self.target.className == "dropdownbutton") {
                        output = self.target;
                    } else if (self.target.parentElement.className == "dropdownbutton") {
                        output = self.target.parentElement;
                    } else if (self.target.firstChild.className == "dropdownbutton") {
                        output = self.target.firstChild;
                    } else if (self.target.parentElement.className == "dropdowncontent") {
                        output = self.target.parentElement.parentElement.firstChild;
                    } else if (self.target.className == "dropdowncontent") {
                        output = self.target.parentElement.firstChild;
                    } else if (
                        self.target.firstChild.firstChild.className == "dropdownbutton"
                    ) {
                        output = self.target.firstChild.firstChild;
                    }


                    if (output !== false) {
                        output.nextSibling.classList.toggle("muted");
                        output.parentElement.parentElement.classList.toggle('on');
                    }
                };
            }
        }

        document.querySelectorAll('[role="note"]').forEach((element) => {
            element.remove();
        });

        sections[0].firstChild.classList.add("firstSection");
    } catch (err) {
        console.error(err.message);
    }
}

fetchAsync();