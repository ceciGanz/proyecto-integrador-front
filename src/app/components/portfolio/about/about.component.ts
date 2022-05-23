import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalAboutComponent } from '../modal/modal-about/modal-about.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input()
  public candidate: Candidate = new Candidate();

  private ref!: DynamicDialogRef;

  constructor(private modalService: ModalService, private candidateService: CandidateService) { 
  }

  ngOnInit(): void {
  }

  showModal(c: Candidate) {
    this.ref = this.modalService.open(ModalAboutComponent, this.candidate);
    this.ref.onClose.pipe(take(1)).subscribe( data => {
      this.candidate = data as Candidate;
    });
  }

}
