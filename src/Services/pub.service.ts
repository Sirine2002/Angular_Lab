import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pub } from 'src/Modeles/Pub';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(private http:HttpClient) { }
  GetAllPubs():Observable<Pub[]> {
    return this.http.get<Pub[]>('http://localhost:3000/Pub')
  }
  addPub(pub:Pub):Observable<void>{
    return this.http.post<void>('http://localhost:3000/Pub',pub)
  }
  deletePubById(id: String): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/Pub/${id}`);
  } 
  GetPubById(id: String): Observable<Pub> {
    return this.http.get<Pub>(`http://localhost:3000/Pub/${id}`);
  }
  updatePub(id: String,pub:Pub): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/Pub/${id}`,pub);
  }
}
