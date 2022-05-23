import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { take } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  public candidate: Candidate = new Candidate();

  constructor(
    private primengConfig: PrimeNGConfig,
    private candidateService: CandidateService
  ) {
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.candidateService
      .getById(1)
      .pipe(take(1))
      .subscribe({
        next: (data: Candidate) => this.candidate = data,
        error: (error: any) => console.error(error),
      });
  }
}
