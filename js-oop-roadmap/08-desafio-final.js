/*************************************************************
 🧠 Desafío Final: Sistema Bancario con JavaScript POO
**************************************************************/

/*
🎯 Objetivo:
Crear un sistema bancario simple utilizando únicamente JavaScript puro
(sin bibliotecas externas), aplicando los pilares de la Programación
Orientada a Objetos (POO):

- Clases / funciones constructoras
- Getters y setters
- Encapsulamiento
- Herencia
- Polimorfismo
- Métodos estáticos
*/

/*************************************************************
🏦 Requisitos del Sistema
**************************************************************/

/*
1. Clase Account (Clase base)
--------------------------------------------------------

🔹 Propiedades:
- owner: titular de la cuenta
- balance: saldo de la cuenta (por defecto 0)
- #password: contraseña de la cuenta (privada, usando encapsulamiento real)

🔹 Métodos:
- deposit(amount): añade dinero al saldo
- withdraw(amount): retira dinero del saldo (con validaciones)
- getter balance: devuelve el saldo actual
- setter password: verifica que la contraseña tenga al menos 6 caracteres
*/

/*
2. SavingsAccount (Cuenta Ahorro)
----------------------------------

🔹 Hereda de: Account

🔹 Propiedad adicional:
- interestRate: tasa de interés

🔹 Método extra:
- applyInterest(): aplica la tasa de interés al saldo
*/

/*
3. CurrentAccount (Cuenta Corriente)
----------------------------------

🔹 Hereda de: Account

🔹 Propiedad adicional:
- overdraftLimit: límite de sobregiro

🔹 Sobrescritura de método:
- withdraw(): permite saldo negativo hasta el límite de sobregiro
*/

/*
4. Clase Bank
--------------

🔹 Propiedad:
- accounts: lista de cuentas registradas en el banco

🔹 Métodos:
- addAccount(account): agrega una cuenta a la lista
- findAccountByOwner(name): busca una cuenta por el nombre del titular
- transfer(from, to, amount): transfiere saldo entre cuentas

🔹 Método estático:
- static bankInfo(): devuelve un nombre ficticio del banco y año de fundación
*/

/*************************************************************
💡 Extras (desafío opcional para aumentar la complejidad)
**************************************************************/

/*
- Crear una clase Transaction para registrar el historial de transacciones
- Método getStatement() que muestra el extracto de movimientos de la cuenta
- Implementar bloqueo de cuenta después de 3 intentos de contraseña incorrecta
- Usar encapsulamiento real con # o Symbol para propiedades privadas
- Utilizar Object.defineProperty para personalizar getters/setters
- Usar Object.freeze() para proteger objetos contra modificaciones
*/

/*************************************************************
✅ Qué se debe evaluar / verificar
**************************************************************/

/*
1. POO básica:
- Creación de clases y objetos
- Uso de constructor y this

2. Getters y setters:
- balance debe leerse con getter
- password debe validarse con setter

3. Encapsulamiento:
- #password u otra forma de proteger datos
- No acceder directamente desde fuera de la clase

4. Herencia y polimorfismo:
- SavingsAccount y CurrentAccount heredan de Account
- CurrentAccount.withdraw() se comporta diferente (sobregiro permitido)

5. Métodos estáticos:
- Bank.bankInfo() funciona sin crear instancias

6. Comportamiento real:
- depositar, retirar, transferir y aplicar intereses funcionan correctamente
- Se manejan errores correctamente (saldo insuficiente, password inválida)
*/
const BANK_CONFIG = Object.freeze({
   name: "Banco Ficticio",
   founded: 2024,
});

class Account {
   #password;
   constructor(owner, balance = 0, password, blocked = false) {
      this.owner = owner;
      Object.defineProperty(this, "balance", {
         get: () => this._balance,
         set: () => {
            throw new Error("No puedes modificar el balance directamente");
         },
         enumerable: true,
      });
      this.password = password; // Usamos el setter para validar
      this.blocked = blocked;
      this.counter = 0; // Contador de intentos de contraseña
      this.transactions = new Transaction(); // Historial de transacciones
   }

