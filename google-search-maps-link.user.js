// ==UserScript==
// @name         Maps link for Google Search Results
// @namespace    https://qoomon.github.io
// @version      1.0.2
// @updateURL    https://github.com/qoomon/userscript-google-search-maps-link/raw/main/google-search-maps-link.user.js
// @downloadURL  https://github.com/qoomon/userscript-google-search-maps-link/raw/main/google-search-maps-link.user.js
// @author       qoomon
// @match        https://www.google.*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
  setTimeout(addGoogleMapsButton, 1000);

  function addGoogleMapsButton() {
    const mainMapWidgetElement = document.querySelector('[data-test-id="met"]')?.closest('[jscontroller]:not([jsaction])')
      ?? document.querySelector('[data-test-id="met"]');
    if (mainMapWidgetElement) {
      console.log("[Maps link for Google Search Results]", "Add map button to main map");
      // Add a button to open the location in Google Maps
      const mapsButton = document.createElement("a");
      mapsButton.href = googleMapsUrl();
      Object.assign(mapsButton.style, {
        position: "absolute",
        top: "54px",
        right: mainMapWidgetElement.getAttribute('data-test-id') ? "8px" : "12px",
      });

      const tmpElement = document.createElement("div");
      tmpElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/></svg>';
      const mapsButtonInner = tmpElement.firstChild;
      Object.assign(mapsButtonInner.style, {
        padding: mainMapWidgetElement.getAttribute('data-test-id') ? "7px" : "9px",
        borderRadius: "999px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "rgb(255 255 255 / 88%)",
      });

      mapsButton.appendChild(mapsButtonInner);
      mainMapWidgetElement.appendChild(mapsButton);
    }

    const sidbarMapWidgetElement = document.querySelector('#rhs img[src^="/maps/"]');
    if (sidbarMapWidgetElement) {
      console.log("[Maps link for Google Search Results]", "Add map link to sidebar map");
      // Wrap the map image in a link to Google Maps
      const link = document.createElement("a");
      link.href = googleMapsUrl();
      sidbarMapWidgetElement.parentNode.insertBefore(link, sidbarMapWidgetElement);
      link.appendChild(sidbarMapWidgetElement);
    }
  }

  function googleMapsUrl() {
    const googleTLD  = location.host.split('.').at(-1);
    const googleQuery = new URLSearchParams(location.search).get('q');
    return `https://www.google.${googleTLD}/maps/search/${encodeURIComponent(googleQuery)}`;
  }
})();
