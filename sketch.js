let pianoImages = [];
let pianoSound;
let lastKeyPressTime;
let pauseTime = 0;
let musicPlaying = false; 

function preload() {
    // Load sound
    pianoSound = loadSound('Media/mozart.mp3');
    // Load images
    for (let i = 1; i <= 24; i++) {
        pianoImages[i] = loadImage('Media/1-' + String(i).padStart(2, '0') + '.png'); 
        //pianoImages[i] = loadImage('Media/' + i + '.png');
    }
}

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');

    // Initialize the time of the last key press
    lastKeyPressTime = millis();
}

function draw() {
    background(0);

    let aspectRatio = pianoImages[1].width / pianoImages[1].height;
    let maxWidth = min(width, pianoImages[1].width);
    let maxHeight = maxWidth / aspectRatio;
    let x = width / 2 - maxWidth / 2;
    let y = height / 2 - maxHeight / 2;

    if (musicPlaying && pianoSound.isLoaded()) {
        for (let i = 1; i <= 24; i++) {
            let randomTransparency = random([100, 255]);
            tint(255, randomTransparency);
            image(pianoImages[i], x, y, maxWidth, maxHeight);
        }
    } else {
        for (let i = 1; i <= 24; i++) {
            tint(255, 255);
            image(pianoImages[i], x, y, maxWidth, maxHeight);
        }
    }

    textAlign(CENTER, CENTER);
    textSize(31);
    fill(255);
    text('Keep Typing on your keyboard, and you are a pianist!', width / 2, 50);

    if (keyIsPressed) {
        lastKeyPressTime = millis();
        if (!musicPlaying && pianoSound.isLoaded()) {
            pianoSound.play();
            musicPlaying = true;
        }
    } else {
        if (millis() - lastKeyPressTime > 1000) {
            if (musicPlaying) {
                pauseTime = pianoSound.currentTime();
                pianoSound.pause();
                musicPlaying = false;
            }
        }
    }

    console.log(frameCount);
}

function keyPressed() {
    if (pianoSound && pianoSound.isPaused() && pianoSound.isLoaded()) {
        pianoSound.play();
        pianoSound.jump(pauseTime);
        musicPlaying = true;
    }
}
