import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnDestroy {

  public form: FormGroup = new FormGroup({
  });

  public data: any;

  constructor(protected ref: DynamicDialogRef, protected config: DynamicDialogConfig) {
    this.data = config.data;
  }

  protected getControl(name: string): AbstractControl {
    return this.form.get(name) as AbstractControl;
  }

  public submit(): void {
    this.closeModal();
  }

  public closeModal(data?: any): void {
    this.ref.close(data);
  }

  ngOnDestroy(): void {
    if (this.ref) 
      this.ref.close();
  }
}
