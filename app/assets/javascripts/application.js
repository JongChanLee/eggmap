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
    var map;
    if (window.matchMedia('(max-width: 768px)').matches) {
        map = L.map('map').setView([36, 127.5], 7);
    }else{
        map = L.map('map').setView([36, 127.5], 6.5);
    }
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 13,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9uZ2NoYW5sZWUiLCJhIjoiY2o2aHFsYnBuMGx1NjJybXE0NXJjaGtreCJ9.QvktajU9AkN8ZYqPtLNg9A'
    }).addTo(map);

    L.geoJSON(geojson).addTo(map);
    for (var i = 0; i < providers.length; i++) {
        local[providers[i]["local_cd"]]["count"] += 1;
    }

    var tbody = $("table tbody");

    for (var i = 0; i < providers.length; i++) {
        var count = local[providers[i]["local_cd"]]["count"];
        var local_cd = providers[i]["local_cd"];
        if ((count != 0) && !marked_local.includes(local_cd)) {
            marked_local.push(local_cd);
            var lat = local[local_cd]["lat"];
            var long = local[local_cd]["long"];
            L.marker([lat, long], {
                title: local[local_cd]["sido_nm"]
            }).bindPopup("<div class='custom-popup'>검출된 농장 <span class='custom-popup-count'>" + count + "</span>개 </div>"
            ).on('click', onClick).addTo(map);
        }
    }

    function onClick(e) {
        tbody.empty();
        var title = e.target.options.title;
        for (var i = 0; i < providers.length; i++) {
            var local_cd = providers[i]["local_cd"];
            if (local[local_cd]["sido_nm"] == title)
                tbody.append("<tr>" +
                    "<td>" + title + "(" + providers[i]["local_cd"] + ")</td>" +
                    "<td>" + providers[i]["nongga_nm"] + "</td>" +
                    "<td>" + providers[i]["nagak_cd"].replace(/&lt;br&gt;/g, "<br>") + "</td>" +
                    "</tr>");
        }
    }

    $("input.search-bar").keyup(function (e) {
        tbody.empty();
        var value = $(this).val();
        for (var i = 0; i < providers.length; i++) {
            var local_cd = providers[i]["local_cd"];
            if (providers[i]["nagak_cd"].includes(value)) {
                tbody.append("<tr>" +
                    "<td>" + local[local_cd]["sido_nm"] + "(" + providers[i]["local_cd"] + ")</td>" +
                    "<td>" + providers[i]["nongga_nm"] + "</td>" +
                    "<td>" + providers[i]["nagak_cd"].replace(/&lt;br&gt;/g, "<br>") + "</td>" +
                    "</tr>");
            }
        }
    });


    for (var i = 0; providers.length; i++) {
        var local_cd = providers[i]["local_cd"];
        tbody.append("<tr>" +
            "<td>" + local[local_cd]["sido_nm"] + "(" + providers[i]["local_cd"] + ")</td>" +
            "<td>" + providers[i]["nongga_nm"] + "</td>" +
            "<td>" + providers[i]["nagak_cd"].replace(/&lt;br&gt;/g, "<br>") + "</td>" +
            "</tr>");
    }
});