import { ComponentFixture, TestBed, async, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ElasticService } from 'src/app/services/elastic.service';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let elasticService: ElasticService;
  let customers = {
    "hits": {
        "hits": [
            {
                "_source": {
                    "name": "Julieth",
                    "lastname": "Pinto",
                    "phone": "3331123354",
                    "country": "PE",
                    "newClient": true,
                    "product": "Bonos",
                    "dni": 12349
                }
            },
            {
                "_source": {
                    "name": "Laura",
                    "lastname": "Rodríguez Rico",
                    "phone": "3233121125",
                    "country": "CO",
                    "newClient": true,
                    "product": "CDT",
                    "dni": 123456
                }
            },
            {
                "_source": {
                    "name": "Jaime",
                    "lastname": "Rodríguez",
                    "dni": 87885537,
                    "phone": 314553883
                }
            },
            {
                "_source": {
                    "name": "Maria",
                    "lastname": "Sierra",
                    "dni": 54545385,
                    "phone": 3100234548
                }
            },
            {
                "_source": {
                    "name": "Katerine",
                    "lastname": "Rodriguez",
                    "dni": 543367547,
                    "phone": 31335544
                }
            },
            {
                "_source": {
                    "name": "Jair",
                    "lastname": "Bermudez",
                    "dni": 354395584,
                    "phone": 335538346,
                    "country": "US"
                }
            }
        ]
    }
  };
  let countries = {
    "hits": {
        "hits": [
            {
                "_source": {
                    "name": "Peru",
                    "country_code": "PE",
                    "currency": "PEN",
                    "continent": "America",
                    "capital": "Lima"
                }
            },
            {
                "_source": {
                    "name": "Colombia",
                    "country_code": "CO",
                    "currency": "COP",
                    "continent": "America",
                    "capital": "Bogotá"
                }
            },
            {
                "_source": {
                    "name": "United States",
                    "country_code": "US",
                    "currency": "USD",
                    "continent": "America",
                    "capital": "Washington"
                }
            }
        ]
    }
  };
  let customer = {
    name: "Jair",
    lastname: 'Rodriguez',
    phone: '12345456',
    dni: '1234566',
    country: 'CO'
  };
  let responseCreateCustomer: any = {
    "_index": "customers",
    "_type": "_doc",
    "_version": 1,
    "result": "created",
    "_seq_no": 1,
    "_primary_term": 2
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [ElasticService]
    })
    .compileComponents();

  }));

  beforeEach( async(() => {
    
    // mock response
    elasticService = TestBed.inject(ElasticService);

    spyOn(elasticService, 'getAll').and.callFake((path) => {
      if(path == 'customers') {
        return of(customers);
      } else {
        return of(countries);
      }
    });

    spyOn(elasticService, 'create').and.callFake((path) => {
      if(path == 'customers') {
        return of(responseCreateCustomer);
      }
    }).and.callThrough();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  }));


  it('Customers verification', waitForAsync(() => {

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.getCount()).toEqual(6);
    expect(component.obj.customers.length).toEqual(6);

  }));

  it('Countries verification', async(() => {
    
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.obj.countries.length).toEqual(3);

  }));

  it('Register Form should be called', async(() => {
    
    spyOn(component, 'register').and.callThrough();
  
    component.ngOnInit();
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    
    expect(component.register).toHaveBeenCalled();
  
  }));

  it('Form should be called', fakeAsync(() => {
    
    spyOn(component, 'sendForm').and.callThrough();
  
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    component.ngOnInit();
    fixture.detectChanges();
   
    expect(component.sendForm).toHaveBeenCalled();
  
  }));

  it('Load table list should be called', async(() => {
    
    spyOn(component, 'getAll').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();   
    expect(component.getAll).toHaveBeenCalled();
    
  }));
  

});