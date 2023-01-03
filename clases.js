class Sprite {
  constructor({
    posicion,
    escala = 1,
    imagenSrc,
    framesMaximosImagen = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.posicion = posicion;
    this.width = 50;
    this.height = 150;
    this.imagen = new Image();
    this.imagen.src = imagenSrc;
    this.escala = escala;
    this.framesMaximosImagen = framesMaximosImagen;
    this.frameActualImagen = 0;
    (this.framesElapsed = 0), (this.framesHold = 10), (this.offset = offset);
  }

  dibujar() {
    c.drawImage(
      this.imagen,
      this.frameActualImagen * (this.imagen.width / this.framesMaximosImagen),
      0,
      this.imagen.width / this.framesMaximosImagen,
      this.imagen.height,
      this.posicion.x - this.offset.x,
      this.posicion.y - this.offset.y,
      (this.imagen.width * this.escala) / this.framesMaximosImagen,
      this.imagen.height * this.escala
    );
  }
  incrementarFrame() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameActualImagen < this.framesMaximosImagen - 1) {
        this.frameActualImagen++;
      } else {
        this.frameActualImagen = 0;
      }
    }
  }
  actualizar() {
    this.dibujar();
    this.incrementarFrame();
  }
}

class Luchador extends Sprite {
  constructor({
    posicion,
    velocidad,
    color = "red",
    direccionAtaque,
    escala = 1,
    imagenSrc,
    framesMaximosImagen = 1,
    offset = { x: 0, y: 0 },
    posturas,

  }) {
    super({ posicion, imagenSrc, escala, framesMaximosImagen, offset });

    this.velocidad = velocidad;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.hitBoxAtaque = {
      posicion: {
        x: this.posicion.x,
        y: this.posicion.y,
      },
      width: direccionAtaque.anchoHitbox,
      height: direccionAtaque.altoHitbox,
      direccionAtaque: direccionAtaque,
    };
    this.color = color;
    this.estaAtacando;
    this.vida = 100;
    this.estaMuerto = false;
    this.frameActualImagen = 0;
    this.framesElapsed = 0;
    (this.framesHold = 5), (this.offset = offset), (this.posturas = posturas);

    for (const postura in posturas) {
      (posturas[postura].imagen = new Image()),
        (posturas[postura].imagen.src = posturas[postura].imagenSrc);
    }
  }

  atacar = () => {
    this.cambiarFrames("atacando1");
    this.estaAtacando = true;
    
  };

  actualizar() {
    this.dibujar();
    if (!this.estaMuerto){
        this.incrementarFrame();

    }

    
    this.posicion.y += this.velocidad.y;
    this.posicion.x += this.velocidad.x;

    this.hitBoxAtaque.posicion.x =
      this.posicion.x + this.hitBoxAtaque.direccionAtaque.x;
    this.hitBoxAtaque.posicion.y = this.posicion.y + this.hitBoxAtaque.direccionAtaque.y;

    if ((this.posicion.y + this.height + this.velocidad.y) >= canvas.height - 90  ) {
      this.velocidad.y = 0;
    } else {
      this.velocidad.y += gravedad;
    }
  }

  cambiarFrames(frame) {

    if (this.imagen === this.posturas.atacando1.imagen && this.frameActualImagen < this.posturas.atacando1.framesMaximosImagen -1 ) return;

    if (this.imagen === this.posturas.recibiendo.imagen && this.frameActualImagen < this.posturas.recibiendo.framesMaximosImagen -1 ) return;

    if (this.imagen === this.posturas.muerto.imagen) {
        if (this.frameActualImagen = this.framesMaximosImagen -1){
            this.estaMuerto = true;
        };
        
        return;
    }


    switch (frame) {
      case "quieto":
        if (this.imagen != this.posturas.quieto.imagen) {
            this.imagen = this.posturas.quieto.imagen;
            this.framesMaximosImagen =
            this.posturas.quieto.framesMaximosImagen;
            this.frameActualImagen = 0;
        }
        break;
      case "corriendo":
        if (this.imagen != this.posturas.corriendo.imagen) {
            this.imagen = this.posturas.corriendo.imagen;
            this.framesMaximosImagen =
            this.posturas.corriendo.framesMaximosImagen;
            this.frameActualImagen = 0;
        }
        break;
      case "saltando":
        if (this.imagen != this.posturas.saltando.imagen) {
            this.imagen = this.posturas.saltando.imagen;
            this.framesMaximosImagen =
            this.posturas.saltando.framesMaximosImagen;
            this.frameActualImagen = 0;
        }
        break;
      case "cayendo":
        if (this.imagen != this.posturas.cayendo.imagen) {
            this.imagen = this.posturas.cayendo.imagen;
            this.framesMaximosImagen =
            this.posturas.cayendo.framesMaximosImagen;
            this.frameActualImagen = 0;
        }
        break;
      case "atacando1":
        if (this.imagen != this.posturas.atacando1.imagen) {
            this.imagen = this.posturas.atacando1.imagen;
            this.framesMaximosImagen =
            this.posturas.atacando1.framesMaximosImagen;
            this.frameActualImagen = 0;
        }
        break;
        case "recibiendo":
        if (this.imagen != this.posturas.recibiendo.imagen) {
            this.imagen = this.posturas.recibiendo.imagen;
            this.framesMaximosImagen =
            this.posturas.recibiendo.framesMaximosImagen;
            this.frameActualImagen = 0;
        }
        break;
        case "muerto":
            if (this.imagen != this.posturas.muerto.imagen) {
                this.imagen = this.posturas.muerto.imagen;
                this.framesMaximosImagen =
                this.posturas.muerto.framesMaximosImagen;
                this.frameActualImagen = 0;
            }
            break;
      default:
        break;
    }
  }
}
