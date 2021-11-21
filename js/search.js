let searchText = document.getElementById("search_text");
let searchButton = document.getElementById("search");

searchButton.addEventListener("click", () => {
    markerList.searchMarkers(searchText.value);
})