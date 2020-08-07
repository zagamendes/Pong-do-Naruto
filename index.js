var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");

var rasengan = new Image();
rasengan.src = "assets/img/rasegan 3.gif";

var rasengan2 = new Image();
rasengan2.src = "assets/img/rasegan 3.gif";

var rasengan3 = new Image();
rasengan3.src = "assets/img/rasegan 3.gif";

var naruto = new Image();
naruto.src = "assets/img/naruto.png";

var sasuke = new Image();
sasuke.src = "assets/img/sasuke.png";

var barraesquerda = {

    //POSIÇÃO NO EIXO X
    x: 10,

    //POSIÇÃO NO EIXO Y
    y: canvas.height / 2 - 60,

    altura: 120,

    //FLAG QUE AVISA SE O USUÁRIO ATIVOU PODER OU NÃO
    ativouPoder: 0,
    
    largura: 20,
    pontos: 0,

    //ATRIBUTO QUE AVISA SE O JOGADOR PODE USAR PODER
    qtdGol: 0,

    //ATRIBUTO QUE DESATIVA O PODER DO PLAYER SE JÁ TIVER FEITO TODOS OS GOLS PERMITIDOS
    qtdGol2: 0,

    //VELOCIDADE COM QUE A BARRA SE MOVE PARA CIMA E PARA BAIXO
    velocidade: 15,

    desenha: function () {
        ctx.fillStyle = "#fff";
        ctx.fillRect(barraesquerda.x, barraesquerda.y, barraesquerda.largura, barraesquerda.altura);
    }

};

var barradireita = {

    //POSIÇÃO NO EIXO X
    x: 570,

    //POSIÇÃO NO EIXO Y
    y: canvas.height / 2 - 60,
    altura: 120,

    //FLAG QUE AVISA SE O USUÁRIO ATIVOU PODER OU NÃO
    ativouPoder: 0,
    largura: 20,

    //ATRIBUTO QUE AVISA SE O JOGADOR PODE USAR PODER
    qtdGol: 0,

    //ATRIBUTO QUE DESATIVA O PODER DO PLAYER SE JÁ TIVER FEITO TODOS OS GOLS PERMITIDOS
    qtdGol2: 0,
    pontos: 0,

    //VELOCIDADE COM QUE A BARRA SE MOVE PARA CIMA E PARA BAIXO
    velocidade: 15,
    desenha: function () {
        ctx.fillStyle = "#fff";
        ctx.fillRect(barradireita.x, barradireita.y, barradireita.largura, barradireita.altura);

    }
};

var barraNaruto = document.getElementById("naruto-progress");
barraNaruto.style.height = barraesquerda.qtdGol * 10;
barraNaruto.style.color = 'white';
barraNaruto.innerHTML = `${barraesquerda.qtdGol * 10}%`;

var barraSasuke = document.getElementById("sasuke-progress");
barraSasuke.style.height = barradireita.qtdGol * 10;
barraSasuke.style.color = 'white';
barraSasuke.innerHTML = `${barradireita.qtdGol * 10}%`;


var teclas = {};

