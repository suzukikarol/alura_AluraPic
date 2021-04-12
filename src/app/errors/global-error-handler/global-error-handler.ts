import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/user/user.service";
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from "./server-log.service";
import { environment } from "../../../environments/environment";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { } //injector é um artefato do Angular

    handleError(error: any): void {
        //qual a rota que que esta sendo acessada no momento
        const location = this.injector.get(LocationStrategy);

        //injetando o serviço do usuário para acessar o valor do usuário
        const userService = this.injector.get(UserService);

        //injetar o serviço de log
        const serverLogService = this.injector.get(ServerLogService);

        //injetar o router
        const router = this.injector.get(Router);

        //instanciando na variável url se existe um valor de location, senão retorna um url vazio
        const url = location instanceof PathLocationStrategy ? location.path() : ' ';

        const message = error.message ? error.message : error.toString();

        //verifica se for em produção, se sim, ele encaminha para rota de error
        if (environment.production) router.navigate(['/error']);

        StackTrace
            .fromError(error)
            //retorna uma promisse
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');
                //assim a stack é convertida em string
                //no console log abaixo é mostrado o que normalmente é enviado ao servidor como resposta dos erros

                return serverLogService.log({
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString
                }
                ).subscribe(
                    () => console.log('Error logged on server'),
                    err => {
                        console.log(err);
                        console.log('Fail to send error log to server');
                    }
                )
            });
    };

}