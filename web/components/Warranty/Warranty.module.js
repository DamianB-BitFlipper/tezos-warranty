import styles from './Warranty.module.css';

// From: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs
export function openTab(e, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(styles.tabcontent);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName(styles.tablinks);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" " + styles.active, "");
    }
    document.getElementById(tabName).style.display = "block";
    e.currentTarget.className += (" " + styles.active);
}
