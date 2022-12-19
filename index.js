const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

class Sprite {
  constructor({posicion , velocidad}) {
    this.posicion = posicion;
    this.velocidad = velocidad;
    this.height = 150;
  }

  dibujar() {
    c.fillStyle = 'red';
    c.fillRect(this.posicion.x, this.posicion.y, 50, this.height);
  };

  actualizar() {
    this.dibujar();
    this.posicion.y += this.velocidad.y;
    if (this.posicion.y + this.height >= canvas.height) {
        this.velocidad.y = 0;
    }
  }
}

const player = new Sprite({
    posicion: {
        x : 0,
        y: 0
    },
    velocidad: {
        x: 0,
        y: 10
    }
    
    
})

player.dibujar();

const enemy = new Sprite({
    posicion: {
        x : 400,
        y: 100
    },
    velocidad: {
        x: 0,
        y: 10
    }
    
})

enemy.dibujar();

function animar () {
    window.requestAnimationFrame(animar);
    c.fillStyle = 'black';
    c.fillRect(0,0, canvas.width, canvas.height);
    player.actualizar();
    enemy.actualizar();
}

animar();

window.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key == 'ArrowRight') {
        enemy.posicion.x += 5;
    }
    if (e.key == 'ArrowLeft') {
        enemy.posicion.x -= 5;
    }
    if (e.key == 'a') {
        player.posicion.x -= 5;
    }
    if (e.key == 'd') {
        player.posicion.x += 5;
    }
})