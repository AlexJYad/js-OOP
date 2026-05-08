/*
📌 Una clase es un "molde" o plantilla que usamos para crear objetos.

Piensa en ello así:
- La clase define cómo será una persona
- El objeto es una persona real creada a partir de ese molde

---

🧱 En este ejemplo:

class Person
→ define el molde (la estructura de la persona)

constructor(name, age)
→ es la parte que se ejecuta cuando creamos el objeto
→ sirve para asignar los valores iniciales

this.name / this.age
→ guardan los datos dentro del objeto creado

greet()
→ es una función que pertenece al objeto y puede usar sus datos

---

👤 Resultado:

- Person es el molde
- user es una persona real creada con ese molde
- cada objeto puede tener sus propios valores
*/

class Person {
   constructor(name, age) {
      this.name = name;
      this.age = age;
   }

   greet() {
      return `Hola, mi nombre es ${this.name}`;
   }
}

// Creamos un objeto (una instancia) a partir de la clase Person
const user = new Person("Kauan Rodrigues", 17);
const user2 = new Person("Alex Jacobson", 29);

console.log(user.greet());
console.log(user2.greet());
