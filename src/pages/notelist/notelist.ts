import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Note } from '../../app/classes';
import { Category } from '../../app/classes';

import { NoteHandlerComponent } from './notelist/component/notehandler';
import { NoteEditorComponent } from './notelist/component/noteeditor';

import { NotesService } from '../../app/notes.service'
import { CategoriesService } from '../../app/categories.service'
@Component({
  selector: 'page-notelist',
  templateUrl: 'notelist.html',
  providers:[NotesService, CategoriesService]
})
export class NoteListPage implements OnInit {

	public notes:Note[];
	public categories:Category[];
	constructor(public navCtrl: NavController, private notesService: NotesService, private categoriesService: CategoriesService){}
	
	//We load the categories and the notes from the DB at the initialisation
	ngOnInit(): void{

		this.loadNotes();
		this.loadCategories();
		//this.categories = this.categoriesService.getCategories();

	};

	loadNotes(){
		this.notesService.getNotes().subscribe(
			data => { this.notes = data },
			err => console.error(err),
			() => console.log(this.notes));

	}
	
	loadCategories(){
		this.categoriesService.getCategories().subscribe(
			data => { this.categories = data },
			err => console.error(err),
			() => console.log('done'));
	}
	
	//We delete the note the children sent
	deleteNote(note: Note){
		this.notesService.deleteNote(note).subscribe(
			data => { 
						console.log(data);
						this.loadNotes();
					},
			err => console.error(err),
			() => console.log('done'));
	}

	saveNote(note:Note){
		this.notesService.editNote(note).subscribe(
			data => { 
						console.log(data); 
						this.loadNotes();
					},
			err => console.error(err),
			() => console.log('done'));
	}
}
