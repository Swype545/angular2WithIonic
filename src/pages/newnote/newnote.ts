import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ToastController } from 'ionic-angular';

import { Note } from '../../app/classes';
import { Category } from '../../app/classes';

import { NotesService } from '../../app/notes.service'
import { CategoriesService } from '../../app/categories.service'

import { NoteListPage } from '../notelist/notelist';

@Component({
  selector: 'page-newnote',
  templateUrl: 'newnote.html',
    providers:[CategoriesService, NotesService]
})
export class NewNotePage implements OnInit {
  
  constructor(private categoriesService: CategoriesService, private notesService: NotesService, public navCtrl: NavController, private toastCtrl: ToastController){}
	public categories: Category[]= [];
	public newNote: Note;
	
	//Initialisation: loading categories + create the new object
	ngOnInit(){
		this.loadCategories();
		this.newNote = new Note(-1, "", "", new Date(), this.categories[0]);
	}

	loadCategories(){
		this.categoriesService.getCategories().subscribe(
			data => { this.categories = data
					  //We Create the newNote object when the categories are loaded
					  this.newNote.category = this.categories[0];
					},
			err => console.error(err),
			() => console.log('done'));
	}
	
	//Check if the form is valid
	isFormValid(){
		if(this.newNote.title.length >= 4 && this.newNote.content.length > 0){
			return true;
		}else{return false;}
	}

	//Add the note in the database
	createNote(){
		this.notesService.addNote(this.newNote).subscribe(
			data => { 	console.log(data); 
						this.navCtrl.setRoot(NoteListPage);
						this.presentToast("A note has been created");
					},
			err => console.error(err));
	}
	
	presentToast(message:string) {
	  let toast = this.toastCtrl.create({
		message: message,
		duration: 3000,
		position: 'top'
	  });

	  toast.onDidDismiss(() => {
		console.log('Dismissed toast');
	  });

	  toast.present();
	}

}
