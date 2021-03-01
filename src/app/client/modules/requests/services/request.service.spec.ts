import { RequestsService } from './requests.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientModule,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('RequestsService', () => {
  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule],
      providers: [RequestsService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([RequestsService], (s) => {
    service = s;
  }));

  beforeEach(() => {
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetch', () => {
    it('should return list of requests', () => {
    });
  });
});
