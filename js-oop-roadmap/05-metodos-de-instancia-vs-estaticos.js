/*
📌 MÉTODOS DE INSTANCIA VS MÉTODOS ESTÁTICOS

Métodos de instancia:
- Pertenecen al objeto creado a partir de la clase.
- Solo se pueden llamar a través de una instancia.

Métodos estáticos:
- Pertenecen a la clase, no a los objetos.
- Se pueden llamar directamente desde la clase.
*/

// Ejemplo simple de método estático
class MathHelper {
   static sum(a, b) {
      return a + b;
   }
}

console.log(MathHelper.sum(10, 20)); // 30

/*
========================================================
📌 Ejemplo completo con atributos y métodos
========================================================
*/
class Person {
   // Atributos estáticos: pertenecen a la clase
   static species = "Homo sapiens";
   static count = 0; // contador de instancias creadas

   // Atributos de instancia: pertenecen al objeto
   constructor(name, age) {
      this.name = name;
      this.age = age;

      Person.count++; // aumenta cada vez que se crea un nuevo objeto
   }

   // Método de instancia: se llama solo desde el objeto
   greet() {
      return `Hola, mi nombre es ${this.name}`;
   }

   // Método estático: se llama desde la clase
   static describeSpecies() {
      return `Los humanos pertenecen a la especie ${Person.species}`;
   }

   static getCount() {
      return Person.count;
   }
}

/*
📌 Uso de métodos y atributos estáticos
*/
console.log(Person.species); // Homo sapiens
console.log(Person.describeSpecies()); // Los humanos pertenecen a la especie Homo sapiens

/*
📌 Creación de instancias de la clase
*/
const p1 = new Person("Pepita", 25);
const p2 = new Person("Maria", 30);

/*
📌 Uso de métodos de instancia (a través de los objetos)
*/
console.log(p1.greet()); // Hola, mi nombre es Pepita
console.log(p2.greet()); // Hola, mi nombre es Maria

/*
📌 Intento de usar método de instancia desde la clase (NO funciona)
// console.log(Person.greet()); // ERROR
*/

/*
📌 Intento de acceder a atributo estático desde un objeto (no recomendado)
*/
console.log(p1.species); // undefined

/*
📌 Acceso al contador de instancias (atributo estático)
*/
console.log(Person.getCount()); // 2
