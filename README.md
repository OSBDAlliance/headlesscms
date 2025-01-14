<p align="center">

<img src="./docs/static/OSBD_logo.svg" width="250">

<br><br>

<strong>Open source headless CMS by OSBD Alliance</strong>
<br><br>
OSBD is a community-driven initiative. We welcome everyone to contribute whether it’s fixing bugs, enhancing documentation, or helping spread the word. Your involvement matters!

</p>

<p align="center">

<a href="https://osbdalliance.org/">Website</a> |  <a href="https://github.com/OSBDAlliance/headlesscms">Documentation</a>

</p>

# Coding Standards for OSBD Headless CMS Project

This document outlines the coding conventions and best practices for developing an open-source Headless CMS using TypeScript. The goal is to ensure that the codebase remains clean, maintainable, and follows industry best practices.

## General Guidelines
- **Consistent and readable code**: The code should be easy to understand and follow. Use descriptive variable and function names.
- **Single Responsibility Principle**: Each class, function, or module should have a single responsibility.
- **No magic numbers**: Avoid using literal values (e.g., `0`, `1`, etc.) directly in the code. Instead, define constants with meaningful names.
- **Type Safety**: Always prefer strongly typed variables and return values. Use `unknown` or `any` only when absolutely necessary, and avoid them in favor of more specific types.
- **Avoid duplicate code**: If you notice similar code appearing in multiple places, abstract it into a reusable function or service.
- **Max Lines per Class**: A class should generally not exceed **200 lines**. This keeps the class focused and manageable.
- **Max Lines per Method**: A method should ideally not exceed **50 lines**. If it does, consider refactoring into smaller methods.

## File Naming and Folder Structure

### General Structure

The current project structure as follows:

```bash
├── app.ts              // Main entry point to initialize the application.
├── bootstrap.ts        // Contains logic for bootstrapping the app.
├── config              // Configuration files for the application.
│   ├── default.ts      // Default configuration settings (e.g., database, API keys, etc.).
│   ├── environment.ts  // Environment-specific settings (e.g., development, production).
│   └── index.ts        // Centralized configuration export for easy access.
├── core                // Core application logic and business modules.
│   ├── controllers     // Express route handlers (e.g., CRUD logic for resources).
│   ├── models          // TypeORM entity definitions representing database tables.
│   ├── repositories    // Data access layer for interacting with the database.
│   ├── routes          // API route definitions, organized by resource.
│   ├── services        // Business logic and service layer (e.g., data processing, integrations).
│   └── validations     // Schema validations (e.g., using Zod or class-validator).
├── docs                // Documentation for the project.
│   ├── api             // API documentation (e.g., OpenAPI/Swagger specs).
│   ├── architecture    // High-level architectural design documents.
│   ├── contributing    // Guidelines for contributing to the project.
│   ├── development     // Developer setup and usage instructions.
│   └── static          // Static assets for documentation (e.g., images, diagrams).
├── LICENSE             // Open-source license for the project.
├── package.json        // npm package definition, including dependencies and scripts.
├── plugins             // Custom plugins or extensions for the CMS.
│   └── README.md       // Documentation for plugins and how to build them.
├── README.md           // Main project README with overview and instructions.
├── scripts             // Utility scripts for development or deployment.
│   └── start-dev.ts    // Script to start the application in development mode.
├── shared              // Shared utilities and components across the app.
│   ├── middlewares     // Reusable Express middleware (e.g., authentication, logging).
│   ├── services        // Common services (e.g., email, caching, etc.).
│   ├── types           // TypeScript type definitions and interfaces.
│   └── utils           // General utility functions and helpers.
├── tests               // Test files (unit, integration, and e2e).
├── tsconfig.json       // TypeScript configuration file.
└── views               // View templates for the CMS (if applicable).
    ├── admin           // Templates for the admin interface.
    ├── error.ejs       // Template for error pages.
    ├── index.ejs       // Main landing page template.
    ├── layouts         // Shared layout templates.
    └── partials        // Reusable view components (e.g., header, footer).
````

### File Naming Conventions

- Use **camelCase** for variable and function names.
- Use **PascalCase** for class names and interfaces.
- Use **kebab-case** for filenames (e.g., `create-user.ts`, `user-service.ts`).
- Use **index.ts** for modules that export a single service or class in a directory.

```typescript
// file: core/services/user-service.ts 
export class UserService {   
	constructor(private userRepository: UserRepository) {}
	
