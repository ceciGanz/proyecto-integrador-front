import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from './services/login.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}
  private showHideMyIcon(isLogged: boolean) {
    if (isLogged) 
      $('.myIcon').show();
    else 
      $('.myIcon').hide();
  }

  ngAfterViewInit(): void {
    $(document).ready(() => {
      this.loginService
        .loggedSubject()
        .pipe(takeUntil(this.$unsubscribe))
        .subscribe((isLogged: boolean) => {
          //this.showHideMyIcon(isLogged);
        });
      
    });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
