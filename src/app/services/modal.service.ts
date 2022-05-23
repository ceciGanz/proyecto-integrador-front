import { Injectable, Type } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private config: DynamicDialogConfig = {
    showHeader: false,
    width: '50%',
    contentStyle: {"max-height": "500px", "overflow": "auto"},
    baseZIndex: 10000
  };
  constructor(private dialogService: DialogService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  open(componentType: Type<any>, data: any): DynamicDialogRef {
    this.config.data = data;
    return this.dialogService.open(componentType, this.config) ;
  }
   
  confirm($observableAccept: Observable<any>): void {
      this.confirmationService.confirm({
          message: '¿Estas seguro que deseas borrar este registro?',
          header: 'Confirmar borrado',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              $observableAccept.pipe(take(1)).subscribe( data => {
                this.messageService.add({severity:'info', summary:'Registro borrado', detail:''});
              });
          },
          reject: (type: any) => {
              switch(type) {
                  case ConfirmEventType.REJECT:
                      //this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                  break;
                  case ConfirmEventType.CANCEL:
                      //this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                  break;
              }
          }
      });
  }


}
