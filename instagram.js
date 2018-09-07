// ==UserScript==
// @name         instagram_pattern_file
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @include https://www.instagram.com/*
// @author       thebear008
// @match        https://chrome.google.com/webstore/category/extensions?hl=fr
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

        function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function makeButton() {
        var my_button = document.createElement('button')
        my_button.innerHTML = 'GED info'
        my_button.onclick = function() {

        var insta_author = jQuery('header a')[0].innerHTML
        var insta_url = window.location.href.split('/')[4]
        var year_upload = document.getElementsByTagName('time')[0].attributes.datetime.value.split("-")[0]

            var my_h1 = document.getElementsByTagName('article')[0]
            var my_span = document.createElement('span')
            my_span.setAttribute('id', 'my-ged-span')
            my_span.style.color = 'white'
            my_span.style.fontSize = '1px'
            var my_string = document.createTextNode(insta_author + "=" + insta_url  + "=" + year_upload)

            my_h1.appendChild(my_span);
            my_span.appendChild(my_string)

            var q_selector = document.querySelector('#my-ged-span');
            // create a Range object
            var range = document.createRange();
            // set the Node to select the "range"
            range.selectNode(q_selector);
            // add the Range to the set of window selections
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().empty();

        }
        return my_button
    }



    // wait for player to be ready and set up periodic video check
    async function setup()
    {
        await sleep(2000);

        var insta_author = jQuery('header a')[0].innerHTML
        var insta_url = window.location.href.split('/')[4]
        var year_upload = document.getElementsByTagName('time')[0].attributes.datetime.value.split("-")[0]

        // make download button
        var my_button = makeButton();
        var my_h1 = document.getElementsByTagName('article')[0]
        my_h1.appendChild(my_button);

    }

    // start looking for video player
    setup();

})();
