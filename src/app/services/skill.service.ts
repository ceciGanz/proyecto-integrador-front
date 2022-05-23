import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../classes/skill';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends HttpService<Skill> {

  public list(): Observable<Skill[]> {
    return this.getAll("/lista-habilidad");
  }

  public create(s: Skill): Observable<Skill>{
    return this.postOne("/agregar-habilidad", s);
  }

  public edit(e: Skill): Observable<Skill>{
    return this.putOne("/modificar-habilidad/" + e.id, e);
  }

  public deleteById(id: number): Observable<Skill> {
    return this.deleteOne("/educacion-habilidad/" + id, {} as Skill);
  }

}
