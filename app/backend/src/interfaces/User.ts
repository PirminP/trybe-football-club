interface ILogin {
  email: string,
  password: string,
}

interface IUser {
  id:number,
  username: string;
  role: string,
  email: string,
  password: string,
}

export { ILogin };

export default IUser;
