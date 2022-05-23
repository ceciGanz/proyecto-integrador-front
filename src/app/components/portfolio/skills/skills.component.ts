import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { repeatWhen, Subject, take, takeUntil, tap } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { Skill } from 'src/app/classes/skill';
import { ModalService } from 'src/app/services/modal.service';
import { SkillService } from 'src/app/services/skill.service';
import { ModalSkillComponent } from '../modal/modal-skill/modal-skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {

    skills: Skill[] = [];
  
    private ref!: DynamicDialogRef;
  
    private $subjectRetry: Subject<void> = new Subject<void>();
  
    private $subjectUnsubscribe: Subject<void> = new Subject<void>();
  
    public newSkill: Skill = new Skill();
  
    constructor(private modalService: ModalService, private skillService: SkillService) { 
    }
  
    ngOnInit(): void {
      this.setNewSkill();
      this.skillService.list().pipe(takeUntil(this.$subjectUnsubscribe), repeatWhen(() => this.$subjectRetry)).subscribe( data => {
        this.skills = data;
      });
    }
  
    private setNewSkill(): void {
      this.newSkill = new Skill();
      //this.newSkill.nombre = '';
      //this.newSkill.progreso = null;
      this.newSkill.candidato =  new Candidate();
      this.newSkill.candidato.id = 1;
    }
  
    showModal(s: Skill) {
      this.ref = this.modalService.open(ModalSkillComponent, s);
      this.ref.onClose.pipe(take(1)).subscribe( data => {
        this.setNewSkill();
        this.$subjectRetry.next();
      });
    }
  
    delete(id: number) {
      this.modalService.confirm(this.skillService.deleteById(id).pipe(tap(data => this.$subjectRetry.next())));
    }
  
    ngOnDestroy(): void {
      this.$subjectUnsubscribe.next();
      this.$subjectUnsubscribe.complete();
      this.$subjectRetry.complete();
    }
  
  }
  