import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElasticService {

  private endpoint = "";

  constructor(protected http: HttpClient) {
    this.endpoint = environment.endpoint;
  }

  getAll(path: string, filter = '?filter_path=hits.hits._source') {
    return this.http.get(this.endpoint + path + '/_search' + filter);
  }

  create(path: string, obj: any) {
    return this.http.post(this.endpoint + path + '/_doc', obj);
  }

}
