"use strict"

class Timer {
    constructor(){
        this.minutes;
        this.secondes;
        this.timerTxt = document.getElementById("timer");
        this.annulerElt = document.getElementById("annuler");
        this.continueTimer();
        this.events();
        this.localStorage();
    }

    
    decrire(){
        var inputName = document.getElementById("nom");
        var inputSurname = document.getElementById("prenom");
        if (this.minutes === -1){
            this.timerTxt.textContent = "";
        }else{
            this.timerTxt.textContent = `Vous avez réservé 1 vélo au nom de ${inputName.value} ${inputSurname.value}, ${myMap.station.textContent}.
             Votre réservation prendra fin dans ${this.minutes} min ${this.secondes} s.`;
        }  
    }

    initTimer(){
        var timeOutId = setTimeout(this.startTimer.bind(this), 1000);
        this.secondes = 0;
        this.minutes = 20;       
    }

    startTimer(){
        this.decrire();
        this.annulerElt.style.visibility = "visible";
        sessionStorage.setItem("minutes",this.minutes); 
        sessionStorage.setItem("secondes",this.secondes);
        sessionStorage.setItem("station",myMap.station.textContent);     
        this.secondes--;          
        if (this.secondes === -1){
            this.minutes--;
            this.secondes = 59;
        }
        this.timeOutId = setTimeout(this.startTimer.bind(this), 1000);
        if (this.minutes == -1){
            clearTimeout(this.timeOutId, 1000);
            this.decrire();
            sessionStorage.clear();
            this.annulerElt.style.visibility = "hidden";
        }
    }

    cancelTimer(){
        clearTimeout(this.timeOutId);
        this.min = 20;
        this.secondes = 0;
        sessionStorage.clear();
        this.timerTxt.textContent = "";
        this.annulerElt.style.visibility = "hidden";
        myMap.dispo.textContent = Number(myMap.dispo.textContent)+1;
    }  
    
    //reprise de la réservation au rafraichissement de la page
    continueTimer(){
        if((sessionStorage.getItem("minutes") == -1) || (this.minutes == 20)){
            sessionStorage.clear();
            clearTimeout(this.timeOutId, 1000);
        }else {
            this.minutes = sessionStorage.getItem("minutes");
            this.secondes = sessionStorage.getItem("secondes");
            myMap.station.textContent = sessionStorage.getItem("station");
            this.startTimer();
        }
    }

    localStorage(){
        var that = this;
        var formElt = document.getElementById("form");
        var errorMsg = document.getElementById("error-msg");
        var nom = document.getElementById("nom");
        var prenom = document.getElementById("prenom");

        formElt.addEventListener("submit", function(e){
            e.preventDefault();
            //effacer local et session storage
            localStorage.clear();
            if (myCanvas.checkCanvas == false){
                errorMsg.textContent= "Veuillez signer le formulaire";
                errorMsg.style.color = "#ff7070";    
            }else{
                that.cancelTimer();
                that.initTimer();
                myMap.dispo.textContent = myMap.dispo.textContent-1;
                errorMsg.textContent= "";
                that.store();
            }
        });
        
        //remplissage automatique du formulaire si déjà remplis
        if (localStorage.getItem("nom") != null){
            nom.value = localStorage.getItem("nom");
            prenom.value = localStorage.getItem("prenom");
        }
    }

    store(){
        localStorage.setItem("nom", nom.value);
        localStorage.setItem("prenom", prenom.value);
    }

    events(){
        this.annulerElt.addEventListener("click", this.cancelTimer.bind(this));
    }
    
}