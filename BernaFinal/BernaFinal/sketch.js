let DRAGON_STATES = {
    HAPPY: 0,
    TALK: 1,
    FIRE: 2
};

let isFlying = false;
let verticalOffset = 0;
let currentImageIndex = DRAGON_STATES.HAPPY;
let isWaving = false;

let dragonImages = [];
let bodyImage;
let handImage;
let wing1Image;
let wing2Image;
let bodyForWings;

let flyButtonY = 20;
let flyButtonX = 20;
let buttonAreaY = 350;
let buttonHeight = 40;
let buttonWidth = 100;
let buttonPadding = 20;
let mouthX = 150;
let mouthY = 180;

let fire1X, fire1Y;
let handXOffset = 0;

function preload() {
    dragonImages.push(loadImage('assets/ideasforfinal.png'));
    dragonImages.push(loadImage('assets/talkingdragon.png'));
    dragonImages.push(loadImage('assets/firedragon.png'));
    
    bodyImage = loadImage('assets/dragonhandbody.png');
    handImage = loadImage('assets/dragonhand.png');
    wing1Image = loadImage('assets/wingone.png');
    wing2Image = loadImage('assets/wingtwo.png');
    bodyForWings = loadImage('assets/bodyforwings.png');
}

function setup() {
    createCanvas(400, 400);
    updateBackgroundGradient();
    fire1X = mouthX;
    fire1Y = mouthY;
}

function fillGradient(type, config) {
    if (type === 'linear') {
        let { from, to, steps } = config;
        let x1 = from[0], y1 = from[1], x2 = to[0], y2 = to[1];
        let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
        steps.forEach((c, i) => {
            let offset = i / (steps.length - 1);
            gradient.addColorStop(offset, c.toString());
        });
        drawingContext.fillStyle = gradient;
    } else if (type === 'radial') {
        let { from, to, steps } = config;
        let x1 = from[0], y1 = from[1], r1 = from[2];
        let x2 = to[0], y2 = to[1], r2 = to[2];
        let gradient = drawingContext.createRadialGradient(x1, y1, r1, x2, y2, r2);
        steps.forEach((c, i) => {
            let offset = i / (steps.length - 1);
            gradient.addColorStop(offset, c.toString());
        });
        drawingContext.fillStyle = gradient;
    }
}

function updateBackgroundGradient() {
    noStroke();    
    if (isFlying) {
        fillGradient('linear', {
            from : [0, 0],
            to : [width, height],
            steps : [
                color(150, 255, 150),
                color(50, 150, 50)
            ]
        });
    } else if (isWaving) {
        fillGradient('linear', {
            from : [0, 0],
            to : [width, height],
            steps : [
                color(100, 150, 255),
                color(25, 50, 150)
            ]
        });
    } else if (currentImageIndex === DRAGON_STATES.HAPPY) { 
        fillGradient('linear', {
            from : [0, 0],
            to : [width, 0],
            steps : [
                color(255, 255, 100),
                color(255, 150, 0)
            ]
        });
    } else if (currentImageIndex === DRAGON_STATES.TALK) { 
        fillGradient('radial', {
            from : [width/2, height/2, 0],
            to : [width/2, height/2, width/2],
            steps : [
                color(100, 0, 150),
                color(200, 0, 250)
            ]
        });
    } else if (currentImageIndex === DRAGON_STATES.FIRE) { 
        fillGradient('linear', {
            from : [width/2, 0],
            to : [width/2, height],
            steps : [
                color(200, 50, 0),
                color(50, 0, 0)
            ]
        });
    }
    rect(0, 0, width, height);
}

function draw() {
    updateBackgroundGradient();

    if (isFlying) {
             verticalOffset = sin(frameCount * 0.07) * 4; 
             image(wing1Image, 0, -verticalOffset, width, height);
         image(wing2Image, 0, -verticalOffset, width, height); 
         image(bodyForWings, 0, verticalOffset, width, height);

    } else if (isWaving) {
        image(bodyImage, 0, 0, width, height);
        handXOffset = sin(frameCount * 0.15) * 7;
        image(handImage, 0 + handXOffset, 0, width, height);

    } else if (currentImageIndex === DRAGON_STATES.FIRE) {
        image(dragonImages[currentImageIndex], 0, 0, width, height);
        fill(255, 100, 0);
        noStroke();
        ellipse(fire1X, fire1Y, 30, 30);
        fire1X -= 4;
        if (fire1X < 0) {
            fire1X = mouthX;
            fire1Y = mouthY;
        }
    } else {
        image(dragonImages[currentImageIndex], 0, 0, width, height);
    }

    drawButtons();
}

