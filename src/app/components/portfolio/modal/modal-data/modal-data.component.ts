import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { ImageService } from 'src/app/services/image.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.component.html',
  styleUrls: ['./modal-data.component.css']
})
export class ModalDataComponent extends ModalItemComponent implements OnInit {
  
  uploadedFiles: any[] = [];

  selectedFile : File = {} as File;

  urlProfileImage: string = "";

  constructor(private imageService: ImageService, private candidateService: CandidateService, protected override ref: DynamicDialogRef, protected override config: DynamicDialogConfig) {
    super(ref, config);
  }

  ngOnInit(): void {
    let c: Candidate = this.data as Candidate;
    this.form.addControl('nombre', new FormControl(c.nombre, [Validators.required, Validators.minLength(4)]));
    this.form.addControl('apellido', new FormControl(c.apellido, [Validators.required, Validators.minLength(4)]));
    this.form.addControl('titulo', new FormControl(c.titulo, [Validators.required]));
    this.form.addControl('direccion', new FormControl(c.direccion, [Validators.required]));
    this.urlProfileImage = c.urlProfileImage;
  }

  public override submit(): void {
    let c: Candidate = this.data;
    c.nombre = this.nombre.value;
    c.apellido = this.apellido.value;
    c.titulo = this.titulo.value;
    c.direccion = this.direccion.value;
    c.profileImage = this.selectedFile.name;
    if (c.id) {
      this.candidateService.edit(c).pipe(take(1)).subscribe( (data: Candidate) => {
        this.onSubscribeSaveUpdate(data);
      });
    } else {
      this.candidateService.create(c).pipe(take(1)).subscribe( (data: Candidate) => {
        this.onSubscribeSaveUpdate(data);
      });
    }
  }

  private onSubscribeSaveUpdate(data: Candidate): void {
    data.urlProfileImage = this.urlProfileImage;
    this.imageService.upload(this.selectedFile.name, this.selectedFile);
    this.closeModal(data);
  }

  get nombre(): AbstractControl {
    return this.getControl('nombre');
  }

  get apellido(): AbstractControl {
    return this.getControl('apellido');
  }

  get titulo(): AbstractControl {
    return this.getControl('titulo');
  }

  get direccion(): AbstractControl {
    return this.getControl('direccion');
  }

  /*
  onUpload(event: any) {
    for(let file of event.files)
      this.uploadedFiles.push(file);
  }

  onBeforeUpload(event: any) {
    this.imageService.upload(this.selectedFile.name,this.selectedFile);

  }

  onSelect(event: any){
    console.log(event);
    this.selectedFile = <File> event.files[0];

    var reader = new FileReader();
    reader.onload = (event) => { 
      this.urlProfileImage = reader.result as string; 
    }
    reader.readAsDataURL(this.selectedFile); 
  }
  */

  onSelectImage(event: any) {
    this.selectedFile = <File> event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      this.urlProfileImage = reader.result as string; 
    }
    reader.readAsDataURL(this.selectedFile);
  }
}