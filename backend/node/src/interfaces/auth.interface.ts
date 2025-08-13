export interface LoginUser {
  email: string,
  pw: string
}

export interface RegisterUser extends LoginUser {
  name: string
}