class Person {
   static count = 0; // contador de instancias creadas
   #NIE;

   constructor(name, age, NIE) {
      this.name = name;

      if (!Number.isFinite(age) || age < 0) {
         throw new Error("Edad inicial inválida");
      }

      this._age = age;
      this.setNIE(NIE);
      Person.count++; // aumenta cada vez que se crea un nuevo objeto
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
      return `Hola, mi nombre es ${this.name}.`;
   }
   static getCount() {
      return Person.count;
   }

   static isAdult(age) {
      return age >= 18;
   }

   trabajo() {
      throw new Error(
         "El método trabajo() debe ser implementado por la subclase.",
      );
   }
}

class Citizen extends Person {
   constructor(name, age, NIE, country, work = "desempleador") {
      super(name, age, NIE); // Llama al constructor de Person
      if (typeof country !== "string" || country.length < 2) {
         throw new Error("País no válido");
      }
      this.country = country;
      this.work = work;
   }

   // Polimorfismo: sobrescribimos greet para incluir el país
   greet() {
      return `${super.greet()} Soy de ${this.country}.`;
   }

   trabajo() {
      return `Trabajo como ${this.work}.`;
   }
}

let Alex = new Person("Alex Jacobson", 29, "X1234567A");

console.log(Alex.age);
console.log(Alex.getMaskedNIE());
Alex.setNIE("Y7654321B");
console.log(Alex.getMaskedNIE());
Alex.checkNIE("Y7654321B") ?
   console.log("NIE correcto")
:  console.log("NIE incorrecto");
Alex = new Citizen("Alex Jacobson", 29, "Y7654321B", "España", "programador");
const Inna = new Citizen("Inna", 25, "Z9876543C", "España", "diseñadora");
console.log(Inna.greet()); // Hola, mi nombre es Inna. Soy de España.
console.log(Inna.trabajo());
console.log(Alex.greet()); // Hola, mi nombre es Alex Jacobson. Soy de España.
console.log(Alex.trabajo()); // Trabajo como programador.

console.log(`Número de personas creadas: ${Person.getCount()}`); // Número de personas creadas: 2
console.log(`¿Es Alex adulto? ${Person.isAdult(Alex.age)}`); // ¿Es Alex adulto? true
