import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NavController } from 'ionic-angular';

import { Note } from '../../../app/classes';
import { Category } from '../../../app/classes';

@Component({
  selector: 'notehandler',
  templateUrl: 'notehandler.html'
})
export class NoteHandlerComponent {

  constructor(public navCtrl: NavController) {}
	@Input() note: Note;
	@Input() categories: Category[];
	@Output() deleteNote:EventEmitter<any> = new EventEmitter();
	@Output() saveNote:EventEmitter<any> = new EventEmitter();

	modifying = false;

	//We close the window and we send a message to the parent to save the note
	closeModify(note:Note){
		this.modifying = false;
		console.log(note);
		this.saveNote.emit(note);
	}
	
	//we send a message to the parent to delete the note
	delNote(note: Note){
		this.deleteNote.emit(note);
	}
}
