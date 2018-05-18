// ==UserScript==
// @name         vimeo_pattern_file
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @include https://vimeo.com/*
// @author       You
// @match        https://chrome.google.com/webstore/category/extensions?hl=fr
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function(){

    'use strict';

    function makeButton(my_string) {
        var my_button = document.createElement('button')
        my_button.innerHTML = 'GED info'
        my_button.onclick = function() {
            alert(my_string)
        }
        return my_button
    }

    // wait for player to be ready and set up periodic video check
    function setup()
    {

        var my_json = JSON.parse(document.querySelectorAll("script[type='application/ld+json']")[0].innerHTML)
        var vimeo_author = my_json[0].author.name.replace( /[<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' )
        var vimeo_url = my_json[0].url.replace( /[<>:"\/\\|?*]/g, '' ).replace(/[^0-9]/g, '' )
        var vimeo_name = my_json[0].name.replace( /[<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' )
        var year_upload = my_json[0].uploadDate.substring(0, 4)

        var my_h1 = document.getElementsByTagName('h1')[0]
        var my_string = vimeo_author + "|" + vimeo_url + "|" + vimeo_name + "|" + year_upload
        //my_h1.innerHTML += "<span style='color:red'>" + my_string + "</span>"

        // make download button
        var button = makeButton(my_string);
        my_h1.appendChild(button)

    }

    // start looking for video player
    setup();

})();
