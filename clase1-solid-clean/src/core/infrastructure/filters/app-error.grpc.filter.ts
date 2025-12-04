import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { throwError } from "rxjs";

@Catch(Error)
export class AppErrorGrpcFilter implements ExceptionFilter {
    catch(exception: any, _host: ArgumentsHost) {
        const error = exception.name;
        const msg = exception.message;
        switch (error) {
            case 'InvalidRequestError':
                return throwError(() => ({
                    code: 3, // INVALID_ARGUMENT
                    message: msg,
                }));
            case 'NotFoundError':
                return throwError(() => ({
                    code: 5, // NOT_FOUND
                    message: msg,
                }));
        }


    }

}