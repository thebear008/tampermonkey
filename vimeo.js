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

    function makeButton() {
        var my_button = document.createElement('button')
        my_button.innerHTML = 'GED info'
        my_button.onclick = function() {

            var my_json = JSON.parse(document.querySelectorAll("script[type='application/ld+json']")[0].innerHTML)
            var vimeo_author = my_json[0].author.name.replace( /[_#!<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' )
            var vimeo_url = my_json[0].url.replace( /[_#!<>:"\/\\|?*]/g, '' ).replace(/[^0-9]/g, '' )
            //var vimeo_name = my_json[0].name.replace( /[#!<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' )
            var year_upload = my_json[0].uploadDate.substring(0, 4)

            var my_h1 = document.getElementsByTagName('h1')[0]
            var my_span = document.createElement('span')
            my_span.setAttribute('id', 'my-ged-span')
            var my_string = document.createTextNode(vimeo_author + "=" + vimeo_url  + "=" + year_upload)



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
            my_h1.removeChild(my_h1.firstChild)
            my_h1.removeChild(my_h1.firstChild)
        }
        return my_button
    }

    // wait for player to be ready and set up periodic video check
    function setup()
    {

        var my_json = JSON.parse(document.querySelectorAll("script[type='application/ld+json']")[0].innerHTML)
        var vimeo_author = my_json[0].author.name.replace( /[#!<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' )
        var vimeo_url = my_json[0].url.replace( /[#!<>:"\/\\|?*]/g, '' ).replace(/[^0-9]/g, '' )
        var vimeo_name = my_json[0].name.replace( /[#!<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' )
        var year_upload = my_json[0].uploadDate.substring(0, 4)


        //my_span.innerHTML = my_string
        //my_h1.innerHTML += "<span style='color:red'>" + my_string + "</span>"

        // make download button
        var my_button = makeButton();
        var my_h1 = document.getElementsByTagName('h1')[0]
        my_h1.appendChild(my_button);




    }

    // start looking for video player
    setup();

})();
