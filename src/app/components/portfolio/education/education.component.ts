import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { repeatWhen, Subject, take, takeUntil, tap } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { Education } from 'src/app/classes/education';
import { EducationService } from 'src/app/services/education.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalEducationComponent } from '../modal/modal-education/modal-education.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educations: Education[] = [];

  private ref!: DynamicDialogRef;

  private $subjectRetry: Subject<void> = new Subject<void>();

  private $subjectUnsubscribe: Subject<void> = new Subject<void>();

  public newEducation: Education = new Education();

  constructor(private modalService: ModalService, private educationService: EducationService) { 
  }

  ngOnInit(): void {
    this.setNewEducation();
    this.educationService.list().pipe(takeUntil(this.$subjectUnsubscribe), repeatWhen(() => this.$subjectRetry)).subscribe( data => {
      this.educations = data;
    });
  }

  private setNewEducation(): void {
    this.newEducation = new Education();
    this.newEducation.candidato =  new Candidate();
    this.newEducation.candidato.id = 1;
  }

  showModal(e: Education) {
    this.ref = this.modalService.open(ModalEducationComponent, e);
    this.ref.onClose.pipe(take(1)).subscribe( data => {
      this.setNewEducation();
      this.$subjectRetry.next();
    });
  }

  delete(id: number) {
    this.modalService.confirm(this.educationService.deleteById(id).pipe(tap(data => this.$subjectRetry.next())));
  }

  ngOnDestroy(): void {
    this.$subjectUnsubscribe.next();
    this.$subjectUnsubscribe.complete();
    this.$subjectRetry.complete();
  }

}
