// ==UserScript==
// @name         dribble_pattern_file
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @include https://dribbble.com/*
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



var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};


function slugify (str) {
  const from  = "ąàáäâãåæćęęèéëêìíïîłńòóöôõøśùúüûñçżź",
      to    = "aaaaaaaaceeeeeeiiiilnoooooosuuuunczz",
      regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');

  if (str === null) return '';

  str = String(str).toLowerCase().replace(regex, function(c) {
    return to.charAt(from.indexOf(c)) || '-';
  });

  return str.replace(/[^\w\s-]/g, '').replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};


function cleanString (str) {
    return slugify(decodeHTML(str));
}


    function makeButton() {
        var my_button = document.createElement('button')
        my_button.innerHTML = 'GED info'
        my_button.onclick = function() {

        var temp = jQuery('h2.shot-byline span.shot-byline-user a')[0].href.split('/')
        var author = temp[temp.length - 1]

        var author = cleanString(author)
        var url = cleanString(window.location.href.split('/')[4])
        var year_upload = jQuery('span.shot-byline-date').children()[0].href.split('=')[1].split('-')[0]

            var my_h1 = jQuery('h2.shot-byline')[0]
            var my_span = document.createElement('span')
            my_span.setAttribute('id', 'my-ged-span')
            my_span.style.color = 'white'
            my_span.style.fontSize = '1px'
            var my_string = document.createTextNode(author + "=" + url  + "=" + year_upload)

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

        // make download button
        var my_button = makeButton();
        var my_h1 = jQuery('h2.shot-byline')[0]
        my_h1.appendChild(my_button);

    }

    // start looking for video player
    setup();

})();
