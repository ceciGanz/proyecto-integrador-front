import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-icon-edit',
  templateUrl: './icon-edit.component.html',
  styleUrls: ['./icon-edit.component.css']
})
export class IconEditComponent implements OnInit {

  @Output() 
  editItemEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  edit() {
    this.editItemEvent.emit();
  }

}
