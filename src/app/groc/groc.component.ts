import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Groc } from '../shared/model/groc.model';
import { GrocService } from '../shared/services/groc.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-groc',
  templateUrl: './groc.component.html',
  styleUrls: ['./groc.component.css']
})
export class GrocComponent implements OnInit {
  // alle vars mooi netjes oplijsten, en de addgroc komt van mijn ngModel
  addGroc:string;
  statusGroc:boolean = false;
  notification:string;
  // ASYNC CONCEPT GEBRUIKEN: Converteren van grocs naar een observable (vergeet de import niet boven)
  Grocs$:Observable<Groc[]>;
  Groc$:Observable<Groc>;
  constructor(
    private grocService:GrocService,
    private toastr: ToastrService
    ) {
    // hier doen de initialisatie om deze dan te kunnen opvullen
  //  this.grocs = [
  //    new groc (1, 'belgium', true)
  //  ];
   }
  ngOnInit(): void {
   // de observable gaan opvullen met de methode uit de service...
   this.Grocs$ = this.grocService.getGrocs();
  }
  getGroc(id: number){
    this.Groc$ = this.grocService.getGroc(id)
  }
  addNewGroc(){
    console.log(this.addGroc);
    const newGroc = new Groc(null, this.addGroc, this.statusGroc);
    this.grocService.addGroc(newGroc)
    .subscribe ((addedGroc: Groc) => {
      // items opnieuw ophalen in de subscription
      this.Grocs$ = this.Grocs$ = this.grocService.getGrocs();
    });
  }
  updateGroc(id: number, name: string) {
   // console.log(id,name);
   // het grote verschil met de addNew, is dat we hier ook de id kennen en meegeven in ons object...
   const newGroc = new Groc(id, name, true);
   this.grocService.updateGroc(newGroc).subscribe ((addedGroc: Groc) => {
    this.Grocs$ = this.Grocs$ = this.grocService.getGrocs();
  });
  }
  deleteGroc(id: number, name: string){
     this.grocService.deleteGroc(id)
     .subscribe ((addedGroc: Groc) => {
      this.Grocs$ = this.Grocs$ = this.grocService.getGrocs();
      });
     this.toastr.success('Great', 'Another item done!');
  }
}