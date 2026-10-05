interface ConId {
  id: number;
}

class Repository<T extends ConId> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }

  findById(id: number): T {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new RecordNotFoundError(`Record with id ${id} was not found`);
    }

    return item;
  }
}

class RecordNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecordNotFoundError";
  }
}

class User implements ConId {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const user = new User(1, "Elisabeth");

console.log(user);
user.greet();

class Product implements ConId {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const product = new Product(100, "laptop");

console.log(product);

const productRepository = new Repository<Product>();

productRepository.add(product);

console.log(productRepository.getAll());

try {
  const foundProduct = productRepository.findById(999);
  console.log(foundProduct);
} catch (error) {
  if (error instanceof RecordNotFoundError) {
    console.log(error.message);
  }
}
const userRepository = new Repository<User>();

userRepository.add(user);

console.log(userRepository.getAll());