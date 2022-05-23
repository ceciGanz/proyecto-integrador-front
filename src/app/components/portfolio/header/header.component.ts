import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { switchMap, take } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { ImageService } from 'src/app/services/image.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalDataComponent } from '../modal/modal-data/modal-data.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  displayModal: boolean = false;

  @Input()
  public candidate: Candidate = new Candidate();

  private ref!: DynamicDialogRef;

  constructor(
    private imageService: ImageService,
    private modalService: ModalService,
    private candidateService: CandidateService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.candidateService
      .getById(1)
      .pipe(
        take(1),
        switchMap((c: Candidate) => {
          this.candidate = c;
          return this.imageService.get(c.profileImage).getDownloadURL().pipe(take(1));
        })
      )
      .subscribe({
        next: (url: string) => ( this.candidate.urlProfileImage = url ),
        error: (error: any) => {
          if (error.code === 'storage/object-not-found') {
            this.candidate.urlProfileImage =
              '/assets/images/sin_foto_perfil.jpeg';
          }
        },
      });
  }

  showModal(c: Candidate) {
    this.ref = this.modalService.open(ModalDataComponent, this.candidate);
    this.ref.onClose.pipe(take(1)).subscribe((data) => {
      this.candidate = data as Candidate;
    });
  }

  showModalLogin() {
    this.displayModal = true;
  }

  public logout() {
    this.loginService.logout();
  }

}
