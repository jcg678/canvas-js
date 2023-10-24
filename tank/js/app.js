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

/**************
CONSTANTES
**************/
const BARRA = 32;
/**************
OBJETOS
**************/
function Bala(x,y,radianes){
	
}
function Tanque(x,y,radio){
	
}
function Enemigo(x,y){
	
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
			caratula();
			game.canvas.addEventListener("click",seleccionar,false);
		} else{
			alert("NO cuentas con CANVAS")
		};
	}
}