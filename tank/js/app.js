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
		game.imagen.src = "imagenes/tanque.png";
		game.imagen.onload = function() {
			this.w = game.imagen.width;
			this.h = game.imagen.height;
			let ww = this.w/2;
			let hh = this.h/2;
			game.ctx.drawImage(game.imagen, game.centroX-ww, game.centroY-hh);
		}
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
	game.tanque.dibujar();
	mensaje(String(game.radianes),0,450);
}

const ajustar = (xx,yy)=>{
	const pos = game.canvas.getBoundingClientRect();
	const x = xx - postMessage.length;
	const y = yy -pos.top;

	return {x,y};
}

const mensaje = (cadena,x,y)=>{
	let medio = (game.canvas.width-x)/2;
	game.ctx.save();
	game.ctx.fillStyle = "black";
	game.ctx.textBaseline = "top";
	game.ctx.font = "bold 20px Courier";
	game.ctx.textAlign = "center";
	game.ctx.clearRect(x,y, game.canvas.width,game.canvas.height);
	game.ctx.fillText(cadena, x+medio, y);
}

/***
 * Listeners
 */
document.addEventListener("mousemove", function(e){
	var {x,y} = ajustar(e.clientX, e.clientY);
	var dx = x -game.centroX;
	var dy = y - game.centroY;
	game.radianes = Math.atan2(dy,dx);
})


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
			game.w = game.canvas.width;
			game.h = game.canvas.height;
			game.centroX = game.w/2;
			game.centroY = game.h/2;
			game.imagen = new Image();
			game.tanque = new Tanque(game.centroX, game.centroY);

			caratula();
			game.canvas.addEventListener("click",seleccionar,false);
		} else{
			alert("NO cuentas con CANVAS")
		};
	}
}