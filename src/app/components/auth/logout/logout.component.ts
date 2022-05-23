import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private navigateService: NavigateService
  ) {}

  ngOnInit(): void {}

  public logout() {
    this.loginService.logout();
    this.navigateService.goLogin();
  }
}
