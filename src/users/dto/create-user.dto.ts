export class CreateUserDto {
    public email: string
    public password: string
    public name: string
    public birthdate: Date
    public pictures: string[]
    public gender: 'Male' | 'Female'
    public age: number

}
