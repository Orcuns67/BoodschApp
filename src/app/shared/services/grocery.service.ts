import { Injectable } from '@angular/core';
import { Grocery } from '../model/grocery.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class GroceryService {
constructor(private http: HttpClient){}
url:string = "https://massimo-dn-cors.herokuapp.com/https://syntra.terugsamen.be/swisskebabs/public/api/grocerys";

    getGroceries(): Observable<Grocery[]> {
        return this.http
            .get<Grocery[]>(this.url)
            .pipe(
                tap (result => console.log('onze API:', result))
            )
    }
    getGrocery(id:number) {
        console.log(id);
        return this.http
        .get<Grocery>(this.url+'/'+id)
        .pipe()
    }

    addGrocery(newGrocery:Grocery): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url,newGrocery,{headers:headers});
    }

    updateGrocery(newGrocery:Grocery): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(this.url+'/'+newGrocery.id,newGrocery, {headers:headers});
    }


    deleteGrocery(id: number){
        return this.http.delete(this.url+'/'+id);
    }
    
}