var bola = {
    //DEFININDO POSIÇÃO DA BOLA NO EIXO X
    x: canvas.width / 2 - 10,

    //DEFININDO A POSIÇÃO DA BOLA NO EIXO Y
    y: canvas.height / 2 - 10,

    //DEFININDO A POSIÇÃO DA BOLA NO EIXO X QUANDO NARUTO/PLAYER 1 ATIVA PODER
    x2: canvas.width / 2 - 10,

    //POSIÇÃO DA BOLA NO EIXO Y QUANDO NARUTO/PLAYER 1 ATIVA O PODER
    y2: 125,

    //POSIÇÃO DA BOLA NO EIXOO X QUANDO NARUTO/PLAYER 1 ATIVA O PODER
    x3: canvas.width / 2 - 10,

    //POSIÇÃO DA BOLA NO EIXOO X QUANDO NARUTO/PLAYER 1 ATIVA O PODER
    y3: 475,

    //DIREÇÃO QUE A BOLA COMEÇA, DA DIREITA PRA ESQUERDA
    dirx: -1,

    //DIREÇÃO QUE A BOLA COMEÇA, DE CIMA PRA PARA BAIXO
    diry: 1,
    aux: 0,
    auxy: 0,
    aux2: 0,
    auxy2: 0,
    original: 1,

    //ALTURA DA BOLA
    altura: 20,

    //LARGURA DA BOLA
    largura: 20,

    //FLAG QUE DIZ SE A MÚSICA JÁ FOI ATIVADA OU NÃO
    ativouMusica: 0,

    //FLAG QUE DIZ PARA ATIVAR EFEITO SONORO DO RASENGAN
    efetoRasengan: 0,

    //FLAG QUE DIZ A BOLA VIROU RASENGAN
    virourasengan: 0,

    //QUANDO A BOLA FOR REBATIDA X VEZES, A MÚSICA COMEÇA A TOCAR
    qtdPraAtivarAMusica: 0,

    //VELOCIDADE COM QUE A VELOCIDADE DA BOLA AUMENTA
    mod: 0.2,

    //COR DA BOLA
    cor: "#fff",

    //VELOCIDADE DA BOLA
    velocidade: 3.3,

    movimenta: function () {
        //SE A BOLA JÁ TIVER VIRADO RASENGAR,ENTRA NESSE IF COM OUTRAS CONFIGURAÇÕES, SE NÃO, ENTRA NO ELSE COM AS CONFIGURAÇÕES DA BOLA/QUADRADO BRANCO
        if (this.virourasengan == 1) {

            //VERIFICA SE PODE MOSTRAR COMO USAR PODER
            mostraAjuda();

            if (this.y + rasengan.height >= barraesquerda.y && this.y <= barraesquerda.y + barraesquerda.altura && this.x
                <= barraesquerda.x + barraesquerda.largura) {
                this.dirx = 1;
                this.mod += 0.6;
                this.qtdPraAtivarAMusica++;
                kunai();
            }
            if (this.y + rasengan.height >= barradireita.y && this.y <= barradireita.y + barradireita.altura && this.x + rasengan.width >= barradireita.x) {
                this.dirx = -1;
                this.mod += 0.6;
                kunai();
                this.qtdPraAtivarAMusica++;
            }
            if (this.y <= 0) {
                this.diry = 1;
            }
            if (this.y + 20 >= 600) {
                this.diry = -1;
            }

            //CASO OS DOIS PLAYERS TENHAM ATIVADO PODER, REDUZ A VELOCIDADE DA BOLA UM POUCO
            if (barraesquerda.ativouPoder == 1 && barradireita.ativouPoder == 1) {
                if (this.mod >= 2) {
                    this.mod = 2.3;
                }
            }
            if(this.mod>9){
                this.mod =9;
            }

            this.x += (this.velocidade + this.mod) * this.dirx;
            this.y += (this.velocidade + this.mod) * this.diry;


            //SE O PLAYER 2 ATIVOU PODER
            if (barradireita.ativouPoder == 1) {

                //DIMINUI A VELOCIDADE DO PLAYER 1
                barraesquerda.velocidade = 4;

                //TROCA A IMAGEM POR RASENGAN VERMELHO

                //VERIFICA SE É GOL ENQUANTO PODER ESTAR ATIVADO
                if (this.x < barraesquerda.x + barraesquerda.largura - 10) {
                    //FUNÇÃO QUE INCREMENTA OS PONTOS E RESETA PARTIDA
                    newgame("PLAYER 2");

                    //ATRIBUTO QUE CONTA QUANTOS GOLS O PLAYER 2 FEZ ENQUANTO PODER ESTAR ATIVADO
                    barradireita.qtdGol2++;

                    //SE FEZ 10 GOLS OU MAIS COM PODER ATIVADO, DESTATIVA PODER
                    if (barradireita.qtdGol2 >= 10) {

                        //RESETA O PODER DO PLAYER 2
                        barradireita.ativouPoder = 0;

                        //RESETA ATRIBUTO QUE DIZ SE O PLAYER JA PODE ATIVAR PODER
                        barradireita.qtdGol = 0;

                        //RESETA ATRIBUTO QUE DIZ QUANTOS GOLS O PLAYER 2 JÁ FEZ USANDO O PODER
                        barradireita.qtdGol2 = 0;

                        //VOLTA A VELOCIDADE DO PLAYER 1
                        barraesquerda.velocidade = 15;

                        //VOLTA O RASENGAN NORMAL
                        rasengan.src = "assets/img/rasegan 3.gif";
                        barraSasuke.style.height = 0;
                        barraSasuke.innerHTML = "0%";

                        document.getElementById("sasuke-info").style.display = "none";
                    }
                }

            }
            //SE O PLAYER 1 ATIVOU PODER
            if (barraesquerda.ativouPoder == 1) {

                if (this.y2 + rasengan.height >= barraesquerda.y && this.y2 <= barraesquerda.y + barraesquerda.altura && this.x2
                    <= barraesquerda.x + barraesquerda.largura) {
                    this.dirx = 1;
                    this.mod += 0.6;
                    kunai();
                }


                if (this.y3 + rasengan.height >= barraesquerda.y && this.y3 <= barraesquerda.y + barraesquerda.altura && this.x3
                    <= barraesquerda.x + barraesquerda.largura) {
                    this.dirx = 1;
                    this.mod += 0.6;
                    kunai();
                }

                if (this.y2 + 20 >= 600) {
                    this.diry = -1;
                }
                if (this.y2 <= 0) {
                    this.diry = 1;
                }
                if (this.y3 + 20 >= 600) {
                    this.diry = -1;
                }
                if (this.y3 <= 0) {
                    this.diry = 1;
                }


                this.x2 += (this.velocidade + this.mod) * this.dirx;
                this.y2 += (this.velocidade + this.mod) * this.diry;


                this.x3 += (this.velocidade + this.mod) * this.dirx;
                this.y3 += (this.velocidade + this.mod) * this.diry;


                //FUNÇÃO ZERA VERIFICA SE PLAYER JÁ FEZ TODOS OS GOLS QUE PODIA USANDO SEU PODER, SE SIM, RESETA O JOGO E DEFINE AS POSIÇÕES PADRÕES DAS BOLAS, 
                //SE NÃO, RESETA O JOGO E DEFINE A POSIÇÃO DA BOLA ORIGINAL RANDÔMICAMENTE
                if (this.x < barraesquerda.x + barraesquerda.largura - 10) {
                    newgame("PLAYER 2");
                    zera();
                }

                

                //SE FIZER GOL ENQUANTO ESTIVER COM O PODER LIGADO
                if (this.x + 20 > barradireita.x + 10 || this.x2 + 20 > barradireita.x + 10 || this.x3 + 20 > barradireita.x + 10) {
                    barraesquerda.pontos+=3;
                    barraesquerda.qtdGol2++;
                    if (barraesquerda.qtdGol2 >= 3) {
                        barraesquerda.ativouPoder = 0;
                        barraesquerda.qtdGol = 0;
                        this.ativaClone = 0;
                        document.getElementById("naruto-info").style.display = "none"
                        
                    }

                    zera();
                }

            }

            //SE NENHUM DOS DOIS ATIVOU PODER
            if (barraesquerda.ativouPoder == 0 && barradireita.ativouPoder == 0) {

                if (this.x < barraesquerda.x + barraesquerda.largura - 10) {
                    newgame("PLAYER 2");
                }


                if (this.x + 20 > barradireita.x + 10) {
                    newgame("PLAYER 1");

                }
            }
        } else {

            //VERIFICA SE A BOLA FOI REBATIDA
            if (this.y + this.altura >= barraesquerda.y && this.y <= barraesquerda.y + barraesquerda.altura && this.x
                <= barraesquerda.x + barraesquerda.largura) {
                this.dirx = 1;
                this.mod += 0.6;
                this.qtdPraAtivarAMusica++;
                kunai();
            }

            //VERIFICA SE A BOLA FOI REBATIDA
            if (this.y + this.altura >= barradireita.y && this.y <= barradireita.y + barradireita.altura && this.x + 20 >= barradireita.x) {
                this.dirx = -1;
                this.mod += 0.6;
                this.qtdPraAtivarAMusica++;
                kunai();
            }

            //SE A BOLA BATER NO TETO, PÕEM A TRAJETÓRIA PARA DIREITA
            if (this.y <= 0) {
                this.diry = 1;

            }

            //SE A BOLA BATER NO CHÃO, POÊM A TRAJÉTORIA PARA ESQUERDA
            if (this.y + 20 >= 600) {
                this.diry = -1;

            }

            this.x += (this.velocidade + this.mod) * this.dirx;
            this.y += (this.velocidade + this.mod) * this.diry;

            //GOL
            if (this.x < barraesquerda.x + barraesquerda.largura - 10) {
                //FUNÇÃO QUE INCREMENTA OS PONTOS E RESETA A PARTIDA
                newgame("PLAYER 2");


            }

            //GOL
            if (this.x + 20 > barradireita.x + 10) {
                //FUNÇÃO QUE INCREMENTA OS PONTOS E RESETA A PARTIDA
                newgame("PLAYER 1");

            }


        }

    },

    desenha: function () {

        
        
        if (this.ativouMusica == 0 && this.qtdPraAtivarAMusica >= 10) {

            //COMEÇA TOCAR A MÚSICA
            som();
            this.ativouMusica = 1;
        }

        if (this.qtdPraAtivarAMusica >= 8) {
            this.virourasengan = 1;

            if (this.efetoRasengan == 0) {
                this.efetoRasengan = 1;

                //EFEITO SONORO DO RASENGAR ATIVADO
                rasegan();

            }

            //ADICIONA A IMAGEM DO RASENGAN NO LUGAR DA BOLA
            ctx.drawImage(rasengan, this.x, this.y, rasengan.width, rasengan.height);


            //VERIFICA SE PLAYER 1 JÁ FEZ 10 GOLS E SE APERTOU Q PARA ATIVAR O PODER
            if (barraesquerda.qtdGol >= 10 && 81 in teclas) {

                //MUDA A POSIÇÃO DA BOLA ORIGINAL
                this.original = Math.floor(3 * Math.random());

                //SE NÃO TIVER ATIVADO PODER AINDA, ATIVA
                if (barraesquerda.ativouPoder == 0) {

                    barraesquerda.ativouPoder = 1;

                    //EFEITO SONORO KAGEBUSHIN
                    kagebushin();

                    troca();

                }
                this.ativaClone =1;

            }

            if(this.ativaClone==1){
                ctx.drawImage(rasengan2, this.x2, this.y2, rasengan.width, rasengan.height);
                ctx.drawImage(rasengan3, this.x3, this.y3, rasengan.width, rasengan.height);
            }
            

            if (barradireita.qtdGol >= 10 && 37 in teclas) {
                if (barradireita.ativouPoder == 0) {
                    sharingan();
                    
                    rasengan.src = "assets/img/rasegan vermelho.gif";
                    barradireita.ativouPoder = 1;

                    barraesquerda.velocidade = 4;
                }
            }


        } else {
            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y, 20, 20);
        }


    }
};