	public async getUser(id: string): Promise<User | null> {
		return this.userRepository.find(id);
	}
}
```

## TypeScript Syntax

##### Type Annotations: 
Always add type annotations to variables and return values.
```typescript
	const userName: string = 'Md. Mazba Kamal';
	 
	function add(a: number, b: number): number {   
		return a + b; 
	}
```

##### Interfaces & Types: 
We prefer **interfaces** over **type aliases** for defining object shapes, as interfaces provide better tooling and support for declaration merging, which can be especially useful in our headless CMS. Use `type` only when necessary, such as when defining union types, mapped types, or function types.
- Use **interfaces** for defining the shape of objects, classes, or function signatures.
- **Type aliases** are used in specific cases, such as for union types, intersection types, and mapped types.
- 
***Example of using Interface:***
```typescript
// preferred method for defining object shapes 
interface User {
	id: number;
	name: string;
	email: string; 
}

interface UserService {
	getUserById(id: number): Promise<User>;
	createUser(user: User): Promise<User>;
}
```

**_Example of using Type Alias_:**
```typescript
// Use type aliases for union or intersection 
types type ResponseStatus = 'success' | 'error'; 
type UserResponse = User | null;
```

##### Enums: 
Use `enum` for predefined constant sets.
```typescript
enum Role {
	Admin = 'admin',
	User = 'user',
}
```

#### Async/Await:
Always prefer `async/await` over promises when working with asynchronous code.
```typescript
const fetchUser = async (userId: string): Promise<User> => {   
	return await userRepository.findById(userId); 
}
```

##### Null & Undefined:
Avoid using `null` unless absolutely necessary. Prefer `undefined` for uninitialized variables.
```typescript
let result: string | undefined;
```

***Example of a Service Layer:***
```typescript
// core/services/user-service.ts
export class UserService {
	constructor(private userRepository: UserRepository) {}
	
	public async getUserById(id: string): Promise<User | null> {
		return this.userRepository.findById(id);
	}
	
	public async createUser(data: CreateUserDTO): Promise<User>{
		const user = new User(data);
		return this.userRepository.save(user);
	}
}
```

***Example of a Repository Layer:***
```typescript
// core/repositories/user-repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

	async findById(id: string): Promise<User | null> {
		return this.findOne(id) || null;
	}
	
}
```

## Comments and Documentation

##### JSDoc for Public APIs: 
Use JSDoc comments for functions, methods, and classes to document expected parameters and return types. This is helpful for IDE auto-completion and documentation generation.
```typescript
/**  
* Gets a user by ID  * @param id The user's unique identifier  * @returns The user object  
* */ 
async getUserById(id: string): Promise<User | null> {
	// implementation
}
``` 

##### Function Comments:
For complex functions, add inline comments explaining the logic.
    
##### TODOs:
Mark unfinished tasks or potential improvements with `// TODO:`

```typescript
// TODO: Need implement content caching
```

## Error Handling

**Use custom error classes:for throwing specific errors related to business logic.**
```typescript
class UserNotFoundError extends Error {   
	constructor(message: string) {     
	super(message);     
		this.name = 'UserNotFoundError';   
	} 
}
```

**Handle async errors with `try/catch` blocks around `async/await` code.**
```typescript
try {
	await userService.getUserById('123');
}
catch (error) {
	if (error instanceof UserNotFoundError) {
	// Handle error
	}
}
```

## Testing & Test Coverage

- **Testing Framework**: Use `Jest` or `Mocha` for testing.
- **Test Structure**: Tests should be located in the `tests` folder.
- **Unit Tests**: Write unit tests for individual services, repositories, and controllers.
- **Integration Tests**: Test the integration of services, repositories, and external APIs.


```typescript
// Example of unit test with Jest
describe('UserService', () => {
	let userService: UserService;
	let userRepository: UserRepository;
	
	beforeEach(() => {
		userRepository = new UserRepository();
		userService = new UserService(userRepository);
	});
	
	it('should return user by ID', async () => {
		const user = await userService.getUserById('123');
		expect(user).toBeDefined();
	});
});
```
## Version Control

- **Branching**: Use feature branches for new work. Follow a naming convention like `feature/<feature-name>`.
- **Commits**: Write clear, descriptive commit messages. Each commit should represent a single logical change.
    - Use **imperative mood** for commit messages: "Fix bug in user service" or "Add new validation to user controller".

