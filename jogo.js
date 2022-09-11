console.log('[DevLira] Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/efeitos_hit.wav' ///efeito de som 

const sprites = new Image();
sprites.src='./sprites.png';

const canvas = document.querySelector('canvas'); 
const contexto = canvas.getContext('2d');

//plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce'; // pintar fundo
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,  planoDeFundo.spriteY,
            planoDeFundo.largura,  planoDeFundo.altura,
            planoDeFundo.x,  planoDeFundo.y,
            planoDeFundo.largura,  planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,  planoDeFundo.spriteY,
            planoDeFundo.largura,  planoDeFundo.altura,
           (planoDeFundo.x + planoDeFundo.largura),  planoDeFundo.y,
            planoDeFundo.largura,  planoDeFundo.altura,
        );
    }
    
}
//[chão]
 function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1; // movimento do chao

            chao.x = chao.x - movimentoDoChao;

        },
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y, /// empurrar o item para o outro lado, para preencher o chão.
                chao.largura, chao.altura,
            );
        },
    };
 }

function fazColisao(flappyBird, chao) { // colisão no chão
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {
        return true;
    }

    return false;

}
function criaflappyBird() {
    //Comando do passarinho 
    const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        console.log('devo pular');
        console.log('[antes]', flappyBird.velocidade);
        flappyBird.velocidade = - flappyBird.pulo;
        console.log(['depois'], flappyBird.velocidade);
    },
    gravidade: 4,
    velocidade: 0,
    atualiza() {

        if(fazColisao(flappyBird, chao)) {
            console.log('fez colisao');
            som_HIT.play();

            setTimeout (() => {
            mudarParaTela(telas.inicio); /// Quando o flappybird atinge o chão ele volta para o inicio.

            }, 500);
            
            return;
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.gravidade; // fazer o flappybird cair.
    },
    desenha() { //Desenhar o passarinho 
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // sprit x, Sprite Y
            flappyBird.largura, flappyBird.altura, // tamanho do recorte da sprit
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura, // Tamanho do canvas na tela
        )
        
        
    } 
}
return flappyBird;

}

///{mensagemGetReady} // comando de tela de inicio.
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width/2) - 174/2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y, 
            mensagemGetReady.w, mensagemGetReady.h,
        );
    }
}

/// função de mudar para tela ativa
//telas

const globais = {};
let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
    
}

const telas = {
    inicio: {
        inicializa() {
            globais.flappyBird = criaflappyBird();
            globais.chao = criaChao();
        },
        desenha() {
            planoDeFundo . desenha ( ) ;
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
         },
         click () {
            mudarParaTela(telas.Jogo);
        },
         atualiza(){
            globais.chao.atualiza();

         }
    }
};

telas.Jogo = {
    desenha() {
        planoDeFundo . desenha ( ) ;
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();

    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop); // Desenhar o quadro na tela, de forma infinita 

}

 /// função de click na tela

window.addEventListener('click', function(){
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudarParaTela(telas.inicio); 

loop();