import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Note } from '../../../app/classes';
import { Category } from '../../../app/classes';

@Component({
  selector: 'noteeditor',
  templateUrl: 'noteeditor.html'
})
export class NoteEditorComponent {

	constructor(public navCtrl: NavController){}

	@Input() noteEdit: Note;
	@Input() categories: Category[];
	@Output() closeModify:EventEmitter<any> = new EventEmitter();
	
	
	oldNote: Note;
	
	//We copy the object to the initialisation
	ngOnInit(){
		
		this.oldNote = Object.assign({},this.noteEdit);
		console.log(this.categories[0] == this.noteEdit.category);
	}
	
	isFormValid(){
		//console.log(this.noteEdit.title);
		//console.log(this.oldNote.title);
		if(this.noteEdit.title.length >= 4 && this.noteEdit.content.length > 0){
			return true;
		}else{return false;}
	}
	
	//We send a message to the parent to close the window & to save the note
	SaveNote(noteEdit: Note){
		this.closeModify.emit(noteEdit);
	}
	
	//When canceling, we put the old values in the real object.
	CancelEdit(){
		this.noteEdit.title = this.oldNote.title;
		this.noteEdit.content = this.oldNote.content;
		this.noteEdit.date = this.oldNote.date;
		this.noteEdit.category = this.oldNote.category;
		this.closeModify.emit(this.noteEdit);
	}
}
