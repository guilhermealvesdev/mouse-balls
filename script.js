//Importamos a classe Ball de Ball.js, que é uma simples classe que contém os métodos das bolinhas que apresentaremos.
import Ball from "./ball.js"

//Selecionamos o elemento do canvas.
const canvas = document.querySelector("#canvas");

/*
    Usamos a função "getContext" com o valor "2d" pra especificar
    que queremos usar as funções para canvas bidimensionais.
*/
export const ctx = canvas.getContext("2d");

/*
    Criamos três arrays vazias: largura, altura, e a quantidade de bolinhas.
*/
let w, h, balls = [];

//Criamos um objeto representando a posição do mouse e setamos como undefined.
export let mouse = {
    x: undefined,
    y: undefined
}

//Array de cores das bolinhas.
export let rgb = [
    [54, 59, 99],
    [155, 33, 85],
    [200, 185, 202],
    [210, 155, 254],
    [144, 33, 129],
    [15, 85, 129],
    [65, 98, 77],
    [159, 20, 158]
]

//Função de início.
function init() {
    resizeReset(); //Ajusta a tela.
    animationLoop(); //Invocamos a função de animação.
    const ball = new Ball(mouse); //Aqui criamos uma nova bola, e passamos o mouse como parâmetro para a classe.
}

//Função que ajusta a altura e a largura do canvas.
function resizeReset() {
    w = canvas.width = window.innerWidth; // o W é igual ao canvas.width, que é pega o valor do window.innerWidth.
    h = canvas.height = window.innerHeight; // o mesmo aqui, só que com a altura.
}


function animationLoop() {
    console.log(balls.length);
    
    /*
        Limpamos todos os pixels de 
        um retângulo definido. Os parâmetros são posição (x e y)
        e tamanho (largura, altura). No caso, partimos do canto superior esquerdo (0,0)
        e criamos uma limpa do tamanho do canvas (w e h). Assim, limpamos todo o conteúdo
    */
    ctx.clearRect(0, 0, w, h);
    
    if (mouse.x !== undefined && mouse.y !== undefined) {
        balls.push(new Ball(mouse)); // Aqui adicionamos uma bola à array BALLS, se o mouse.x e o mouse.y não forem UNDEFINED.
    }
    
    drawBalls(); //Chamamos a função drawBalls, que vai desenhar as bolinhas no canvas.

    /* 
        O requestAnimationFrame é uma forma de fazer uma função ser chamada
        continuamente. No caso, chamamos a animationLoop.
    */
    requestAnimationFrame(animationLoop);
}

/*
    Função que desenhas as bolinhas.
    Aqui, ela faz um loop na array das bolinhas, e chama as
    funções UPDATE e DRAW da classe.
*/
function drawBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
    }
}

//Atribuímos o "x" do objeto mouse à posição do evento. O mesmo vale pro "y".
function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}

//Zeramos a posição do mouse.
function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

//Função que pega um valor aleatório entre dois determinados números.
export function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

/*
    Aqui adicionamos quatro listeners ao Window:
    1 - assim que carregar tudo disparará a função INIT;
    2 - quando houver algum resize na tela, disparará a função RESIZERESET;
    3 - quando houver movimento do mouse na tela, disparará a função MOUSEMOVE;
    4 - quando o mouse sair da tela, disparará o MOUSEOUT.

*/
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);