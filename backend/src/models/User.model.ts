export class User {
  public id: number;
  public password: string;
  public email: string;
  public name: string;
  public expenses: any[];
  public created: Date;

  constructor(userRes: any) {
    this.id = userRes.id;
    this.password = userRes.password;
    this.email = userRes.email;
    this.name = userRes.name;
    this.expenses = userRes.expenses;
    this.created = userRes.created;
  }
}