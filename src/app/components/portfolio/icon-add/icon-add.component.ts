import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-icon-add',
  templateUrl: './icon-add.component.html',
  styleUrls: ['./icon-add.component.css']
})
export class IconAddComponent implements OnInit {

  @Output() 
  addItemEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  add() {
    this.addItemEvent.emit();
  }

}
