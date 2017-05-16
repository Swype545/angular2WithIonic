import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ToastController } from 'ionic-angular';

import { Category } from '../../app/classes';
import { CategoriesService } from '../../app/categories.service'

import { CategoryListPage } from '../categorylist/categorylist';

@Component({
  selector: 'page-newcategory',
  templateUrl: 'newcategory.html',
    providers:[CategoriesService]
})
export class NewCategoryPage implements OnInit {

  public newCategory:Category;

	constructor(private categoriesService: CategoriesService, public navCtrl: NavController, private toastCtrl: ToastController){}
	
	//Creating the new category
	ngOnInit(){
		this.newCategory = new Category("", -1);
	}

	//Check if the form is valid
	isFormValid(){
		if(this.newCategory.label.length >= 4){
			return true;	
		}else{return false;}
	}

	//We create a category in the database
	createCategory(){
		
		this.categoriesService.addCategory(this.newCategory).subscribe(
			data => { 
						console.log(data); 
						this.navCtrl.setRoot(CategoryListPage);
						this.presentToast("A category has been created");
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
