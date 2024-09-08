declare namespace Express {
    export interface Request{
        decodedToken?: import("jsonwebtoken").JwtPayload;
        user?: import("./src/interfaces/user.interface").User;
    }
 }