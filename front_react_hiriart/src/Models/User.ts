//User class

export class User{
    private UserID: number;
    private Email: string;
    private Password: string;
    private Username: string;

    constructor(UserID: number, Email: string, Password: string, Username: string) {
        this.UserID = UserID;
        this.Email = Email;
        this.Password = Password;
        this.Username = Username;
      }

}