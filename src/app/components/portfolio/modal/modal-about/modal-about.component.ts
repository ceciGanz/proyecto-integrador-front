import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-modal-about',
  templateUrl: './modal-about.component.html',
  styleUrls: ['./modal-about.component.css']
})
export class ModalAboutComponent extends ModalItemComponent implements OnInit {
  
  constructor(private candidateService: CandidateService, protected override ref: DynamicDialogRef, protected override config: DynamicDialogConfig) {
    super(ref, config);
  }

  ngOnInit(): void {
    let e:  Candidate = this.data as Candidate;
    this.form.addControl('acerca_de', new FormControl(e.descripcion, [Validators.required]));
  }

  public override submit(): void {
    let e: Candidate = this.data;
    e.descripcion = this.acerca_de.value;
    if (e.id)
      this.candidateService.edit(e).subscribe( data => this.closeModal(e));
    else
      this.candidateService.create(e).subscribe( data => this.closeModal(e));
  }

  get acerca_de(): AbstractControl {
    return this.getControl('acerca_de');
  }

}
