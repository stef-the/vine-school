
const toggleSwitch = document.getElementById('checkbox');
const body = document.getElementsByTagName('body')[0]

toggleSwitch.checked = false
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    body.classList.toggle('dark')
}

toggleSwitch.addEventListener('change', switchTheme, false);
