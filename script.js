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

async function doFetch() {
    const rsp = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/html/Vine_%28service%29", {
            "Api-User-Agent": "MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)",
        }
    );
    const data = await rsp.text();
    return data;
}

async function fetchAsync() {
    const d0 = new Date;
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
                    const targetOutput = self.target;

                    if (self.target.className == "dropdownbutton") {
                        output = targetOutput;
                    } else if (targetOutput.parentElement.className == "dropdownbutton") {
                        output = targetOutput.parentElement;
                    } else if (targetOutput.firstChild.className == "dropdownbutton") {
                        output = targetOutput.firstChild;
                    } else if (targetOutput.parentElement.className == "dropdowncontent") {
                        output = targetOutput.parentElement.parentElement.firstChild;
                    } else if (targetOutput.className == "dropdowncontent") {
                        output = targetOutput.parentElement.firstChild;
                    } else if (
                        targetOutput.firstChild.firstChild.className == "dropdownbutton"
                    ) {
                        output = targetOutput.firstChild.firstChild;
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
    const d1 = new Date;
    console.log((d1.getTime() - d0.getTime()).toString() + 'ms')
}

fetchAsync();