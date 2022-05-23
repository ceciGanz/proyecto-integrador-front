import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  public $loadingSubject: BehaviorSubject<boolean>;

  constructor(private loadingService: LoadingService) {
    this.$loadingSubject = loadingService.loadingSubject();
  }

  ngOnInit(): void {}
}