   deposit(amount) {
      if (amount <= 0 || this.blocked) {
         return false;
      }
      this._balance += amount;
      this.transactions.addTransaction("deposit", amount);
      return true;
   }

   withdraw(amount) {
      if (amount > this._balance || this.blocked) {
         return false;
      }
      this.withdrawOperation(amount);
      return true;
   }

   withdrawOperation(amount) {
      this._balance -= amount;
      this.transactions.addTransaction("withdraw", amount);
   }

   get balance() {
      return this._balance;
   }
   set password(newPassword) {
      if (typeof newPassword === "string" && newPassword.length >= 6) {
         this.#password = newPassword;
      } else {
         console.log("La contraseña debe tener al menos 6 caracteres.");
      }
   }

   checkPassword(password) {
      if (this.blocked) {
         return false;
      }
      if (this.#password !== password) {
         this.counter++;
         if (this.counter >= 3) {
            this.blocked = true;
         }
         return false;
      }
      return true;
   }

   getStatement() {
      return this.transactions.getStatement();
   }
}

class SavingsAccount extends Account {
   constructor(owner, balance = 0, password, interestRate) {
      super(owner, balance, password);
      this.interestRate = interestRate;
   }

   applyInterest() {
      const amount = this._balance * this.interestRate;
      this._balance += amount;
      this.transactions.addTransaction("interest", amount);
   }
}

class CurrentAccount extends Account {
   constructor(owner, balance = 0, password, overdraftLimit) {
      super(owner, balance, password);
      this.overdraftLimit = overdraftLimit;
   }

   withdraw(amount) {
      if (amount > this._balance + this.overdraftLimit) {
         return false;
      } else {
         super.withdrawOpperation(amount);
         return true;
      }
   }
}

class Bank {
   constructor() {
      this.accounts = [];
   }

   addAccount(account) {
      this.accounts.push(account);
   }

   findAccountByOwner(name) {
      return this.accounts.find((account) => account.owner === name);
   }

   transfer(from, to, amount, password) {
      const fromAccount = this.findAccountByOwner(from);
      const toAccount = this.findAccountByOwner(to);
      if (fromAccount && toAccount && fromAccount.checkPassword(password)) {
         if (fromAccount.withdraw(amount)) {
            toAccount.deposit(amount);
            console.log(
               `Transferencia de ${amount} de ${from} a ${to} realizada con éxito.`,
            );
         } else {
            console.log("Saldo insuficiente para la transferencia.");
         }
      } else {
         console.log("Transferencia fallida. Verifique los detalles.");
      }
   }

   static bankInfo() {
      return `${BANK_CONFIG.name} - Fundado en ${BANK_CONFIG.founded}`;
   }
}

class Transaction {
   constructor() {
      this.transactions = [];
   }

   addTransaction(type, amount) {
      this.transactions.push({ type, amount, date: new Date() });
   }

   getStatement() {
      return this.transactions.map(
         (t) => `${t.date.toLocaleString()}: ${t.type} de ${t.amount}`,
      );
   }
}

// Ejemplo de uso
const Bank_A = new Bank();

const savings = new SavingsAccount("Alice", 1000, "password123", 0.05);
const current = new CurrentAccount("Bob", 500, "secure456", 200);

Bank_A.addAccount(savings);
Bank_A.addAccount(current);

savings.applyInterest();
console.log(`Saldo de Alice después de aplicar interés: ${savings.balance}`);

console.log(`Saldo de Alice: ${savings.balance}`);
console.log(`Saldo de Bob: ${current.balance}`);
Bank_A.transfer("Alice", "Bob", 200, "password123");
console.log(`Saldo de Alice: ${savings.balance}`);
console.log(`Saldo de Bob: ${current.balance}`);

console.log(Bank.bankInfo());

console.log(current.getStatement());
