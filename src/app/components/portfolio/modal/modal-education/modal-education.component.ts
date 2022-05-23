import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Education } from 'src/app/classes/education';
import { EducationService } from 'src/app/services/education.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-modal-education',
  templateUrl: './modal-education.component.html',
  styleUrls: ['./modal-education.component.css']
})
export class ModalEducationComponent extends ModalItemComponent implements OnInit {
  
  constructor(private educationService: EducationService, protected override ref: DynamicDialogRef, protected override config: DynamicDialogConfig) {
    super(ref, config);
  }
  ngOnInit(): void {
    let e: Education = this.data as Education;
    this.form.addControl('universidad', new FormControl(e.nombreUniversidad, [Validators.required]));
    this.form.addControl('carrera', new FormControl(e.carrera, [Validators.required]));
    this.form.addControl('fecha_desde', new FormControl(e.fechaDesde, [Validators.required]));
    this.form.addControl('actualmente', new FormControl( e.fechaHasta == null || e.fechaHasta == ""));
    this.form.addControl('fecha_hasta', new FormControl(e.fechaHasta));
  }

  public override submit(): void {
    let e: Education = this.data;
    e.nombreUniversidad = this.universidad.value;
    e.carrera = this.carrera.value;
    e.fechaDesde = this.fecha_desde.value;
    e.fechaHasta = this.fecha_hasta.value;
    if (e.id)
      this.educationService.edit(e).subscribe( data => this.closeModal());
    else
      this.educationService.create(e).subscribe( data => this.closeModal());
  }

  get universidad(): AbstractControl {
    return this.getControl('universidad');
  }

  get carrera(): AbstractControl {
    return this.getControl('carrera');
  }

  get fecha_desde(): AbstractControl {
    return this.getControl('fecha_desde');
  }

  get actualmente(): AbstractControl {
    return this.getControl('actualmente');
  }

  get fecha_hasta(): AbstractControl {
    return this.getControl('fecha_hasta');
  }

  onChangeCheckbox() {
    if (this.actualmente.value)
      this.fecha_hasta.setValue(null);
  }

}
