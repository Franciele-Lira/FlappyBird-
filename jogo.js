console.log('[DevLira] Flappy Bird');

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
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
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

//Comando do passarinho 
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 4,
    velocidade: 0,
    atualiza () {
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


function loop() {
    flappyBird.atualiza();
    planoDeFundo . desenha ( ) ;
   chao.desenha();
   flappyBird.desenha();

   

    requestAnimationFrame(loop); // Desenhar o quadro na tela, de forma infinita 

}

loop();