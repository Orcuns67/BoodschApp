import { Injectable } from '@angular/core';
import { Groc } from '../model/groc.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class GrocService {
constructor(private http: HttpClient){}
url:string = "https://massimo-dn-cors.herokuapp.com/https://syntra.terugsamen.be/swisskebabs/public/api/grocs";

    getGrocs(): Observable<Groc[]> {
        return this.http
            .get<Groc[]>(this.url)
            .pipe(
                tap (result => console.log('onze API:', result))
            )
    }
    getGroc(id:number) {
        console.log(id);
        return this.http
        .get<Groc>(this.url+'/'+id)
        .pipe()
    }

    addGroc(newGroc:Groc): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url,newGroc,{headers:headers});
    }

    updateGroc(newGroc:Groc): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(this.url+'/'+newGroc.id,newGroc, {headers:headers});
    }


    deleteGroc(id: number){
        return this.http.delete(this.url+'/'+id);
    }
    
}