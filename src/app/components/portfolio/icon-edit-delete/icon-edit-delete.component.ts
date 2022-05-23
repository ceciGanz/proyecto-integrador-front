import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-icon-edit-delete',
  templateUrl: './icon-edit-delete.component.html',
  styleUrls: ['./icon-edit-delete.component.css']
})
export class IconEditDeleteComponent implements OnInit {

  @Output() 
  editItemEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output() 
  deleteItemEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  edit() {
    this.editItemEvent.emit();
  }

  delete() {
    this.deleteItemEvent.emit();
  }

}
