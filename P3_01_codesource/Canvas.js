"use strict"

class Canvas {
    constructor(){
        this.canvasElt = document.getElementById("canvas");
        this.context = this.canvasElt.getContext("2d");
        this.canvasStyle();
        this.paint = false;
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
        this.eraserElt = document.getElementById("effacer");
        this.canvasEvents();
        this.checkCanvas = false;
    }
    
    canvasStyle(){
        this.canvasElt.style.backgroundColor = "#ccc";
        this.canvasElt.style.border = "1px solid black";
    }

    addClick(x, y, dragging){
        this.checkCanvas = true;
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    draw(){
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.strokeStyle = "black";
        this.context.lineJoin = "round";
        this.context.lineWidth = 3;
                    
        for(var i=0; i < this.clickX.length; i++) {		
            this.context.beginPath();
            if(this.clickDrag[i] && i){
                this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
            }else{
                this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }

    canvasEvents(){
        var that = this; 
        this.canvasElt.addEventListener("mousedown", function(e){
            e.preventDefault();
            this.paint = true;
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;     
            that.addClick(mouseX, mouseY);
            that.draw();
        });

        this.canvasElt.addEventListener("mousemove", function(e){
            e.preventDefault();
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;  
            if(this.paint){
            that.addClick(mouseX, mouseY, true);
            that.draw();
            }
        });

        this.canvasElt.addEventListener("mouseup", function(e){
            e.preventDefault();
            this.paint = false;
        });

        this.canvasElt.addEventListener("mouseleave", function(e){
            e.preventDefault();
            this.paint = false;
        });

        

        canvas.addEventListener("touchstart", function (e) {
            e.preventDefault();
            this.paint = true;
            var canvasCss = event.target.getBoundingClientRect();
            var mouseX = event.targetTouches[0].clientX - canvasCss.left;
            var mouseY = event.targetTouches[0].clientY - canvasCss.top;   
            that.addClick(mouseX, mouseY);
            that.draw();
        });

        canvas.addEventListener("touchmove", function (e) {
            e.preventDefault();
            var canvasCss = event.target.getBoundingClientRect();
            var mouseX = event.targetTouches[0].clientX - canvasCss.left;
            var mouseY = event.targetTouches[0].clientY - canvasCss.top; 
            if(this.paint){
            that.addClick(mouseX, mouseY, true);
            that.draw();
            }
        });

        this.canvasElt.addEventListener("touchend", function(e){
            e.preventDefault();
            this.paint = false;
        });

        this.canvasElt.addEventListener("touchleave", function(e){
            e.preventDefault();
            this.paint = false;
        });

        

        this.eraserElt.addEventListener("click", function(e){
            e.preventDefault();
            that.checkCanvas = false;
            that.context.clearRect(0, 0, canvas.width, canvas.height);
            that.clickX = new Array();
            that.clickY = new Array();
            that.clickDrag = new Array();
        });
    }

}

