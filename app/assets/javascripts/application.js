// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
// require rails-ujs
//= require turbolinks
//= require_tree .

$(document).ready(function () {
    var map = L.map('map').setView([36, 127.5], 6.5);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 13,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9uZ2NoYW5sZWUiLCJhIjoiY2o2aHFsYnBuMGx1NjJybXE0NXJjaGtreCJ9.QvktajU9AkN8ZYqPtLNg9A'
    }).addTo(map);

    L.geoJSON(geojson).addTo(map);
    for (var i = 0; i < providers.length; i++) {
        local[providers[i]["local_code"]]["count"] += 1;
    }

    var tbody = $("table tbody");

    for (var i = 0; i < providers.length; i++) {
        var count = local[providers[i]["local_code"]]["count"];
        var local_code = providers[i]["local_code"];
        if ((count != 0) && !marked_local.includes(local_code)) {
            marked_local.push(local_code);
            var lat = local[local_code]["lat"];
            var long = local[local_code]["long"];
            L.marker([lat, long], {
                title: local[local_code]["name"]
            }).bindPopup("<div class='custom-popup'>검출된 농장 <span class='custom-popup-count'>" + count + "</span>개 </div>"
            ).on('click', onClick).addTo(map);
        }
    }

    function onClick(e) {
        tbody.empty();
        var title = e.target.options.title;
        for (var i = 0; i < providers.length; i++) {
            var local_code = providers[i]["local_code"];
            if (local[local_code]["name"] == title)
                tbody.append("<tr>" +
                    "<td>" + title + "(" + providers[i]["local_code"] + ")</td>" +
                    "<td>" + providers[i]["provider"] + "</td>" +
                    "</tr>");
        }
    }

    $("input.search-bar").keyup(function (e) {
        console.log($(this).val());
        tbody.empty();
        var value = $(this).val();
        for (var i = 0; i < providers.length; i++) {
            var local_code = providers[i]["local_code"];
            if(providers[i]["provider"].includes(value)){
                tbody.append("<tr>" +
                    "<td>" + local[local_code]["name"] + "(" + providers[i]["local_code"] + ")</td>" +
                    "<td>" + providers[i]["provider"] + "</td>" +
                    "</tr>");
            }
        }
    });
});