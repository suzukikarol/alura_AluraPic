import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { startWith } from "rxjs/operators";
import { LOADINGTYPE } from "./loading-type";

@Injectable({ providedIn: 'root' })
export class LoadingService {

    loadingSubject = new Subject<LOADINGTYPE>();

    getLoading() {
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LOADINGTYPE.STOPPED));
    }
    //dessa forma, assim que esse serviço começar, ele irá iniciar com o valor de stopped

    start() {
        this.loadingSubject.next(LOADINGTYPE.LOADING);
    }

    stop() {
        this.loadingSubject.next(LOADINGTYPE.STOPPED);
    }

}