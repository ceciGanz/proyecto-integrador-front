import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../classes/project';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends HttpService<Project> {

  public list(): Observable<Project[]> {
    return this.getAll("/lista-proyecto");
  }

  public create(e: Project): Observable<Project>{
    return this.postOne("/agregar-proyecto", e);
  }

  public edit(e: Project): Observable<Project>{
    return this.putOne("/editar-proyecto/" + e.id, e);
  }

  public deleteById(id: number): Observable<Project> {
    return this.deleteOne("/eliminar-proyecto/" + id, {} as Project);
  }

}
