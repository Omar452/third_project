"use strict"

class Map {
    constructor (latitude, longitude, zoom){
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
        this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b65d7daeedbbd52511f0fed7965707fe04eea13b";
        this.id = document.getElementById("map");
        this.dispo = document.getElementById("txt-dispo");
        this.station = document.getElementById("txt-station");
        this.map = L.map(this.id).setView([this.latitude, this.longitude], this.zoom);
        this.createLayer();
        this.requeteAjax();
    }

    //creation de calque image
    createLayer(){
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    getStations(reponse){
        var that = this;
        //recuperation du DOM
        var msgForm = document.getElementById("msg-form");
        var txtAdresse = document.getElementById("txt-adresse");
        var txtStatut = document.getElementById("txt-statut");
        var submitElt = document.getElementById("submit");

        //ajout des stations sur la map
        var stations = JSON.parse(reponse);

        //creation icone
        var myIcon = L.icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            shadowSize: [41, 41],
        });

        stations.forEach(function(station){

            if((station.available_bikes === 0) || (station.status === "CLOSED")){
                station.status = "FERMEE";
                myIcon.options.iconUrl = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
            } else if (station.available_bikes < 10){
                station.status = "OUVERTE";
                myIcon.options.iconUrl = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png";
            } else {
                station.status = "OUVERTE";
                myIcon.options.iconUrl = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
            }
            
            //ajout des marqueurs
            var markers = L.marker([station.position.lat, station.position.lng],{ icon: myIcon }).addTo(that.map);
            //ajout de popups
            var popups = markers.bindPopup(`<p class="popups">${station.name} </br> ${station.address} </br> vélos disponibles : ${station.available_bikes} </br> statut : ${station.status}</p>`);

            //ajout de l'evenement clic sur les marqueurs
            markers.addEventListener("click",function(){
                that.station.textContent = `Station: ${station.name}`;
                txtAdresse.textContent = `Adresse: ${station.address}`;
                that.dispo.textContent =  station.available_bikes;
                txtStatut.textContent = `Statut: ${station.status}`;

                if((station.available_bikes === 0) || (station.status === "CLOSED")){
                    msgForm.textContent = "Station fermée, veuillez selectionner une autre station";
                    msgForm.style.color = "#ff7070";
                    submitElt.style.visibility = "hidden";
                }else {
                    msgForm.textContent = "Veuillez completer le formulaire et le signer pour valider votre réservation.";
                    msgForm.style.color = "#B5E86C";
                    submitElt.style.visibility = "visible";
                }
            });
        });
    }

    //requete AJAX
    requeteAjax(){
        var ajaxGetRequest = new AjaxGetRequest(this.url, this.getStations.bind(this));
    }

}

