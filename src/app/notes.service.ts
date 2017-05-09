import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Note } from './classes';
import { Category } from './classes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { CategoriesService } from './categories.service'



@Injectable()
export class NotesService{
	//Resolve HTTP using the constructor
	constructor(private http: Http, private categoriesService: CategoriesService){}; //private categoriesService: CategoriesService

	//variable initialisation
	private apiURL = 'http://localhost/AppWeb/Notepad/web/app_dev.php/note/API/';
	private apiURLAllNotes = this.apiURL+"notes/showAll";
	private apiURLAddNote = this.apiURL+"notes/create";
	private apiURLEditNote = this.apiURL+"notes/edit";
	private apiURLDeleteNote = this.apiURL+"notes/delete";

	
	//Method to load notes from API
	getNotes(){
		//We use get request to load elements
		return this.http.get(this.apiURLAllNotes)
			.map((res:Response) => res.json());
	}

	deleteNote(note: Note){
		//We delete the note in the database
		return this.http.delete(this.apiURLDeleteNote+"?id="+note.id,{})
			.map((res:Response) => res.json());
	}

	addNote(note: Note){
		//We add a note in the database		
		let jsNote = {
			"title": note.title,
			"content": note.content,
			"category": note.category.id
		}
		return this.http.post(this.apiURLAddNote,JSON.stringify(jsNote),{})
			.map((res:Response) => res.json());
	}

	editNote(note: Note){
		//We modify a note in the database
		let jsNote = {
			"id":note.id,
			"title": note.title,
			"content": note.content,
			"category": note.category.id
		}
		console.log(jsNote);
		return this.http.put(this.apiURLEditNote, JSON.stringify(jsNote), {})
			.map((res:Response) => res.json());
	}
}