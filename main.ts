function turnLeft () {
    switch (direction) {
        case 'u':
            direction = 'l';
            break;
        case 'l':
            direction = 'd';
            break;
        case 'r':
            direction = 'u';
            break;
        case 'd':
            direction = 'r';
            break;
    }
}
function resetGame () {
    headX = 0
    headY = 0
    foodX = 0
    foodY = 0
    snake = []
    snakeLength = 1
    direction = "r"
    gameOver = false
}
function spawnFood () {
    while (foodX == headX && foodY == headY) {
        foodX = randint(0, 4)
        foodY = randint(0, 4)
    }
}
function playGameOverSound () {
    sound = music.builtinPlayableSoundEffect(soundExpression.sad)
    music.play(sound, music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.A, function () {
    turnLeft()
})
function checkFood () {
    if (headX == foodX && headY == foodY) {
        snakeLength += 1
        spawnFood()
    }
}
function moveSnake () {
    switch (direction) {
        case 'u':
            headY -= 1;
            break;
        case 'd':
            headY += 1;
            break;
        case 'l':
            headX -= 1;
            break;
        case 'r':
            headX += 1;
            break;
    }
if (headX < 0) {
        headX = width - 1
    } else if (headX > width - 1) {
        headX = 0
    }
    if (headY < 0) {
        headY = height - 1
    } else if (headY > width - 1) {
        headY = 0
    }
}
function turnRight () {
    switch (direction) {
        case 'u':
            direction = 'r';
            break;
        case 'l':
            direction = 'u';
            break;
        case 'r':
            direction = 'd';
            break;
        case 'd':
            direction = 'l';
            break;
    }
}
function checkCollision () {
    for (let part2 of snake) {
        if (headX == part2.x && headY == part2.y) {
            gameOver = true
        }
    }
}
input.onButtonPressed(Button.B, function () {
    turnRight()
})
let sound: SoundExpression = null
let gameOver = false
let snake: SnakePart[] = []
let foodY = 0
let foodX = 0
let direction = ""
let height = 0
let width = 0
let snakeLength = 0
let headY = 0
let headX = 0
snakeLength = 1
spawnFood()
music.setBuiltInSpeakerEnabled(true)
width = 5
height = 5
led.plot(headX, headY)
direction = "r"
interface SnakePart {
    x: number;
    y: number;
}
let foodBrightness = 255
let snakeBrightness = 255 / 4
loops.everyInterval(500, function () {
    if (gameOver) {
        basic.clearScreen()
        basic.showIcon(IconNames.No)
        playGameOverSound()
        basic.showString("" + (snakeLength.toString()))
        resetGame()
    } else {
        moveSnake()
        checkCollision()
        snake.push({ x: headX, y: headY })
        while (snake.length > snakeLength) {
            snake.shift()
        }
        basic.clearScreen()
        led.plotBrightness(headX, headY, snakeBrightness)
        for (let part of snake) {
            led.plotBrightness(part.x, part.y, snakeBrightness)
        }
        led.plotBrightness(foodX, foodY, foodBrightness)
        checkFood()
    }
})
