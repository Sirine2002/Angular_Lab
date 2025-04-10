import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Modeles/Member';

@Injectable({ //décorateur: ken mafamech on peut pas l'utiliser à l'extérieur dans les composants ou services => injectable
  //décorateur qui permet d'indiquer que le service accepte d'etre injecter (utilisé) dans autres services ou dans des composants.
  providedIn: 'root'
})
export class MemberService {
  constructor(private http:HttpClient) { }//nom objet : type

  //fct qui envoie une requete en mode GET vers le backend
  GetAllMembers():Observable<Member[]> {
    return this.http.get<Member[]>('http://localhost:3000/members')
  }
  addMember(member:Member):Observable<void>{
    return this.http.post<void>('http://localhost:3000/members',member)
  }
  deleteMemberById(id: String): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/members/${id}`);
  }
  GetMemberById(id: String): Observable<Member> {
    return this.http.get<Member>(`http://localhost:3000/members/${id}`);
  }
  updateMember(id: String,member:Member): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/members/${id}`,member);
  }
}
