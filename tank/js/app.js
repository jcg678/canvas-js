game = {
	canvas: null,
	ctx: null,
	caratula: true,
	x:0, 
	y:0,
	imagen: null,
	radianes: null,
	teclaPulsada: null,
	tecla_array: new Array(),
	balas_array: new Array(),
	enemigos_array: new Array(),
	colorEnemigo: ["red", "blue", "black","white", "yellow", "pink", "purple"],
	colorBala: "red",
	centroX: 0, 
	centroY: 0,
	w:0,
	h:0,
	puntos: 0,
	vidas: 3,
	finJuego: false,
}

sonidos = {
	boing: null,
	disparo: null,
	intro: null,
	fin: null,
	boom: null,
}

/**************
CONSTANTES
**************/
const BARRA = 32;
/**************
OBJETOS
**************/
function Bala(x,y,radianes){
	this.x = x;
	this.y = y;
	this.w = 5;
	this.velocidad = 8;
	this.radianes = radianes;
	this.dibujar = function(){

	}
	
}

function Tanque(x,y,radio){
	this.x=x;
	this.y=y;
	this.radio = radio;
	this.escala = 1;
	this.rotacion = 0;
	this.w = 0;
	this.h;
	this.dibujar = function(){

	}
	
}
function Enemigo(x,y){
	this.n = 0;
	this.x = x;
	this.y = y;
	this.inicioX= x;
	this.inicioY = y;
	this.estado =1;
	this.r = 10;
	this.vive = true;
	this.velocidad = .3+Math.random();
	this.color = game.colorEnemigo[Math.floor(Math.random()*game.colorEnemigo.length)];
	
	this.dibujar = function(){

	}
}
/***********
FUNCIONES
************/
const caratula=()=>{
	let imagen = new Image();
	imagen.src = "imagenes/fondo.jpg";

	imagen.onload =()=>{
		game.ctx.drawImage(imagen,0,0,700,500);
	}
}
const seleccionar=(e)=>{
	if(game.caratula){
		inicio();
	}
}
const inicio=()=>{
	game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
	game.caratula = false;
	sonidos.boom.play();
	animar();
}
const animar = () =>{
	requestAnimationFrame(animar);
	verificar();
	pintar();
}
const verificar = () =>{

} 
const pintar=()=>{

}
/***********
INICIO
************/
window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback){window.setTimeout(callback,17);}
})();
window.onload=function(){
	game.canvas = document.getElementById("canvas");
	if(game.canvas && game.canvas.getContext){
		game.ctx = canvas.getContext("2d");
		if (game.ctx) {
			sonidos.boing = document.getElementById("boing");
			sonidos.disparo = document.getElementById("disparo");
			sonidos.intro = document.getElementById("intro");
			sonidos.fin = document.getElementById("fin");
			sonidos.boom = document.getElementById("boom");
			caratula();
			game.canvas.addEventListener("click",seleccionar,false);
		} else{
			alert("NO cuentas con CANVAS")
		};
	}
}