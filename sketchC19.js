var Fantasma, FantasmaFim, espectro;
var torre, edificio;
var janelas, windows;
var sacada, grade;
var SomAssustador;

var EstadoJogo = "INICIO";

var GJanela;
var GSacada;

function preload(){
  espectro.loadAnimation("ghost-1.png", "ghost-2.png");
  FantasmaFim.loadImage("gameOver.png");
  edificio.loadImage("tower.png");
  windows.loadImage("door.png");
  grade.loadImage("climber.png");
  SomAssustador.loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
  Fantasma = createSprite (Width-200, Height-50, 50, 50);
  Fantasma.addAnimation("boo", espectro);
  Fantasma.scale = 0.5;

  torre = createSprite (Width-50, Height, 50, 50);
  torre.addImage("prédio", edificio);
  torre.scale = 1.5;
  torre.velocityY = 3;

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
    text("Aperte ESPAÇO para fazer o fantasma flutuar", 200, 235);
    text("SETA PARA ESQUERDA move para a esquerda", 200, 250);
    text("SETA PARA DIREITA move para a direita", 200, 275);
    
    if(keyDown("enter")){
      EstadoJogo = "Gameplay";
    }
 }

  if(EstadoJogo === "Gameplay"){
     Iniciar();
     CriarObstaculos();

    if(GSacada.isTouching(Fantasma)){
      EstadoJogo = "Fim";
    }
 }


  if(EstadoJogo === "Fim"){
    Fantasma.addImage("perdeu", FantasmaFim);
    torre.velocityY = 0;
    GSacada.destroyEach();
    GJanela.destroyEach();
  }
} 

function Iniciar(){
  
  if(torre.y > Height){
    torre.y = torre.Height/2;
  }

  if(keyDown("space")){
    Fantasma.y -= 1;
  }

  if(keyDown("LEFT_ARROW")){
    Fantasma.velocityX -= 1.5;
  }

  if(keyDown("RIGHT_ARROW")){
    Fantasma.velocityX += 1.5;
  }
}

function CriarObstaculos(){
  if(frameCount%150 == 0){
    janelas = createSprite(Math.round(random(50,500)), Height-500, 50, 50);
    janelas.addImage("vidro", windows);
    janelas.velocityY = 3;
    janelas.LifeTime = 150;
    
    sacada = createSprite(janela.x, Height-470,50,50);
    sacada.addImage("madeira", grade);
    sacada.velocityY = 3;
    sacada.LifeTime = 150;

    GJanela.add(janelas);
    GSacada.add(sacada);

  }
}

