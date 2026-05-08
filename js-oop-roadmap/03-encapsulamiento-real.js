/*
📌 ENCAPSULACIÓN EN JAVASCRIPT

La encapsulación es un principio de la POO que consiste en
proteger los datos internos de un objeto.

👉 La idea es que no se pueda acceder directamente a ciertos datos,
   sino solo a través de métodos controlados.
*/

class User {
   #password; // propiedad privada real (no accesible desde fuera)

   constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.#password = password;
   }

   /*
    📖 Método para leer la contraseña de forma controlada
    */
   getPassword() {
      return this.#password;
   }

   /*
    ✏️ Método para cambiar la contraseña con validación básica
    */
   setPassword(newPassword, oldPassword) {
      if (this.#password !== oldPassword) {
         throw new Error("La contraseña antigua no es correcta");
      }

      this.#password = newPassword;
   }
}

/*
📌 Ejemplo de uso
*/
const user = new User("Kauan", "email@test.com", "123456");

console.log(user.getPassword());

user.setPassword("nuevaClave123", "123456");

console.log(user.getPassword());

/*
========================================================
📌 IMPORTANTE
========================================================

❌ Esto NO funciona:
   user.#password

Porque es una propiedad privada real.

👉 Solo se puede acceder desde dentro de la clase.
*/

class Person {
   #NIE;
   constructor(name, age, NIE) {
      this.name = name;

      if (!Number.isFinite(age) || age < 0) {
         throw new Error("Edad inicial inválida");
      }

      this._age = age;
      this.setNIE(NIE);
   }

   set age(value) {
      if (Number.isFinite(value) && value > this._age) {
         this._age = value;
         console.log(`Felicidades por cumplir ${value} años!`);
      } else {
         throw new Error(
            "La edad debe ser un número mayor que la edad actual. La gente no puede rejuvenecer...",
         );
      }
   }

   get age() {
      return this._age;
   }

   setNIE(newNIE) {
      if (
         !newNIE.length === 9 &&
         !/^[A-Z]\d{7}[A-Z]$/.test(newNIE) &&
         newNIE == this.#NIE
      ) {
         throw new Error("NIE no válido o igual al actual");
      }
      this.#NIE = newNIE;
   }

   getMaskedNIE() {
      return this.#NIE ?
            this.#NIE.replace(/.(?=.{4})/g, "*")
         :  "NIE no establecido";
   }

   checkNIE(NIE) {
      return this.#NIE === NIE;
   }

   greet() {
      return `Hola, mi nombre es ${this.name}`;
   }
}

const Alex = new Person("Alex Jacobson", 29, "X1234567A");

console.log(Alex.age);
console.log(Alex.getMaskedNIE());
Alex.setNIE("Y7654321B");
console.log(Alex.getMaskedNIE());
Alex.checkNIE("Y7654321B") ?
   console.log("NIE correcto")
:  console.log("NIE incorrecto");
