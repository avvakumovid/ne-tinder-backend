export class FindeUserDto {
    userId?: string
    minAge?: number
    maxAge?: number
    gender?: 'Female' | 'Male'
    matches?: string[]
}