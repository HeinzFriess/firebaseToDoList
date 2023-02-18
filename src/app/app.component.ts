import { Component } from '@angular/core';
import { collection, Firestore, collectionData, setDoc, doc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toDos$: Observable<any[]>;
  todoText:string = '';
  todoName:string = '';
  
  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'todos');
    this.toDos$ = collectionData(coll);

    this.toDos$.subscribe(()=> {
      //hier kann eine Beliebige Funktion aufgerufen werden jedes mal wenn sich ein db Eintrag ändert
    })
  }

  addToDo(){
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), {name: this.todoName, text: this.todoText});
    this.todoName = '';
    this.todoText = '';
  }
  
}
