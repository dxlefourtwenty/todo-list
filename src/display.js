const Display = (() => {
    const startPage = document.getElementById("start-page");

    function displayHome() {
        startPage.classList.remove("hidden");
    }

    function displayPage(page) {
        startPage.classList.add("hidden");
        page.classList.remove("hidden");
    }

    function hidePage(page) {
        page.classList.add("hidden");
    }

    return {
        displayHome,
        displayPage,
        hidePage
    }

})();

export default Display;