ma parte del encapsulamiento:
proteger datos y evitar cambios incorrectos.
*/

class Product {
   constructor(name, price) {
      this.name = name;
      this._price = price; // propiedad interna (convención de "privado")
   }

   /*
    📖 GETTER (leer valor)

    Se ejecuta cuando accedemos a:
    product.price
    */
   get price() {
      return this._price.toFixed(2);
   }

   /*
    ✏️ SETTER (modificar valor)

    Se ejecuta cuando hacemos:
    product.price = nuevoValor
    */
   set price(value) {
      if (typeof value === "number" && value > 0) {
         this._price = value;
      } else {
         throw new Error("El precio debe ser un número mayor que 0");
      }
   }

   describe() {
      return `${this.name} cuesta R$ ${this.price}`;
   }
}

/*
📌 Ejemplo de uso
*/
let item;

try {
   item = new Product("keyboard", 150);

   // Intento de asignar valor inválido
   item.price = -4;

   console.log(item.price);
   console.log(item.describe());
} catch (error) {
   console.log("Error: el precio no es válido");

   // Recuperación del flujo
   item || (item = new Product("keyboard", 150));

   item.price = 200;

   console.log(item.price);
   console.log(item.describe());
}

/*
========================================================
📌 ¿CÓMO FUNCIONABA ANTES DE "class"?
========================================================

Antes de ES6, JavaScript no tenía clases.

Se usaban funciones constructoras + prototype.
*/

function Product2(name, price) {
   this.name = name;
   this._price = price;
}

/*
📌 Getter y Setter con Object.defineProperty
*/
Object.defineProperty(Product2.prototype, "price", {
   get: function () {
      return this._price.toFixed(2);
   },
   set: function (value) {
      if (typeof value === "number" && value > 0) {
         this._price = value;
      } else {
         throw new Error("El precio debe ser un número mayor que 0");
      }
   },
});

/*
📌 Método en el prototype
*/
Product2.prototype.describe = function () {
   return `${this.name} cuesta R$ ${this.price}`;
};

/*
📌 Ejemplo de uso
*/
let item2;

try {
   item2 = new Product2("keyboard", 150);

   item2.price = -4;
} catch (error) {
   console.log("Error: el precio no es válido");

   item2 || (item2 = new Product2("keyboard", 150));

   item2.price = 200;

   console.log(item2.price);
   console.log(item2.describe());
}