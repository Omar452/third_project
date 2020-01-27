"use strict"

class Diaporama {
    constructor (interval){
        this.interval = interval;
        this.i = 0;
        this.diapo = document.getElementById("diaporama");
        this.images = document.getElementsByClassName("imgDiapo");
        this.leftbtn = document.getElementById("previous-button");
        this.rightbtn = document.getElementById("next-button");
        this.verif = false;
        this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
        this.diapoEvents();
    }
    initDiapo(){
        this.verif = true;
        this.i++;
        if (this.i == 4){
            this.i = 0;
            this.resetDiapo();
            this.images[this.i].style.opacity = 1;
            this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
        }else{
            this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
            this.images[this.i].style.opacity = 1;
        }             
    }

    //réinitialisation de l'opacité des images
    resetDiapo(){
        this.images[0].style.opacity = 1;
        this.images[1].style.opacity = 0;
        this.images[2].style.opacity = 0;
        this.images[3].style.opacity = 0;
    }

    stopDiapo(e){
        if(this.verif){
            this.verif = false;
            clearTimeout(this.timeOutId);
        }else{
            this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
        }
        
    }

    prevImg(e){
        e.stopPropagation();
        clearTimeout(this.timeOutId);
        this.i--;
        if (this.i == -1){
            this.i = 3;
            this.images[this.i].style.opacity = 1;
            this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
        }else{
            this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
            this.images[this.i].style.opacity = 1;
            this.images[this.i+1].style.opacity = 0;
        }            
    }

    nextImg(e){
        e.stopPropagation();
        clearTimeout(this.timeOutId);
        this.i++;
        if (this.i == 4){
            this.i = 0;
            this.resetDiapo();
            this.images[this.i].style.opacity = 1;
            this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
        }else{
            this.timeOutId = setTimeout(this.initDiapo.bind(this), this.interval);
            this.images[this.i].style.opacity = 1;
        }            
    }

    changeImgWithKeyboard(e){
        if (e.keyCode == 37){
            this.prevImg(e);
        }else if (e.keyCode == 39){
            this.nextImg(e);
        }
        else if (e.keyCode == 32){
            e.preventDefault();
            this.stopDiapo(e);
        }
    }

    diapoEvents(){
        this.diapo.addEventListener("click", this.stopDiapo.bind(this));
        this.rightbtn.addEventListener("click", this.nextImg.bind(this));
        this.leftbtn.addEventListener("click", this.prevImg.bind(this));
        document.addEventListener("keydown", this.changeImgWithKeyboard.bind(this));
    }
}