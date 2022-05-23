import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { repeatWhen, Subject, take, takeUntil, tap } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { Project } from 'src/app/classes/project';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';
import { ModalProjectComponent } from '../modal/modal-project/modal-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects: Project[] = [];

  private ref!: DynamicDialogRef;

  private $subjectRetry: Subject<void> = new Subject<void>();

  private $subjectUnsubscribe: Subject<void> = new Subject<void>();

  public newProject: Project = new Project();

  constructor(private modalService: ModalService, private projectService: ProjectService) { 
  }

  ngOnInit(): void {
    this.setNewProject();
    this.projectService.list().pipe(takeUntil(this.$subjectUnsubscribe), repeatWhen(() => this.$subjectRetry)).subscribe( data => {
      this.projects = data;
    });
  }

  private setNewProject(): void {
    this.newProject = new Project();
    this.newProject.titulo = '';
    this.newProject.descripcion = '';
    this.newProject.candidato =  new Candidate();
    this.newProject.candidato.id = 1;
  }

  showModal(e: Project) {
    this.ref = this.modalService.open(ModalProjectComponent, e);
    this.ref.onClose.pipe(take(1)).subscribe( data => {
      this.setNewProject();
      this.$subjectRetry.next();
    });
  }

  delete(id: number) {
    this.modalService.confirm(this.projectService.deleteById(id).pipe(tap(data => this.$subjectRetry.next())));
  }

  ngOnDestroy(): void {
    this.$subjectUnsubscribe.next();
    this.$subjectUnsubscribe.complete();
    this.$subjectRetry.complete();
  }

}
