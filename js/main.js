/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 *     Project: Canvas-Animation 2.1
 *     Version: 1.0
 *     
 *     Created on : 3.4.14
 */

var canvas1 = document.getElementById("CANVAS_1");
var cnvsCntxt1 = false;
var canvas2 = document.getElementById("CANVAS_2");
var cnvsCntxt2 = false;

// Handling the animation sprie
//var imgAniSprite = document.getElementById("ANI_SPRITE_1");
var imgAniSprite = new Image();

// Background image
var imgBackground = new Image();
var imgForeground = new Image();

var x = 0, y = 0;   // Image coordinates of the sprite.

var x2 = 0;         // Translate position in the function "mainAnimation".

var x1 = 0;         // Need for background animation.

window.onload = function()
{
    // Get the canvas context
    if (!(cnvsCntxt1 = canvas1.getContext("2d")))
    {
        alert("ERROR: Couldn't got canvas context!");
        return;
    }
//    console.log(cnvsCntxt1);
    if (!(cnvsCntxt2 = canvas2.getContext("2d")))
    {
        alert("ERROR: Couldn't got canvas context!");
        return;
    }
//    console.log(cnvsCntxt2);

    // Get sprite
    imgAniSprite.src = "img/sprite.png";

    // Get background for the 2. canvas
    imgBackground.src = "img/background-2.png";
//    console.log(imgBackground);
    imgBackground.onload = function()
    {
        // Draw the background image twice side by side
        cnvsCntxt2.drawImage(imgBackground, 0, 0);
//        cnvsCntxt2.drawImage(imgBackground, imgBackground.width, 0);
    };
    
    // Get foreground image:
    imgForeground.src = "img/foreground-2.png";
    imgForeground.onload = function ()
    {
        // Draw the foreground image twice side by side
        cnvsCntxt2.drawImage(imgForeground, 0, canvas2.height-imgForeground.height);
//        cnvsCntxt2.drawImage(imgForeground, imgForeground.width, 0);
    };

    // Start the animations
    animateSprite();
    mainAnimation();
};

function animateSprite()
{
    cnvsCntxt1.save();
    cnvsCntxt1.clearRect(0, 0, imgAniSprite.width, imgAniSprite.height);
    cnvsCntxt1.translate(x, y);
    cnvsCntxt1.drawImage(imgAniSprite, 0, 0);
    cnvsCntxt1.restore();

    x -= 128;
    if (x === -imgAniSprite.width) {
        x = 0;
        y -= 128;
    }
    if (y === -imgAniSprite.height) {
        y = 0;
    }
    setTimeout('animateSprite()', 40);
}

function mainAnimation()
{
    cnvsCntxt2.save();
    
    cnvsCntxt2.clearRect(0, 0, canvas2.width * 2, canvas2.height);
    cnvsCntxt2.translate(-1*x2, 0);
    
    cnvsCntxt2.drawImage(imgBackground, x1, 0);
    cnvsCntxt2.drawImage(imgBackground, x1+imgBackground.width, 0);
    cnvsCntxt2.drawImage(imgBackground, x1-imgBackground.width, 0);
    
    cnvsCntxt2.drawImage(imgForeground, 0, canvas2.height-imgForeground.height);
    cnvsCntxt2.drawImage(imgForeground, canvas2.width, canvas2.height-imgForeground.height);
    
    cnvsCntxt2.drawImage(canvas1, x2+300-64 ,330);
    
    cnvsCntxt2.restore();

    x1 += 2;
    if (x1 >= canvas2.width) {
        x1 = 0;
    }
    x2 += 3;
    if (x2 >= canvas2.width) {
        x2 = 0;
    }
    requestAnimationFrame(function () {mainAnimation();});
}
