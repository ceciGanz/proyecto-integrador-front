import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { repeatWhen, Subject, take, takeUntil, tap } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { Experience } from 'src/app/classes/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalExperienceComponent } from '../modal/modal-experience/modal-experience.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {

  experiences: Experience[] = [];

  private ref!: DynamicDialogRef;

  private $subjectRetry: Subject<void> = new Subject<void>();

  private $subjectUnsubscribe: Subject<void> = new Subject<void>();

  public newExperience: Experience = new Experience();

  constructor(private modalService: ModalService, private experienceService: ExperienceService) { 
  }

  ngOnInit(): void {
    this.setNewExperience();
    this.experienceService.list().pipe(takeUntil(this.$subjectUnsubscribe), repeatWhen(() => this.$subjectRetry)).subscribe( data => {
      this.experiences = data;
    });
  }

  private setNewExperience(): void {
    this.newExperience = new Experience();
    this.newExperience.candidato =  new Candidate();
    this.newExperience.candidato.id = 1;
  }

  showModal(e: Experience) {
    this.ref = this.modalService.open(ModalExperienceComponent, e);
    this.ref.onClose.pipe(take(1)).subscribe( data => {
      this.setNewExperience();
      this.$subjectRetry.next();
    });
  }

  delete(id: number) {
    this.modalService.confirm(this.experienceService.deleteById(id).pipe(tap(data => this.$subjectRetry.next())));
  }

  ngOnDestroy(): void {
    this.$subjectUnsubscribe.next();
    this.$subjectUnsubscribe.complete();
    this.$subjectRetry.complete();
  }

}