function zera() {


    //SE AINDA ESTIVER COM PODER ATIVO, CHAMA TROCA 2, SE NÃO RESETA O JOGO E AS BOLAS VOLTAM PARA SUAS POSIÇÕES PADRÕES
    if (barraesquerda.ativouPoder == 1) {
        bola.original = Math.floor(3 * Math.random());

        //TROCA 2 REINICIA O JOGO COM A BOLA ORIGINAL EM UMA POSIÇÃO RANDOMIZADA
        troca2();
    } else {

        barraesquerda.y = canvas.height / 2 - 60;
        barradireita.y = barraesquerda.y;

        bola.x = canvas.width / 2 - 10;
        bola.y = canvas.height / 2 - 10;

        
        barraesquerda.qtdGol2 = 0;
    }


    bola.mod -= 0.1;
    if (bola.mod < 0) {
        bola.mod = 0;



    }
}
function troca2() {
    
    bola.original = Math.floor(3 * Math.random());
    

    bola.x2 = canvas.width / 2 - 10;
    bola.y2 = 125;

    bola.x3 = canvas.width / 2 - 10;
    bola.y3 = 475;
    //SE BOLA.ORIGINAL FOR IGUAL 0, SAI DO MEIO E VAI PRA CIMA
    if (bola.original == 0) {
        //PEGO A POSIÇÃO ATUAL DA BOLA ORIGINAL
        //AUX2 & AUXY2 TEM A POSIÇÃO ATUAL DA BOLA ORIGINAL
        bola.aux2 = bola.x;
        bola.auxy2 = bola.y;

        //PEGO A POSIÇÃO DA BOLA N2
        //AUX & AUXY TEM A POSIÇÃO DA BOLA N2 
        bola.aux = bola.x2;
        bola.auxy = bola.y2;

        //BOLA ORIGINAL VAO PARA POSIÇÃO DA BOLA N2
        bola.x = bola.aux;
        bola.y = bola.auxy;

        //BOLA N2 VAI PARA ONDE BOLA ORIGINAL ESTAVA
        bola.x2 = bola.aux2;
        bola.y2 = bola.auxy2;

        //DESENHA BOLA ORIGINAL NAS NOVAS POSIÇÕES
        ctx.drawImage(rasengan, bola.x, bola.y, rasengan.width, rasengan.height);
    }

    //SE BOLA.ORIGINAL FOR IGUAL 1, CONTINUA NO MEIO
    if (bola.original == 1) {
        ctx.drawImage(rasengan, bola.x, bola.y, rasengan.width, rasengan.height);
    }

    //SE BOLA.ORIGINAL FOR IGUAL 2, SAI DO MEIO E VAI PRA BAIXO
    if (bola.original == 2) {

        //AUX2 & AUXY2 PEGA A POSIÇÃO ATAUL DA BOLA ORIGINAL
        bola.aux2 = bola.x;
        bola.auxy2 = bola.y;

        //AUX & AUXY TEM A POSIÇÃO DA BOLA N3
        bola.aux = bola.x3;
        bola.auxy = bola.y3;

        //BOLA ORIGINAL VAI PARA POSIÇÃO DA BOLA N3
        bola.x = bola.aux;
        bola.y = bola.auxy;

        //BOLA N3 VAI PARA POSIÇÃO DA BOLA ORIGINAL
        bola.x3 = bola.aux2;
        bola.y3 = bola.auxy2;

        //DESENHA BOLA ORIGINAL NA NOVA POSIÇÃO 
        ctx.drawImage(rasengan, bola.x, bola.y, rasengan.width, rasengan.height);
    }
}
function troca() {

    //SE BOLA.ORIGINAL FOR IGUAL 0, SAI DO MEIO E VAI PRA CIMA
    if (bola.original == 0) {
        //PEGO A POSIÇÃO ATUAL DA BOLA ORIGINAL
        //AUX2 & AUXY2 TEM A POSIÇÃO ATUAL DA BOLA ORIGINAL
        bola.aux2 = bola.x;
        bola.auxy2 = bola.y;

        //PEGO A POSIÇÃO DA BOLA N2
        //AUX & AUXY TEM A POSIÇÃO DA BOLA N2 
        bola.aux = bola.x2;
        bola.auxy = bola.y2;

        //BOLA ORIGINAL VAO PARA POSIÇÃO DA BOLA N2
        bola.x = bola.aux;
        bola.y = bola.auxy;

        //BOLA N2 VAI PARA ONDE BOLA ORIGINAL ESTAVA
        bola.x2 = bola.aux2;
        bola.y2 = bola.auxy2;

        //DESENHA BOLA ORIGINAL NAS NOVAS POSIÇÕES
        ctx.drawImage(rasengan, bola.x, bola.y, rasengan.width, rasengan.height);
    }

    //SE BOLA.ORIGINAL FOR IGUAL 1, CONTINUA NO MEIO
    if (bola.original == 1) {
        ctx.drawImage(rasengan, bola.x, bola.y, rasengan.width, rasengan.height);
    }

    //SE BOLA.ORIGINAL FOR IGUAL 2, SAI DO MEIO E VAI PRA BAIXO
    if (bola.original == 2) {

        //AUX2 & AUXY2 PEGA A POSIÇÃO ATAUL DA BOLA ORIGINAL
        bola.aux2 = bola.x;
        bola.auxy2 = bola.y;

        //AUX & AUXY TEM A POSIÇÃO DA BOLA N3
        bola.aux = bola.x3;
        bola.auxy = bola.y3;

        //BOLA ORIGINAL VAI PARA POSIÇÃO DA BOLA N3
        bola.x = bola.aux;
        bola.y = bola.auxy;

        //BOLA N3 VAI PARA POSIÇÃO DA BOLA ORIGINAL
        bola.x3 = bola.aux2;
        bola.y3 = bola.auxy2;

        //DESENHA BOLA ORIGINAL NA NOVA POSIÇÃO 
        ctx.drawImage(rasengan, bola.x, bola.y, rasengan.width, rasengan.height);
    }

}
function newgame(vencedor) {
    if (vencedor == "PLAYER 1") {
        barraesquerda.pontos++;
        barraesquerda.qtdGol++;
        if (barraesquerda.qtdGol * 10 <= 100) {
            barraNaruto.style.height = barraesquerda.qtdGol * 10;
            barraNaruto.innerHTML = `${barraesquerda.qtdGol * 10}%`;

        }

    }
    if (vencedor == "PLAYER 2") {
        barradireita.pontos++;
        barradireita.qtdGol++;
        if (barradireita.qtdGol * 10 <= 100) {
            barraSasuke.style.height = barradireita.qtdGol * 10;
            barraSasuke.innerHTML = `${barradireita.qtdGol * 10}%`;

        }
    }
    barraesquerda.y = canvas.height / 2 - 60;
    barradireita.y = barraesquerda.y;
    bola.y = canvas.height / 2 - 10;
    bola.x = canvas.width / 2 - 10;

    bola.mod -= 0.5;
    if (bola.mod < 0) {
        bola.mod = 0;

    }


}


