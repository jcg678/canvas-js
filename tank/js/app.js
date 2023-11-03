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
		game.ctx.save();
		game.ctx.fillStyle = game.colorBala;
		this.x += Math.cos(this.radianes)*this.velocidad;
		this.y += Math.sin(this.radianes)*this.velocidad;
		game.ctx.fillRect(this.x, this.y, this.w, this.w);
		game.ctx.restore();
	}
	
}

function Tanque(x, y, radio) {
	this.x = x;
	this.y = y;
	this.radio = radio;
	this.escala = 1;
	this.rotacion = 0;
	this.w = 0;
	this.h = 0;
	this.dibujar = function () {

		game.imagen.src = "imagenes/tanque.png";
		game.imagen.onload = function () {

			this.w = game.imagen.width;
			this.h = game.imagen.height;
			let ww = this.w / 2;
			let hh = this.h / 2;
			game.ctx.drawImage(game.imagen, game.centroX - ww, game.centroY - hh);

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
	document.addEventListener("mousemove", function(e){
		let {x,y} = ajustar(e.clientX, e.clientY);
		let dx = x -game.centroX;
		let dy = y - game.centroY;
		game.radianes = Math.atan2(dy,dx);
	});
	game.tanque.dibujar();

	animar();
}
const animar = () =>{
	requestAnimationFrame(animar);
	verificar();
	pintar();
}
const verificar = () =>{
	if(game.tecla_array[BARRA]){
		game.balas_array.push(
			new Bala(game.centroX+Math.cos(game.radianes)*35, game.centroY+Math.sin(game.radianes)*35,game.radianes)
		);
		game.tecla_array[BARRA]=false;
		sonidos.disparo.play();
	}

} 
const pintar = () => {

	//game.tanque.dibujar();
	//mensaje(String(game.radianes),0,450);
	game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	game.ctx.save();
	game.ctx.translate(game.centroX, game.centroY);
	game.ctx.scale(game.tanque.escala, game.tanque.escala);
	game.ctx.rotate(game.radianes);
	game.ctx.drawImage(game.imagen, -game.imagen.width / 2, -game.imagen.height / 2);
	game.ctx.restore();
	
	for(let i = 0; i<game.balas_array.length; i++){
		if(game.balas_array[i] != null){
			game.balas_array[i].dibujar();
			if(game.balas_array[i].x < 0 
			|| game.balas_array[i].x > game.w
		    || game.balas_array[i].y < 0
			|| game.balas_array[i].y > game.h)
			{
				game.balas_array[i] = null;	
			}
		}
	}

}


const ajustar = (xx, yy) => {

	const pos = game.canvas.getBoundingClientRect();
	const x = xx - pos.left;
	const y = yy - pos.top;
	return {x, y}	

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
	game.ctx.restore();
}

/***
 * Listeners
 */



/***********
INICIO
************/
window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback){window.setTimeout(callback,17);}
})();

document.addEventListener("keydown",function(e){
	game.teclaPulsada = e.keyCode;
	game.tecla_array[game.teclaPulsada] = true;

});


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