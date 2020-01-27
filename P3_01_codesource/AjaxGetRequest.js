"use strict"

class AjaxGetRequest{
    constructor(url, callback){
        this.url = url;
        this.callback = callback;
        this.request = new XMLHttpRequest();
        this.openRequest();
        this.requestEvents();
        this.sendRequest();
    }

    openRequest(){
        this.request.open("GET", this.url);
    }

    //gestion de la requete en fonction de la réponse renvoyée
    requestEvents(){
        var that = this;
        that.request.addEventListener("load", function () {
            if (that.request.status >= 200 && that.request.status < 400) {
                that.callback(that.request.responseText);
            } else {
                console.error(that.request.status + " " + that.request.statusText + " " + that.url);
            }
        });
        that.request.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + that.url);
        });
    }

    sendRequest(){
        this.request.send(null);
    }
}
