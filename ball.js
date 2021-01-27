//Pegamos a função getRandomInt, o objeto MOUSE e o CTX do arquivo principal.
import {getRandomInt, rgb, mouse, ctx, balls} from "./script.js"

class Ball {
    constructor() {
        this.x = mouse.x + getRandomInt(-30, 20); //Colocamos a bola na posição X que o mouse está, mais um número aleatório entre -30 e 20.
        this.y = mouse.y + getRandomInt(-30, 20); //O mesmo aqui, só que o valor Y.
        this.size = getRandomInt(10, 30); // Definimos um tamanho aleatório pra bola.
        this.rgb = rgb[getRandomInt(0, rgb.length - 1)]; //Pegamos um valor aleatório da array de cores.
        this.style = `rgba(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]},.5)`; //Atribuímos cada valor de uma array da array de cores.
    }

    draw() {
        ctx.fillStyle = this.style; //Atribuímos a cor ao método fillStyle. Seria tipo colocar tinta na pistola de um airbrush.
        ctx.beginPath(); //Inicia um novo caminho (path) no canvas.

        /*
            Criamos um círculo (arc), que recebe quatro parâmetros:
            O X, o Y, o tamanho do raio do círculo, o ângulo inicial em radianos, e o ângulo final.
        */
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.closePath(); //Fechamos o caminho (path).
        ctx.fill(); //Preenchemos a cor com o fillStyle.
    }

    /*
        Função que verifica  o tamanho da bola.
        Se for maior que 0, ele diminui em -0.3.
        Se com isso o size ficar menor ou igual a 0, ele se torna 0.
        Senão, ele continua com o valor atribuído.

    */
    update() {
        if (this.size > 0) {
            let s = this.size - 0.3;
            this.size = (s <= 0) ? 0 : s;
        }

        //Para não sobrecarregar o DOM, limitamos a 1000 bolinhas apresentadas. No caso, removemos o primeiro item da array de bolinhas.
        if (balls.length > 1000) {
            balls.shift();
        }
    }
}

export default Ball;