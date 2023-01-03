const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};
const gravedad = 0.7;

const fondo = new Sprite({
  posicion: {
    x: 0,
    y: 0,
  },
  imagenSrc: "./img/fondo.png",
});
const tienda = new Sprite({
  posicion: {
    x: 620,
    y: 160,
  },
  imagenSrc: "./img/tienda.png",
  escala: 2.5,
  framesMaximosImagen: 6,
});
const player = new Luchador({
  posicion: {
    x: 250,
    y: 0,
  },
  velocidad: {
    x: 0,
    y: 0,
  },
  direccionAtaque: {
    x: 50,
    y: 50,
    anchoHitbox: 180,
    altoHitbox: 50,
  },
  imagenSrc: "./img/player/Idle.png",
  framesMaximosImagen: 8,
  escala: 2.3,
  offset: {
    x: 215,
    y: 135,
  },
  posturas: {
    quieto: {
      imagen: new Image(),
      imagenSrc: "./img/player/Idle.png",
      framesMaximosImagen: 8,
    },
    corriendo: {
      imagen: new Image(),
      imagenSrc: "./img/player/Run.png",
      framesMaximosImagen: 8,
    },
    saltando: {
      imagen: new Image(),
      imagenSrc: "./img/player/Jump.png",
      framesMaximosImagen: 2,
    },
    cayendo: {
      imagen: new Image(),
      imagenSrc: "./img/player/Fall.png",
      framesMaximosImagen: 2,
    },
    atacando1: {
      imagen: new Image(),
      imagenSrc: "./img/player/Attack1.png",
      framesMaximosImagen: 6,
    },
    recibiendo: {
      imagen: new Image(),
      imagenSrc: "./img/player/Take Hit.png",
      framesMaximosImagen: 4,
    },
    muerto: {
      imagen: new Image(),
      imagenSrc: "./img/player/Death.png",
      framesMaximosImagen: 6,
    },
  },
});

player.dibujar();
tienda.dibujar();
const enemy = new Luchador({
  posicion: {
    x: 600,
    y: 100,
  },
  velocidad: {
    x: 0,
    y: 0,
  },
  direccionAtaque: {
    x: -200,
    y: 50,
    anchoHitbox: 180,
    altoHitbox: 50,
  },

  imagenSrc: "./img/player2/Idle.png",
  framesMaximosImagen: 4,
  escala: 2.3,
  offset: {
    x: 215,
    y: 148,
  },
  posturas: {
    quieto: {
      imagen: new Image(),
      imagenSrc: "./img/player2/Idle.png",
      framesMaximosImagen: 4,
    },
    corriendo: {
      imagen: new Image(),
      imagenSrc: "./img/player2/Run.png",
      framesMaximosImagen: 8,
    },
    saltando: {
      imagen: new Image(),
      imagenSrc: "./img/player2/Jump.png",
      framesMaximosImagen: 2,
    },
    cayendo: {
      imagen: new Image(),
      imagenSrc: "./img/player2/Fall.png",
      framesMaximosImagen: 2,
    },
    atacando1: {
      imagen: new Image(),
      imagenSrc: "./img/player2/Attack1.png",
      framesMaximosImagen: 4,
    },
    recibiendo: {
      imagen: new Image(),
      imagenSrc: "./img/player2/Take hit.png",
      framesMaximosImagen: 3,
    },
    muerto: {
      imagen: new Image(),
      imagenSrc: "./img/player2/Death.png",
      framesMaximosImagen: 7,
    },
  },
});

enemy.dibujar();

