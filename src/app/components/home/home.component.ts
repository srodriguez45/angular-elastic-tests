import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ElasticService } from '../../services/elastic.service';
import { environment } from './../../../environments/environment'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  obj: any = {
    customer: {},
    customers: [],
    countries: []
  };

  constructor(protected elasticService: ElasticService) { }

  ngOnInit(): void {

    this.getAll(environment.countries);
    this.getAll(environment.customers);

  }

  register(form: NgForm) {
    this.obj.customer = form.value;
    this.sendForm();
  }

  public sendForm() {
    
    this.elasticService.create(environment.customers, this.obj.customer).subscribe(
      () => {
        this.obj.customers.push({ _source: this.obj.customer});
      },
      (error) => {
        console.error(error);
      }
    );   
    
  }

  getAll(index: string) {
    
    this.elasticService.getAll(index).subscribe(
      (data) => {
        this.obj[index] = data['hits'].hits;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  getCount() {
    return this.obj.customers.length;
  }


}
