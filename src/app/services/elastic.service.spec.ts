import { TestBed, async } from '@angular/core/testing';
import { ElasticService } from './elastic.service';
import { HttpClientModule } from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ElasticService', () => {
  
  let service: ElasticService;
  let countries: any = {
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

  let responseCreateCustomer: any = {
    "_index": "customers",
    "_type": "_doc",
    "_version": 1,
    "result": "created",
    "_seq_no": 1,
    "_primary_term": 2
  };
  let requestCreateCustomer: any = {
    "name": "Javier",
    "lastname": "Mendez",
    "phone": "3233121125",
    "country": "CO",
    "newClient": true,
    "product": "CDT",
    "dni": 123456
  };
  
  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule],
          providers: [ElasticService]
      });
      service = TestBed.get(ElasticService);

      spyOn(service, 'create').and.returnValues(of(responseCreateCustomer));

  });

  it('GetAll countries from elasticService', (done: DoneFn) => {
    
    service.getAll("countries").subscribe(res => {
      expect(res).toEqual(countries);
      done();
    });

  });

  it('Create customers from elasticService', (done: DoneFn) => {
    
    service.create("customers", requestCreateCustomer).subscribe(res => {
      expect(service.create).toHaveBeenCalled();
      expect(res).toEqual(responseCreateCustomer);
      done();
    });

  });


});
