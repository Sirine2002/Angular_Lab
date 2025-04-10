import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/Modeles/Evt';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { } 
  GetAllEvent():Observable<Evt[]>{
    return this.http.get<Evt[]>("http://localhost:3000/Evt")
  }
  addEvent(event:Evt):Observable<void>{
    return this.http.post<void>("http://localhost:3000/Evt",event)
  }
  getEventById(id:string):Observable<Evt>{
    return this.http.get<Evt>(`http://localhost:3000/Evt/${id}`)
  }
  updateEvent(event:Evt,id:string):Observable<void>{
    return this.http.put<void>(`http://localhost:3000/Evt/${id}`,event)
  }
  deleteEvent(id:string):Observable<void>{
    return this.http.delete<void>(`http://localhost:3000/Evt/${id}`)
  }
}
