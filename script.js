const toggleSwitch = document.getElementById('checkbox');
const body = document.getElementsByTagName('body')[0];
const wiki = document.getElementById('wiki');

toggleSwitch.checked = true
body.classList.toggle('dark')
document.documentElement.setAttribute('data-theme', 'dark');
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    body.classList.toggle('dark');
}

toggleSwitch.addEventListener('change', switchTheme, false);

const lang = {
    "en-uk": {
        "creation": {
            "title": "Creation and Release",
            "content": "Vine was initially concieved in June 2012. It was then bought by Twitter in October 2012. Its official release happened on January 24, 2013 - nearly ten years ago.",
            "img": "vine.png"
        },
        "purpose": {
            "title": "Purpose",
            "content": "Vine is a short-form video platform and social media. abc,",
            "img": "vine.png"
        }
    },
    "fr-fr": {
        "creation": {
            "title": "Creation",
            "content": "Vine a ete initallement concu en  2012. Elle a ensuite ete achete Twitter en Octobre 2012. Ce produit a ete finalement sortie le 24 Janvier, 2013 - il y a presque dix ans.",
            "img": "vine.png"
        },
        "purpose": {
            "title": "Purpose",
            "content": "Vine est une plateforme de videos courts, et donc un reseau social. akjdab.",
            "img": "vine.png"
        }
    }
}

console.log(lang)

const langSwitchButton = document.getElementById("langswitch");
const content = document.getElementById("content");
let englishBool = true;

function swapLang(languageTag) {
    let append = ""
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
    };

    content.innerHTML = append;
}

