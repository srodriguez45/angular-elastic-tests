import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ElasticService } from 'src/app/services/elastic.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [ElasticService]
    })
    .compileComponents();
  }));

  beforeEach( async(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    elasticService = TestBed.get(ElasticService);
    fixture.detectChanges();
    
    spyOn(elasticService, 'getAll').and.callFake((someParam) => {
      if(someParam == "customers") {
        return of(customers)
      } else {
        return of(countries)
      }
    });

  }));


  it('Customers verification', async(() => {

    component.ngOnInit();
    fixture.detectChanges();
    console.log("El componente trae el valor: " + component.getCount());
    expect(component.getCount()).toEqual(6);
    expect(component.obj.customers.length).toEqual(6);

  }));

  it('Countries verification', async(() => {
    
    component.ngOnInit();
    fixture.detectChanges();
    console.log("El componente trae el valor: " + component.getCount());
    expect(component.obj.countries.length).toEqual(3);

  }));

  it('Register Form should be called', fakeAsync(() => {
    
    spyOn(component, 'register');
  
    component.ngOnInit();
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    
    expect(component.register).toHaveBeenCalled();
  
  }));

  it('Form should be called', fakeAsync(() => {
    
    spyOn(component, 'sendForm');
  
    component.ngOnInit();
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
   
    expect(component.sendForm).toHaveBeenCalled();
  
  }));

  it('Load table list should be called', async(() => {
    
    spyOn(component, 'getAll');
    component.ngOnInit();
    fixture.detectChanges();   
    expect(component.getAll).toHaveBeenCalled();
  
  }));


});