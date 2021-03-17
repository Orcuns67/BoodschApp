import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../shared/model/grocery.model';
import { GroceryService } from '../shared/services/grocery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  // alle vars mooi netjes oplijsten, en de addgrocery komt van mijn ngModel
  addGrocery:string;
  statusGrocery:boolean = false;
  notification:string;
  // ASYNC CONCEPT GEBRUIKEN: Converteren van grocerys naar een observable (vergeet de import niet boven)
  Grocerys$:Observable<Grocery[]>;
  Grocery$:Observable<Grocery>;

  constructor(
    private groceryService:GroceryService,
    private toastr: ToastrService
    ) {
    // hier doen de initialisatie om deze dan te kunnen opvullen
  //  this.grocerys = [
  //    new grocery (1, 'belgium', true)
  //  ];
   }

  ngOnInit(): void {
   // de observable gaan opvullen met de methode uit de service...

   this.Grocerys$ = this.groceryService.getGrocerys();
  }

  getGrocery(id: number){
    this.Grocery$ = this.groceryService.getGrocery(id)
  }

  addNewGrocery(){
    console.log(this.addGrocery);
    const newGrocery = new Grocery(null, this.addGrocery, this.statusGrocery);
    this.groceryService.addGrocery(newGrocery)
    .subscribe(data => console.log(data));
    // nieuwe toto's terug auto ophalen na post
    this.Grocerys$ = this.groceryService.getGrocerys();
  }

  updateGrocery(id: number, name: string) {
   // console.log(id,name);
   // het grote verschil met de addNew, is dat we hier ook de id kennen en meegeven in ons object...
   const newGrocery = new Grocery(id, name, true);
   this.groceryService.updateGrocery(newGrocery).subscribe(data => console.log(data));
   this.Grocerys$ = this.groceryService.getGrocerys();
  }

  deleteGrocery(id: number){
     this.groceryService.deleteGrocery(id).subscribe(data => console.log(data));
     this.toastr.success('Great', 'Another item done!');
  }

}
