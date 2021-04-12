import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotFoundComponent],
  providers: [
    {
      provide: ErrorHandler,//estou fazendo um de-para dizendo que no lugar do Error Handle padrão do Angular
      useClass: GlobalErrorHandler//vou usar o Error Handle criado por mim
    }
  ]
})
export class ErrorsModule { }
