import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Project } from 'src/app/classes/project';
import { ProjectService } from 'src/app/services/project.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-modal-project',
  templateUrl: './modal-project.component.html',
  styleUrls: ['./modal-project.component.css']
})
export class ModalProjectComponent extends ModalItemComponent implements OnInit {
 
  constructor(private projectService: ProjectService, protected override ref: DynamicDialogRef, protected override config: DynamicDialogConfig) {
    super(ref, config);
  }
  ngOnInit(): void {
    let e: Project = this.data as Project;
    this.form.addControl('nombre', new FormControl(e.titulo, [Validators.required]));
    this.form.addControl('descripcion', new FormControl(e.descripcion, [Validators.required]));
    this.form.addControl('anio_realizacion', new FormControl(e.fechaRealizacion, [Validators.required]));
  }

  public override submit(): void {
    let e: Project = this.data;
    e.titulo = this.nombre.value;
    e.descripcion = this.descripcion.value;
    e.fechaRealizacion = this.anio_realizacion.value;
    if (e.id)
      this.projectService.edit(e).subscribe( data => this.closeModal());
    else
      this.projectService.create(e).subscribe( data => this.closeModal());
  }

  get nombre(): AbstractControl {
    return this.getControl('nombre');
  }

  get descripcion(): AbstractControl {
    return this.getControl('descripcion');
  }

  get anio_realizacion(): AbstractControl {
    return this.getControl('anio_realizacion');
  }

}