function drawButtons() {
    textAlign(CENTER, CENTER);
    textSize(14);

     fill(isFlying ? 'blue' : 'lightgray');
    rect(flyButtonX, flyButtonY, buttonWidth, buttonHeight);
    fill('black');
    text('Fly', flyButtonX + buttonWidth / 2, flyButtonY + buttonHeight / 2);

     let waveButtonX = width - buttonWidth - buttonPadding;
    let waveButtonY = buttonPadding;
    fill(isWaving ? 'blue' : 'lightgray');
    rect(waveButtonX, waveButtonY, buttonWidth, buttonHeight);
    fill('black');
    text('Wave', waveButtonX + buttonWidth / 2, waveButtonY + buttonHeight / 2);

    let button0X = buttonPadding;
    fill(currentImageIndex === DRAGON_STATES.HAPPY && !isWaving && !isFlying ? 'blue' : 'white');
    rect(button0X, buttonAreaY, buttonWidth, buttonHeight);
    fill('black');
    text('Happy', button0X + buttonWidth / 2, buttonAreaY + buttonHeight / 2);

     let button1X = buttonPadding + buttonWidth + buttonPadding;
    fill(currentImageIndex === DRAGON_STATES.TALK && !isWaving && !isFlying ? 'blue' : 'white');
    rect(button1X, buttonAreaY, buttonWidth, buttonHeight);
    fill('black');
    text('Talk', button1X + buttonWidth / 2, buttonAreaY + buttonHeight / 2);

    let button2X = buttonPadding + (buttonWidth + buttonPadding) * 2;
    fill(currentImageIndex === DRAGON_STATES.FIRE && !isWaving && !isFlying ? 'blue' : 'white');
    rect(button2X, buttonAreaY, buttonWidth, buttonHeight);
    fill('black');
    text('Fire', button2X + buttonWidth / 2, buttonAreaY + buttonHeight / 2);
}

function mouseClicked() {
    let stateChanged = false;

     if (mouseX > flyButtonX && mouseX < flyButtonX + buttonWidth && mouseY > flyButtonY && mouseY < flyButtonY + buttonHeight) {
         if (isFlying === false || isWaving === true) {
            stateChanged = true;
        }
        isFlying = !isFlying;
        isWaving = false;
    }

     if (mouseY > buttonAreaY && mouseY < buttonAreaY + buttonHeight) {
        let oldIndex = currentImageIndex;
        let button0X = buttonPadding;
        let button1X = buttonPadding + buttonWidth + buttonPadding;
        let button2X = buttonPadding + (buttonWidth + buttonPadding) * 2;
        
         if (mouseX > button0X && mouseX < button0X + buttonWidth) {
            currentImageIndex = DRAGON_STATES.HAPPY;
        } else if (mouseX > button1X && mouseX < button1X + buttonWidth) {
            currentImageIndex = DRAGON_STATES.TALK;
        } else if (mouseX > button2X && mouseX < button2X + buttonWidth) {
            currentImageIndex = DRAGON_STATES.FIRE;
        }

        if (mouseX > button0X && mouseX < button2X + buttonWidth) {
            isFlying = false;
            isWaving = false;
            
             if (oldIndex !== currentImageIndex || isFlying || isWaving) {
                stateChanged = true;
            }

            if (oldIndex !== DRAGON_STATES.FIRE && currentImageIndex === DRAGON_STATES.FIRE) {
                fire1X = mouthX;
                fire1Y = mouthY;
            }
        }
    }

     let waveButtonX = width - buttonWidth - buttonPadding;
    let waveButtonY = buttonPadding;
    if (mouseX > waveButtonX && mouseX < waveButtonX + buttonWidth && mouseY > waveButtonY && mouseY < waveButtonY + buttonHeight) {
         if (isWaving === false || isFlying === true) {
            stateChanged = true;
        }
        isWaving = !isWaving;
        isFlying = false;
    }

    if (stateChanged) {
        updateBackgroundGradient();
    }
}