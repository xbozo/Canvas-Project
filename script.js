/*
Lógica |
- Quando o click do mouse ABAIXAR, ative o modo desenho.
- Quando o mouse se mover, se o modo desenho estiver ativo, desenhe.
- Quando o click do mouse LEVANTAR, desative o modo desenho.
*/

//* Initial data

let currentColor = "black"
let canDraw = false
let mouseX = 0
let mouseY = 0

let screen = document.querySelector("#tela")
let context = screen.getContext("2d")           // contexto 2d

//* Events

document.querySelectorAll(".colorArea .color").forEach(item => {
    item.addEventListener("click", colorClickEvent)
})
screen.addEventListener("mousedown", mouseDownEvent)
screen.addEventListener("mousemove", mouseMoveEvent)
screen.addEventListener("mouseup", mouseUpEvent)

document.querySelector(".clear").addEventListener("click", clearScreen)

//* Functions

function colorClickEvent(e) {       // e = evento
    let color = e.target.getAttribute("data-color")
    currentColor = color

    document.querySelector(".color.active").classList.remove("active")
    e.target.classList.add("active")
}

function mouseDownEvent(e) {
    canDraw = true
    mouseX = e.pageX - screen.offsetLeft            // qual é a posição do elementoa té o final da página pra esquerda (offset)
    mouseY = e.pageY - screen.offsetTop
}

function mouseMoveEvent(e) {        // e = evento (posiçao do mouse)
    if(canDraw) {
        draw(e.pageX, e.pageY)
    }
}

function mouseUpEvent() {
    canDraw = false
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    // desenho | sequência de funções nativas e suas devidas configurações
    context.beginPath()
    context.lineWidth = 5
    context.lineJoin = "round"
    context.moveTo(mouseX, mouseY)
    context.lineTo(pointX, pointY)
    context.closePath()
    context.strokeStyle = currentColor
    context.stroke()

    mouseX = pointX
    mouseY = pointY
}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0)      // função nativa pra dar um reset no desenho mesmo, incluindo o "back-end"
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}