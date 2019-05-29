// ==UserScript==
// @name         get EAG steam script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://store.steampowered.com/*
// @grant        none
// @require
// ==/UserScript==

(function() {
    'use strict';
    window.gameArray = []; //Add a variable to the page which can be iteratively updated on every (next) click

    function getGameData() {
        console.log('Steam crawl initialted');
        var searchElement = document.getElementById('search_result_container');
        var gameList = searchElement.getElementsByClassName('search_result_row ds_collapse_flag');
        console.log('List of games: ' + gameList.length); //Lists games available on the particular page
        var name, id, date;
        for( var i=0; i < gameList.length; i++) {
            var gameElement = gameList[i];
            name = gameElement.getElementsByClassName('title')[0].innerHTML;
            id = gameElement.getAttribute('data-ds-appid');
            date = gameElement.getElementsByClassName('col search_released responsive_secondrow')[0].innerHTML;
            var game = {"name" : name, "id" : id, "date" : date};
            window.gameArray.push(game);
            //console.log('\nGame Id: ' + gameElement.getAttribute('data-ds-appid'));
            //console.log(' Name: ' + gameElement.getElementsByClassName('title')[0].innerHTML);
            //console.log(' Date: ' + gameElement.getElementsByClassName('col search_released responsive_secondrow')[0].innerHTML);
        }
        var pageButton = searchElement.getElementsByClassName("pagebtn");
        for(var j=0; j < pageButton.length; j++) {
            console.log("Button: " + pageButton[j].outerHTML);
            if(pageButton[j].innerHTML == "&gt;") {
                //window.setTimeout(pageButton[j].click(), 5000);
                //window.setTimeout(getGameData(), 2000);
                //Haven't managed to get this to work
            }
        }

        /*

            //TODO: Timer to automatically click next on page.

        */

        //var gameJSON = {"Games": window.gameArray};
        //var a = document.createElement("acer");
        //a.href = "data=gameJSON";
        //a.download = "Hello.txt";
        //a.click();
    }

    //Listen on parent div as the pagination div is reloaded everytime and cancels the listener
    function listener() {
        document.querySelector('.page_content_ctn').addEventListener('click', function () {
        window.setTimeout(getGameData(), 500);
        //listener();
        console.log('Data added');
        });
    }
    //window.getGameData = getGameData();
    listener();
    getGameData();

    //TODO: Automatically print window.gameArray to a *.json file.
    // Temp: Print data from console and save it as json.
})();
