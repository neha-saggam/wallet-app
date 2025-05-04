export class User {
  users: string[];
  constructor() {
    this.users = [];
  }

  createUser(username: string) {
    this.users.push(username);
  }

  getUsers() {
    return this.users;
  }
}