function langSwitch() {
    if (englishBool) {
        langSwitchButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="40" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 19 5.261719 L 27.582031 5.261719 L 27.582031 23.40625 L 19 23.40625 Z M 19 5.261719 " clip-rule="nonzero"/></clipPath><clipPath id="id2"><path d="M 2.179688 5.261719 L 11 5.261719 L 11 23.40625 L 2.179688 23.40625 Z M 2.179688 5.261719 " clip-rule="nonzero"/></clipPath><clipPath id="id3"><path d="M 10 5.261719 L 20 5.261719 L 20 23.40625 L 10 23.40625 Z M 10 5.261719 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#id1)"><path fill="rgb(92.939758%, 16.079712%, 22.349548%)" d="M 27.574219 20.617188 C 27.574219 22.15625 26.3125 23.40625 24.753906 23.40625 L 19.113281 23.40625 L 19.113281 5.261719 L 24.753906 5.261719 C 26.3125 5.261719 27.574219 6.511719 27.574219 8.054688 Z M 27.574219 20.617188 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#id2)"><path fill="rgb(0%, 14.118958%, 58.428955%)" d="M 5.011719 5.261719 C 3.453125 5.261719 2.191406 6.511719 2.191406 8.054688 L 2.191406 20.617188 C 2.191406 22.15625 3.453125 23.40625 5.011719 23.40625 L 10.652344 23.40625 L 10.652344 5.261719 Z M 5.011719 5.261719 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#id3)"><path fill="rgb(93.328857%, 93.328857%, 93.328857%)" d="M 10.652344 5.261719 L 19.113281 5.261719 L 19.113281 23.40625 L 10.652344 23.40625 Z M 10.652344 5.261719 " fill-opacity="1" fill-rule="nonzero"/></g></svg>`;
        englishBool = false;
        swapLang("fr-fr")
    } else {
        langSwitchButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="40" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 2.511719 6.402344 L 27.191406 6.402344 L 27.191406 24.546875 L 2.511719 24.546875 Z M 2.511719 6.402344 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#id1)"><path fill="rgb(0%, 14.118958%, 49.01886%)" d="M 2.519531 9.234375 L 2.519531 11.984375 L 6.375 11.984375 Z M 5.714844 24.546875 L 11.425781 24.546875 L 11.425781 20.472656 Z M 18.277344 20.472656 L 18.277344 24.546875 L 23.984375 24.546875 Z M 2.519531 18.964844 L 2.519531 21.714844 L 6.378906 18.964844 Z M 23.988281 6.402344 L 18.277344 6.402344 L 18.277344 10.472656 Z M 27.183594 21.714844 L 27.183594 18.964844 L 23.324219 18.964844 Z M 27.183594 11.984375 L 27.183594 9.234375 L 23.324219 11.984375 Z M 11.425781 6.402344 L 5.714844 6.402344 L 11.425781 10.472656 Z M 11.425781 6.402344 " fill-opacity="1" fill-rule="nonzero"/><path fill="rgb(81.17981%, 10.5896%, 16.859436%)" d="M 19.742188 18.964844 L 26.394531 23.710938 C 26.71875 23.375 26.949219 22.953125 27.074219 22.488281 L 22.132812 18.964844 Z M 11.425781 18.964844 L 9.960938 18.964844 L 3.304688 23.707031 C 3.664062 24.078125 4.121094 24.34375 4.632812 24.464844 L 11.425781 19.621094 Z M 18.277344 11.984375 L 19.742188 11.984375 L 26.394531 7.238281 C 26.039062 6.867188 25.582031 6.605469 25.070312 6.480469 L 18.277344 11.324219 Z M 9.960938 11.984375 L 3.304688 7.238281 C 2.984375 7.574219 2.753906 7.992188 2.628906 8.460938 L 7.570312 11.984375 Z M 9.960938 11.984375 " fill-opacity="1" fill-rule="nonzero"/><path fill="rgb(93.328857%, 93.328857%, 93.328857%)" d="M 27.183594 17.566406 L 16.90625 17.566406 L 16.90625 24.546875 L 18.277344 24.546875 L 18.277344 20.472656 L 23.984375 24.546875 L 24.441406 24.546875 C 25.207031 24.546875 25.898438 24.222656 26.394531 23.710938 L 19.742188 18.964844 L 22.132812 18.964844 L 27.074219 22.488281 C 27.136719 22.253906 27.183594 22.011719 27.183594 21.753906 L 27.183594 21.714844 L 23.324219 18.964844 L 27.183594 18.964844 Z M 2.519531 17.566406 L 2.519531 18.964844 L 6.378906 18.964844 L 2.519531 21.714844 L 2.519531 21.753906 C 2.519531 22.515625 2.820312 23.203125 3.304688 23.707031 L 9.960938 18.964844 L 11.425781 18.964844 L 11.425781 19.621094 L 4.632812 24.464844 C 4.835938 24.515625 5.042969 24.546875 5.261719 24.546875 L 5.714844 24.546875 L 11.425781 20.472656 L 11.425781 24.546875 L 12.796875 24.546875 L 12.796875 17.566406 Z M 27.183594 9.191406 C 27.183594 8.429688 26.882812 7.742188 26.394531 7.238281 L 19.742188 11.984375 L 18.277344 11.984375 L 18.277344 11.324219 L 25.070312 6.480469 C 24.867188 6.433594 24.660156 6.402344 24.441406 6.402344 L 23.988281 6.402344 L 18.277344 10.472656 L 18.277344 6.402344 L 16.90625 6.402344 L 16.90625 13.378906 L 27.183594 13.378906 L 27.183594 11.984375 L 23.324219 11.984375 L 27.183594 9.234375 Z M 11.425781 6.402344 L 11.425781 10.472656 L 5.714844 6.402344 L 5.261719 6.402344 C 4.496094 6.402344 3.804688 6.722656 3.304688 7.238281 L 9.960938 11.984375 L 7.570312 11.984375 L 2.628906 8.460938 C 2.566406 8.695312 2.519531 8.9375 2.519531 9.191406 L 2.519531 9.234375 L 6.375 11.984375 L 2.519531 11.984375 L 2.519531 13.378906 L 12.796875 13.378906 L 12.796875 6.402344 Z M 11.425781 6.402344 " fill-opacity="1" fill-rule="nonzero"/><path fill="rgb(81.17981%, 10.5896%, 16.859436%)" d="M 16.90625 13.378906 L 16.90625 6.402344 L 12.796875 6.402344 L 12.796875 13.378906 L 2.519531 13.378906 L 2.519531 17.566406 L 12.796875 17.566406 L 12.796875 24.546875 L 16.90625 24.546875 L 16.90625 17.566406 L 27.183594 17.566406 L 27.183594 13.378906 Z M 16.90625 13.378906 " fill-opacity="1" fill-rule="nonzero"/></g></svg>`;
        englishBool = true;
        swapLang("en-uk")
    };
    console.log("Lang Switched: eng=" + englishBool.toString());
}

swapLang("en-uk");

async function doFetch() {
    const rsp = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/html/Vine_%28service%29?redirect=false&stash=true",
        { 'Api-User-Agent': 'MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)' }
    );
    const data = await rsp.text();
    return data;
}

async function fetchAsync() {
    try {
        let result = await doFetch();
        let a = result.split('<section');
        a.shift();
        a.pop();
        a.pop();
        a.pop();
        wiki.innerHTML = "<section" + a.join("<section");
        document.getElementsByClassName('infobox vevent')[0].remove();

        const sections = document.getElementsByTagName('section')
        console.log(sections)

        for (var i = 0; i < sections.length; i++) {
            const h2Element = sections[i].firstChild
            console.log(h2Element)

            
        };
    } catch (err) {
        console.error(err.message);
    }
}

fetchAsync();