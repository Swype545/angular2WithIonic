import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { NoteListPage } from '../pages/notelist/notelist';
import { NoteHandlerComponent } from '../pages/notelist/component/notehandler';
import { NoteEditorComponent } from '../pages/notelist/component/noteeditor';

import { CategoryListPage } from '../pages/categorylist/categorylist';
import { NewCategoryPage } from '../pages/newcategory/newcategory';
import { NewNotePage } from '../pages/newnote/newnote';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	NoteListPage,
	NoteHandlerComponent,
	NoteEditorComponent,	
	CategoryListPage, 
	NewCategoryPage, 
	NewNotePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
	NoteListPage, 
	NoteHandlerComponent,
	NoteEditorComponent,
	CategoryListPage, 
	NewCategoryPage, 
	NewNotePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
