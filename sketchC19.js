var Fantasma, espectro;
var torre, edificio;
var janelas, windows;
var sacada, grade;
var End, FantasmaFim;
var SomAssustador;

var EstadoJogo = "INICIO";

var GJanela;
var GSacada;

function preload(){
  espectro = loadAnimation("ghost-1.png", "ghost-2.png");
  FantasmaFim = loadImage("gameOver.png");
  edificio = loadImage("tower.png");
  windows = loadImage("door.png");
  grade = loadImage("climber.png");
  SomAssustador = loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);

  torre = createSprite (width/2, height/2, 50, 50);
  torre.addImage("prédio", edificio);
  torre.scale = 1.5;
  torre.velocityY = 3;

  Fantasma = createSprite (width/2, height-90, 50, 50);
  Fantasma.addAnimation("boo", espectro);
  Fantasma.scale = 0.5;

  End = createSprite (width/2, height/2, 50, 50);
  End.addImage("lose",  FantasmaFim);
  End.scale = 1;
  End.visible = 0;

  GJanela = new Group();
  GSacada = new Group();

  //SomAssustador.loop();
}

function draw(){
   
  background("black");
  
  drawSprites();

  if(EstadoJogo === "INICIO"){
    textSize(20);
    fill("yellow");
    text("Pressione ENTER para começar", 200, 200);
    text("Aperte ESPAÇO para fazer o fantasma flutuar", 200, 240);
    text("SETA PARA ESQUERDA move para a esquerda", 200, 280);
    text("SETA PARA DIREITA move para a direita", 200, 320);

    torre.visible = 0;
    Fantasma.visible = 0;

    if(keyDown("enter")){
      EstadoJogo = "Gameplay";
    }
 }

  if(EstadoJogo === "Gameplay"){
    
    torre.visible = 1;
    Fantasma.visible = 1;
    
    Iniciar();
    CriarObstaculos();

    if(GSacada.isTouching(Fantasma)){
      EstadoJogo = "Fim";
    }

    if(Fantasma.x > 800){
      EstadoJogo = "Fim";
    }
 }


  if(EstadoJogo === "Fim"){
    
    End.visible = 1;
    Fantasma.visible = 0;

    Fantasma.velocityY = 0;
    torre.velocityY = 0;
  
    GSacada.destroyEach();
    GJanela.destroyEach();
  }
}

function Iniciar(){
  
  if(torre.y > height){
    torre.y = torre.height/2;
  }

  if(keyDown("space")){
    Fantasma.velocityY -= 1;
  }

  if(keyDown("LEFT_ARROW")){
    Fantasma.x -= 2.5;
  }

  if(keyDown("RIGHT_ARROW")){
    Fantasma.x += 2.5;
  }

  Fantasma.velocityY += 0.5;
}


function CriarObstaculos(){
  if(frameCount%150 == 0){
    janelas = createSprite(Math.round(random(width/2 - 250, width/2 + 250)), height-600, 50, 50);
    janelas.addImage("vidro", windows);
    janelas.scale = 1;
    janelas.velocityY = 3;
    janelas.lifeTime = 150;
    
    sacada = createSprite(janelas.x, height-540,50,50);
    sacada.addImage("madeira", grade);
    sacada.scale = 1;
    sacada.velocityY = 3;
    sacada.lifeTime = 150;

    GJanela.add(janelas);
    GSacada.add(sacada);

  }
}

