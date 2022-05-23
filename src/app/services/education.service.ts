import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../classes/education';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends HttpService<Education> {

  public list(): Observable<Education[]> {
    return this.getAll("/lista-educacion");
  }

  public create(e: Education): Observable<Education>{
    return this.postOne("/agregar-educacion", e);
  }

  public edit(e: Education): Observable<Education>{
    return this.putOne("/educacion-modificar/" + e.id, e);
  }

  public deleteById(id: number): Observable<Education> {
    return this.deleteOne("/educacion-eliminar/" + id, {} as Education);
  }

}
