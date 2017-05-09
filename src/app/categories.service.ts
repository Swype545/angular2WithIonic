import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Category } from './classes';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriesService{
	//categories: Category[] = [];
	private apiURL = 'http://localhost/AppWeb/Notepad/web/app_dev.php/note/API/';
	private apiURLAllCategories = this.apiURL+"categories/showAll";
	private apiURLAddCategory = this.apiURL+"categories/create";
	private APIURLDeleteCategory = this.apiURL+"categories/delete";
	private APIURLEditCategory = this.apiURL+"categories/edit";
	
	
	constructor(private http: Http){};
	
	//We load every categories from the database
	getCategories(){
		
		return this.http.get(this.apiURLAllCategories)
			.map((res:Response) => res.json());
		
		//this.categories = [new Category("theBestOne", 1), new Category("theWorstOne", 2)];


		//return this.categories;
	}

	deleteCategory(category: Category){
		//We delete the category from the database
		return this.http.delete(this.APIURLDeleteCategory+"?id="+category.id,{})
			.map((res:Response) => res.json());
	}

	addCategory(category: Category){
		//We add a category in the database
		//alert(this.categories[0].label);
		//We add a note in the database		
		let jsCategory = {
			"label": category.label
		}
		return this.http.post(this.apiURLAddCategory,JSON.stringify(jsCategory),{})
			.map((res:Response) => res.json());
	}

	editCategory(category: Category){
		
			let jsCategory = {
				"id":category.id,
				"label":category.label
			}

			console.log(jsCategory);
			return this.http.put(this.APIURLEditCategory, JSON.stringify(jsCategory), {})
				.map((res:Response) => res.json());
		
	}


}