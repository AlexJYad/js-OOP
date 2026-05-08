/*
📌 ABSTRACCIÓN EN JAVASCRIPT

La abstracción consiste en **ocultar los detalles internos** y exponer solo
lo necesario de un objeto o sistema.

Ejemplo de la vida real:
- Usas un coche sin saber cómo funciona el motor por dentro.
- Solo necesitas saber que existen métodos como:
  acelerar(), frenar() y girar()
*/

/*
❌ JavaScript no tiene clases abstractas reales:
- No existe la palabra clave `abstract`.
- No puedes obligar que una clase hija implemente un método.
- Todo se hace por **convención**.
*/

/*
✅ Cómo simular abstracción en JavaScript:
- Creamos una clase base con métodos que lanzan error si no se implementan en las subclases.
*/

class Shape {
   // Método que debe ser implementado por cualquier subclase
   area() {
      throw new Error(
         "El método area() debe ser implementado por la subclase.",
      );
   }
}

// Cualquier clase que herede de Shape debe sobrescribir area()
class Square extends Shape {
   constructor(side) {
      super();
      this.side = side;
   }

   area() {
      return this.side * this.side;
   }
}

// Ejemplo de uso
const s = new Square(5);
console.log(s.area()); // 25

/*
⚠️ Si intentamos usar la clase base directamente:
*/
const broken = new Shape();
// broken.area(); // ❌ Error: método area() debe ser implementado