function main() {

    document.addEventListener("keydown", function (e) {
        teclas[e.keyCode] = true;
        //alert(e.keyCode);
    }, false);

    document.addEventListener("keyup", function (e) {
        delete teclas[e.keyCode];
    }, false);

    roda();

}


function sharingan() {
    var som = document.createElement("audio");

    som.src = "assets/sons/sharingan.wav";
    som.addEventListener("canplaythrough", function () {
        som.play();
    }, false)
}

function rasegan() {
    var som = document.createElement("audio");

    som.src = "assets/sons/efeitorasengan.wav";
    som.addEventListener("canplaythrough", function () {
        som.play();
    }, false)
}


function kagebushin() {
    var som = document.createElement("audio");

    som.src = "assets/sons/kagebushin.wav";
    som.addEventListener("canplaythrough", function () {
        som.play();
    }, false)
}




function som() {

    var som = document.createElement("audio");

    som.src = "assets/sons/raikiri.mp3";
    //som.src="so.mp3";



    som.addEventListener("canplaythrough", function () {

        som.play();
    }, false)

}
function kunai() {
    var som = document.createElement("audio");
    som.src = "assets/sons/kunai.wav";
    som.addEventListener("canplaythrough", function () {
        som.play();
    }, false)
}

function movebloco() {
    if (87 in teclas && barraesquerda.y > 0)
        barraesquerda.y -= barraesquerda.velocidade;

    else if (83 in teclas && barraesquerda.y + barraesquerda.altura < 600)
        barraesquerda.y += barraesquerda.velocidade;

    if (38 in teclas && barradireita.y > 0)
        barradireita.y -= barradireita.velocidade;

    else if (40 in teclas && barradireita.y + barradireita.altura < 600)
        barradireita.y += barradireita.velocidade;
};


function roda() {
    atualiza();
    desenha();

    window.requestAnimationFrame(roda);

}
function atualiza() {
    movebloco();
    bola.movimenta();
}
function desenha() {

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 600, 600);
    bola.desenha();
    barraesquerda.desenha();
    barradireita.desenha();
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.drawImage(naruto, 40, 0, 70, 50);
    ctx.drawImage(sasuke, 490, 0, 70, 50);
    ctx.fillText("" + barraesquerda.pontos, 112, 20);
    ctx.fillText("" + barradireita.pontos, 600 - 133, 20);
}
function mostraAjuda(){
    if(barraesquerda.qtdGol>=10){
        document.getElementById("naruto-info").style.display="inline-block"
    }
    if(barradireita.qtdGol>=10){
        document.getElementById("sasuke-info").style.display="inline-block"
    }
}