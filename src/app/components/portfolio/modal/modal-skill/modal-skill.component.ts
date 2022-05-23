import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Skill } from 'src/app/classes/skill';
import { SkillService } from 'src/app/services/skill.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-modal-skill',
  templateUrl: './modal-skill.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent extends ModalItemComponent implements OnInit {
 
  constructor(private skillService: SkillService, protected override ref: DynamicDialogRef, protected override config: DynamicDialogConfig) {
    super(ref, config);
  }
  ngOnInit(): void {
    let s: Skill = this.data as Skill;
    this.form.addControl('nombre', new FormControl(s.nombre, [Validators.required]));
    this.form.addControl('progreso', new FormControl(s.progreso, [Validators.required]));
  }

  public override submit(): void {
    let s: Skill = this.data;
    s.nombre = this.nombre.value;
    s.progreso = this.progreso.value;
    if (s.id)
      this.skillService.edit(s).subscribe( data => this.closeModal());
    else
      this.skillService.create(s).subscribe( data => this.closeModal());
  }

  get nombre(): AbstractControl {
    return this.getControl('nombre');
  }

  get progreso(): AbstractControl {
    return this.getControl('progreso');
  }

}