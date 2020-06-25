import { EventM } from './event';
import JWT from 'express-jwt';
import bcrypt from 'bcrypt';

export interface Email {
  emailValidator: (email: string) => boolean;
}

export interface Password {
  passValidator: (pass: string) => boolean;
  passHash: (pass: string) => boolean;
  passHashCompare: (bodyPass: string, DBPass: string) => boolean;
}

export interface Jwt {
  tokenValidator: (token: string) => boolean;
  tokenGenerator: (token: string) => boolean;
}

export class User implements Email, Password, Jwt {
  private name: string;
  private email: string;
  private password: string = '';
  private tokens: Array<string> = [];
  private events: Array<EventM> = [];

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): boolean {
    this.name = newName;
    return true;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(newEmail: string): boolean {
    this.email = newEmail;
    return true;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(newPass: string): boolean {
    this.password = newPass;
    return true;
  }

  public getTokens(): Array<string> {
    return this.tokens;
  }

  public addToken(token: string): boolean {
    this.tokens.push(token);
    return true;
  }

  public getEvents(): Array<EventM> {
    return this.events;
  }

  public addEvent(eventM: EventM): boolean {
    this.events.push(eventM);
    return true;
  }

  //INTERFACE METHODS

  //email
  public emailValidator(): boolean {
    const validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!validEmail.test(this.email)) {
      return false;
    } else {
      return true;
    }
  }

  //password
  public passHash(pass: string): boolean {
    return true;
  }

  public passValidator(pass: string): boolean {
    return true;
  }

  public passHashCompare(bodyPass: string, DBPass: string): boolean {
    return true;
  }

  //token
  public tokenValidator(token: string): boolean {
    return true;
  }

  public tokenGenerator(token: string): boolean {
    return true;
  }
}
