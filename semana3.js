"use strict";
class Repository {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
    findById(id) {
        const item = this.items.find((item) => item.id === id);
        if (!item) {
            throw new RecordNotFoundError(`Record with id ${id} was not found`);
        }
        return item;
    }
}
class RecordNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "RecordNotFoundError";
    }
}
class User {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
const user = new User(1, "Elisabeth");
console.log(user);
user.greet();
class Product {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const product = new Product(100, "laptop");
console.log(product);
const productRepository = new Repository();
productRepository.add(product);
console.log(productRepository.getAll());
try {
    const foundProduct = productRepository.findById(999);
    console.log(foundProduct);
}
catch (error) {
    if (error instanceof RecordNotFoundError) {
        console.log(error.message);
    }
}
const userRepository = new Repository();
userRepository.add(user);
console.log(userRepository.getAll());
