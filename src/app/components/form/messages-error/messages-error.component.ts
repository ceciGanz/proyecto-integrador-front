import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-messages-error',
  templateUrl: './messages-error.component.html',
  styleUrls: ['./messages-error.component.css']
})
export class MessagesErrorComponent implements OnInit {

  @Input()
  control: AbstractControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