## Style Formatting Tools

- **Prettier**: Use Prettier for consistent code formatting.
- **ESLint**: Use ESLint with TypeScript to catch common errors and enforce best practices.
- **Husky & Lint-Staged**: Use Husky for pre-commit hooks to run linters and tests on staged files.
## Development Workflow

- **Local Development**: Use `npm run dev` or `yarn dev` to run the application locally with hot-reloading.
- **Build**: Use `tsc` to compile the TypeScript code to JavaScript.
- **Testing**: Run tests with `npm test` or `yarn test`.


# Proposed Design Patterns
## **Singleton Pattern**
The Singleton pattern ensures a class has only one instance, often used for managing shared resources like database connections.

**Use Case**: Database connection management using TypeORM.

***Example:***
```typescript
// core/services/database.ts
class Database {
  private static instance: Database;
  private constructor() {
	// Initialize TypeORM connection
  }
  public static getInstance(): Database {
	if (!Database.instance) {
	  Database.instance = new Database();
	}
	return Database.instance;
  }
  public connect(): Promise<void> {
	// Database connection logic
	return;
  }
}
// Usage
const db = Database.getInstance();
db.connect();
```

---

## Factory Pattern

The Factory pattern provides an interface for creating objects based on dynamic input, making it useful for creating different CMS content types.

**Use Case:** Dynamically creating content models like Articles and Pages.
***Example***
```typescript
// core/models/content-factory.ts
interface Content {
	title: string;
	body: string;
}

class Article implements Content {
	constructor(public title: string, public body: string) {}
}

class Page implements Content {
	constructor(public title: string, public body: string) {}
}

class ContentFactory {
	public static createContent<T extends Content>(type: new (...args: any[]) => T, title: string, body: string): T {
		return new type(title, body);
	}
}
// Usage
const content = ContentFactory.createContent(Article, 'Title', 'Body');
```

---

## Repository Pattern

The Repository pattern abstracts database operations, ensuring data access logic is separate from business logic.

***Use Case:*** Interacting with content models (e.g., User, Post) via TypeORM

***Example:***
```typescript
// core/repositories/user-repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findById(id: string): Promise<User | null> {
	return this.findOne(id) || null;
	}
}

// Usage in service
const userRepo = new UserRepository();
const user = await userRepo.findById('123');
```


## Contributors 🤝

Thank you to all the amazing people who have contributed to this project! 💙

|      ![firozemzr](https://github.com/firozemzr.png)      |           ![s21rf](https://github.com/s21rf.png)           |   ![Md. Mazba Kamal](https://github.com/mazba.png)   |
| :------------------------------------------------------: | :--------------------------------------------------------: | :--------------------------------------------------: |
| [Firoze M. Zahidur Rahman](https://github.com/firozemzr) |         [Muhammad Asif Atick](https://github.com/)         |     [Md. Mazba Kamal](https://github.com/mazba)      |
|          ![s21rf](https://github.com/s21rf.png)          |       ![arupkamal](https://github.com/arupkamal.png)       | ![tanvirismail](https://github.com/tanvirismail.png) |
|            [s21rf](https://github.com/s21rf)             |      [Ahmed Arup Kamal](https://github.com/arupkamal)      |   [Tanvir Ismail](https://github.com/tanvirismail)   |
|        ![rifat17](https://github.com/rifat17.png)        | ![MoududHassanBat](https://github.com/MoududHassanBat.png) |     ![masum065](https://github.com/masum065.png)     |
|     [Abdullah Al Hasib](https://github.com/rifat17)      |    [Moudud Hassan](https://github.com/MoududHassanBat)     |     [Masum Billah](https://github.com/masum065)      |
|   ![muhsinashoma](https://github.com/muhsinashoma.png)   |     ![UlfathAhmed](https://github.com/UlfathAhmed.png)     | ![SaidaBinta87](https://github.com/SaidaBinta87.png) |
|     [muhsinashoma](https://github.com/muhsinashoma)      |       [UlfathAhmed](https://github.com/UlfathAhmed)        | [Saida Binta Alam](https://github.com/SaidaBinta87)  |
|   ![SajidHShanta](https://github.com/SajidHShanta.png)   |       **Start contributing and join our community**        |    **Start contributing and join our community**     |
|     [SajidHShanta](https://github.com/SajidHShanta)      |                                                            |                                                      |
