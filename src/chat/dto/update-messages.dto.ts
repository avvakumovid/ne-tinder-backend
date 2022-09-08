
export class UpdateMessagesDto {
    chatId: string
    message: {
        date: Date,
        message: string,
        author: string
    }
}