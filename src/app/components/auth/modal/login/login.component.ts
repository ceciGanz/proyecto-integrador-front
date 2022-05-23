import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  @Input()
  show: boolean = false;

  @Output() 
  showChange = new EventEmitter();

  constructor(private loginService: LoginService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  get user(): AbstractControl {
    return this.loginForm.get('user') as any;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password') as any;
  }

  login() {
    this.loginService
      .login(this.user.value, this.password.value)
      .pipe(take(1))
      .subscribe((data: boolean) => {
        if (data)
          this.closeModal();
        else
          this.showError();
      });
  }

  closeModal() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
  }

}