function animar() {
  window.requestAnimationFrame(animar);
  c.fillStyle = "rgb(255,255,255,0.15)";
  
  fondo.actualizar();
  tienda.actualizar();
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.actualizar();
  enemy.actualizar();
console.log(enemy.posicion.y + enemy.height)
  enemy.velocidad.x = 0;
  // Movimiento del jugador
  player.velocidad.x = 0;
  if (keys.a.pressed && player.lastKey == "a") {
    if (player.posicion.x >= 0) {
      player.velocidad.x = -5;
      player.cambiarFrames("corriendo");
    } else {
      player.velocidad.x = 0;
    }
    
  } else if (keys.d.pressed && player.lastKey == "d") {
    if ((player.posicion.x + player.width) < canvas.width) {
      player.velocidad.x = 5;
      player.cambiarFrames("corriendo");
    } else {
      enemy.velocidad.x = 0;
    }
   
  } else if (keys.w.pressed && player.lastKey == "w") {
    
    player.velocidad.y = -10;
    player.cambiarFrames("saltando");
  } else {
    player.cambiarFrames("quieto");
  }

  if (player.velocidad.y < 0) {
    player.cambiarFrames("saltando");
  } else if (player.velocidad.y > 0) {
    player.cambiarFrames("cayendo");
  }
  // Movimiento del enemigo

  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft") {
    if (enemy.posicion.x >= 0) {
      enemy.velocidad.x = -5;
      enemy.cambiarFrames("corriendo");
    } else {
      enemy.velocidad.x = 0;
    }
    
  } else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight") {
    if ((enemy.posicion.x + enemy.width) < canvas.width) {
      enemy.velocidad.x = 5;
      enemy.cambiarFrames("corriendo");
    } else {
      enemy.velocidad.x = 0;
    }
   
  } else if (keys.ArrowUp.pressed && enemy.lastKey == "ArrowUp") {
    enemy.velocidad.y = -10;
    enemy.cambiarFrames("saltando");
  } else {
    enemy.cambiarFrames("quieto");
  }

  if (enemy.velocidad.y < 0) {
    enemy.cambiarFrames("saltando");
  } else if (enemy.velocidad.y > 0) {
    enemy.cambiarFrames("cayendo");
  }

  // Detectando colisiones de los ataques
  if (
    player.hitBoxAtaque.posicion.x + player.hitBoxAtaque.width >=
      enemy.posicion.x &&
    player.hitBoxAtaque.posicion.x <= enemy.posicion.x + enemy.width &&
    player.hitBoxAtaque.posicion.y + player.hitBoxAtaque.height >=
      enemy.posicion.y &&
    player.hitBoxAtaque.posicion.y <= enemy.posicion.y + enemy.height &&
    player.estaAtacando &&
    player.frameActualImagen === 4
  ) {
    player.estaAtacando = false;
    enemy.vida -= 20;
    if (enemy.vida <= 0) {
      enemy.cambiarFrames("muerto");
    } else {
      enemy.cambiarFrames("recibiendo");
    }
    document.querySelector("#vidaEnemigo").style.width = enemy.vida + "%";
    finalizarJuego({ player, enemy, tiempoID });
  }

  if (player.frameActualImagen === 4 && player.estaAtacando) {
    player.estaAtacando = false;
  }
  if (
    enemy.hitBoxAtaque.posicion.x + enemy.hitBoxAtaque.width >=
      player.posicion.x &&
    enemy.hitBoxAtaque.posicion.x <= player.posicion.x + player.width &&
    enemy.hitBoxAtaque.posicion.y + enemy.hitBoxAtaque.height >=
      player.posicion.y &&
    enemy.hitBoxAtaque.posicion.y <= player.posicion.y + player.height &&
    enemy.estaAtacando &&
    enemy.frameActualImagen === 2
  ) {
    enemy.estaAtacando = false;
    player.vida -= 20;

    if (player.vida <= 0) {
      player.cambiarFrames("muerto");
    } else {
      player.cambiarFrames("recibiendo");
    }

    document.querySelector("#vidaJugador").style.width = player.vida + "%";
    finalizarJuego({ player, enemy, tiempoID });
  }
  if (player.frameActualImagen === 4 && player.estaAtacando) {
    player.estaAtacando = false;
  }
}

finalizarJuego = ({ player, enemy, tiempoID }) => {
  if (tiempo == 0) {
    document.querySelector("#mensajeFinJuego").style.display = "flex";

    if (player.vida < enemy.vida) {
      document.querySelector("#mensajeFinJuego").textContent = "Jugador 2 Gana";
    } else if (player.vida > enemy.vida) {

      document.querySelector("#mensajeFinJuego").textContent = "Jugador 1 Gana";
    } else if (player.vida === enemy.vida) {

      document.querySelector("#mensajeFinJuego").textContent =
        "La pelea, acaba en empate";
    }
  }

  if (player.vida <= 0 || enemy.vida <= 0) {
    pararContadorTiempo(tiempoID);
    document.querySelector("#mensajeFinJuego").style.display = "flex";
    if (player.vida == 0) {
      document.querySelector("#mensajeFinJuego").textContent = "Jugador 2 Gana";
    } else if (enemy.vida == 0) {
      document.querySelector("#mensajeFinJuego").textContent = "Jugador 1 Gana";
    }
  }
};

var tiempo = 60;
var tiempoID;
reducirContadorTiempo = () => {
  if (tiempo > 0) {
    tiempo--;
    tiempoID = setTimeout(reducirContadorTiempo, 1000);
  }
  document.querySelector("#contador").textContent = tiempo;

  if (tiempo == 0) {
    finalizarJuego({ player, enemy, tiempoID });
  }
};

pararContadorTiempo = (tiempoID) => {
  clearTimeout(tiempoID);
};
reducirContadorTiempo();
animar();

window.addEventListener("keydown", (e) => {
  // Listeners del enemigo
  if (!enemy.estaMuerto) {
    switch (e.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = true;
        enemy.lastKey = "ArrowUp";
        break;
      case "ArrowDown":
        enemy.atacar();
        break;
    }
  
  }
  
  // Listeners del Jugador
  if (!player.estaMuerto){
    switch (e.key) {
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "w":
        keys.w.pressed = true;
        player.lastKey = "w";
        break;
      case " ":
        player.atacar();
        break;
    }
  }

});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
  switch (e.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
});
