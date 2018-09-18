// ==UserScript==
// @name         vimeo_pattern_file
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @include https://vimeo.com/*
// @author       thebear008
// @match        https://chrome.google.com/webstore/category/extensions?hl=fr
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function(){

    'use strict';

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

            var my_json = JSON.parse(document.querySelectorAll("script[type='application/ld+json']")[0].innerHTML)
            var vimeo_author = cleanString(my_json[0].author.name.replace( /[_#!<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' ));

            var vimeo_url = my_json[0].url.replace( /[_#!<>:"\/\\|?*]/g, '' ).replace(/[^0-9]/g, '' )
            //var vimeo_name = my_json[0].name.replace( /[#!<>:"\/\\|?*]/g, '' ).replace(/ /g, '_' )
            var year_upload = my_json[0].uploadDate.substring(0, 4)

            var my_h1 = document.getElementsByTagName('h1')[1]
            var my_span = document.createElement('span')
            my_span.setAttribute('id', 'my-ged-span')
            my_span.style.color = 'white'
            my_span.style.fontSize = '1px'
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
            window.getSelection().empty();

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
        var my_h1 = document.getElementsByTagName('h1')[1]
        my_h1.appendChild(my_button);

    }

    // start looking for video player
    setup();

})();
