import express, { Express } from 'express';
import { GatewayServer } from '@gateway/server';
import { redisConnection } from '@gateway/redis/redis.connection';

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: GatewayServer = new GatewayServer(app);
    server.start();
    redisConnection.redisConnect();
  }
}

const application: Application = new Application();
application.initialize();



/* SOLID Principles Overview
  Single Responsibility Principle (SRP)
  Open/Closed Principle (OCP)
  Liskov Substitution Principle (LSP)
  Interface Segregation Principle (ISP)
  Dependency Inversion Principle (DIP)
  Applying SOLID Principles

  1. Single Responsibility Principle (SRP)
    GatewayServer Class: The GatewayServer class should focus on server configuration and startup tasks. It adheres to SRP by not mixing concerns; 
    it’s responsible for setting up security, middleware, routing, and other server configurations.
    
    Application Class:   The Application class is responsible for initializing the application, which includes setting up the Express app, starting the server, and connecting to Redis.

  2. Open/Closed Principle (OCP)
    GatewayServer Class: You can extend the functionality of GatewayServer without modifying its core implementation. For instance, if you need to add new middleware or services, you can do so by creating new classes or methods rather than altering the existing GatewayServer class.
    
    **You can extend Class to include additional setup logic without changing its core implementation.(Polymorfirms?? OOP)
  
  3. Liskov Substitution Principle (LSP)
    GatewayServer should be designed so that it can be substituted with any subclass or mock object in tests without altering the correctness of the application.


  4. Interface Segregation Principle (ISP)
     This class should depend on abstractions rather than concrete implementations. For example, it could depend on an interface for connecting to Redis, which allows you to easily switch out the implementation.
    
  5. Dependency Inversion Principle (DIP)
    GatewayServer Class: You can inject dependencies (e.g., Express app, Redis connection) into GatewayServer rather than having it create its own instances. This makes it easier to swap out components and improves testability. 
    
    ** Fastify
    import Fastify from 'fastify';
    import { GatewayServer } from '@gateway/server';
    import { redisConnection } from '@gateway/redis/redis.connection';

    class Application {
      public initialize(): void {
        const app = Fastify();
        const server: GatewayServer = new GatewayServer(app);
        server.start();
        redisConnection.redisConnect();
      }
    }

    const application: Application = new Application();
    application.initialize();

    ** NestJS
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { redisConnection } from '@gateway/redis/redis.connection';

    class Application {
      public async initialize(): Promise<void> {
        const app = await NestFactory.create(AppModule);
        const server = app.get(GatewayServer); // Assuming GatewayServer is a provider in your NestJS module
        await server.start();
        redisConnection.redisConnect();
      }
    }

    const application: Application = new Application();
    application.initialize();

    
    
    
    */