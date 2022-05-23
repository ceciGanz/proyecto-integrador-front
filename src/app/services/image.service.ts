import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly basePath = '/uploads';

  constructor(
    private storage: AngularFireStorage
  ) { }

  upload(filename: string, file: File): AngularFireUploadTask {
    filename = `${this.basePath}/${filename}`;
    return this.storage.upload(filename, file);
  }

  get(filename: string): AngularFireStorageReference {
    filename = `${this.basePath}/${filename}`;
    return this.storage.ref(filename);
  }
}
