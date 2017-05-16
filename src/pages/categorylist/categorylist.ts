import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Category } from '../../app/classes';
import {ToastController } from 'ionic-angular';

import { CategoriesService } from '../../app/categories.service'
import { NewCategoryPage } from '../newcategory/newcategory';

@Component({
  selector: 'page-categorylist',
  templateUrl: 'categorylist.html',
  providers:[CategoriesService]
})
export class CategoryListPage implements OnInit{

  constructor(public navCtrl: NavController, private categoriesService: CategoriesService, private toastCtrl: ToastController) {}

  public categories:Category[];	
	public oldCategories: Category[];
	public modify = false;
	
	//Loading categories from the DB + creating a copy
	ngOnInit(): void{
		//this.categories = this.categoriesService.getCategories();
		this.loadCategories();
	};
	
	loadCategories(){
		this.categoriesService.getCategories().subscribe(
			data => { this.categories = data;
					
					//We copy the category list to be able to "cancel"
					//We do it when the HTTP request is finished.
					this.oldCategories = this.deepClone(this.categories);},
			err => console.error(err),
			() => console.log(this.categories));
	}
	

	//Enable editing for categories
	editCategories(){
		this.modify = true;
	}

	//Cancel editing: we reverse all the changes. We put the copy element in the real element
	cancelEdit(){
		for(let i in this.categories){
			console.log(this.categories[i].label);
			console.log("old: " + this.oldCategories[i].label);
			this.categories[i].label = this.oldCategories[i].label;
		}
		this.modify = false;
	}

	//We delete a category: we sent it to the db and we reload the elements
	deleteCategory(category:Category){
		this.categoriesService.deleteCategory(category).subscribe(
			data => { 
						console.log(data);
						this.loadCategories();
						this.presentToast("A category has been deleted");
					},
			err => {
						this.presentToast("Couldn't delete this category");
						console.error(err);
					},
				
			() => console.log(this.categories));
	};
	
	//We save the element in the database
	saveEdit(categories: Category[]){
		
		for(let category of categories){
			this.categoriesService.editCategory(category).subscribe(
			data => { 
						//console.log(category);
						console.log(data);
			},
			err => console.error(err));
		};
		this.modify = false;
	}

	//Method to copy
	deepClone(oldArray: Object[]) {
    	let newArray: any = [];
    	oldArray.forEach((item) => {
      		newArray.push(Object.assign({}, item));
    	});
    	return newArray;
  	}
	
	goToNewCategory(){
		this.navCtrl.setRoot(NewCategoryPage);
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
