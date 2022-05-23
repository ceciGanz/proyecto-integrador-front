import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Experience } from 'src/app/classes/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-modal-experience',
  templateUrl: './modal-experience.component.html',
  styleUrls: ['./modal-experience.component.css']
})
export class ModalExperienceComponent extends ModalItemComponent implements OnInit {

  constructor(private experienceService: ExperienceService, protected override ref: DynamicDialogRef, protected override config: DynamicDialogConfig) {
    super(ref, config);
  }
  ngOnInit(): void {
    let e: Experience = this.data as Experience;
    this.form.addControl('cargo', new FormControl(e.cargo, [Validators.required]));
    this.form.addControl('empresa', new FormControl(e.empresa, [Validators.required]));
    this.form.addControl('fecha_desde', new FormControl(e.fechaDesde, [Validators.required]));
    this.form.addControl('actualmente', new FormControl( e.fechaHasta == null || e.fechaHasta == ""));
    this.form.addControl('fecha_hasta', new FormControl(e.fechaHasta));
    this.form.addControl('direccion', new FormControl(e.direccion, [Validators.required]));
  }

  public override submit(): void {
    let e: Experience = this.data;
    e.cargo = this.cargo.value;
    e.empresa = this.empresa.value;
    e.fechaDesde = this.fecha_desde.value;
    e.fechaHasta = this.fecha_hasta.value;
    e.direccion = this.direccion.value;
    if (e.id)
      this.experienceService.edit(e).subscribe( data => this.closeModal());
    else
      this.experienceService.create(e).subscribe( data => this.closeModal());
  }

  get cargo(): AbstractControl {
    return this.getControl('cargo');
  }

  get empresa(): AbstractControl {
    return this.getControl('empresa');
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

  get direccion(): AbstractControl {
    return this.getControl('direccion');
  }

  onChangeCheckbox() {
    if (this.actualmente.value)
      this.fecha_hasta.setValue(null);
  }

}
