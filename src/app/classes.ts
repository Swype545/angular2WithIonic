export class Category{
	public label: string;
	public id: number;
	
	constructor(label:string, id:number){
		this.label = label;
		this.id = id;
	}
}

export class Note{
	public id: number;
	public title: string;
	public content:string;
	public category: Category;
	public date: Date;
	
	constructor(id:number,title:string,content:string, date: Date, category: Category){
		this.id = id;
		this.title = title;
		this.content = content;
		this.date = new Date();	
		this.category = category;
	}
}

