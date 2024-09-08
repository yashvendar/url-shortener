export class ErrorWithResponse extends Error {
    status: number;
    body: { success: boolean; data: any; message: string };

    constructor(statusCode: number, message: string, data?: any) {
        super(message);
        this.status = statusCode;
        this.body = {
            success: false,
            data,
            message,
        };
    }
}
