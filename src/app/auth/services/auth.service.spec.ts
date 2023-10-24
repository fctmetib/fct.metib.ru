import { KeysConfig } from './../../../../config/keys.config';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../environments/environment';
import { LoginRequestInterface } from './../types/login/loginRequest.interface';
import { AuthResponseInterface } from './../types/login/authResponse.interface';
import { AuthService } from './auth.service';
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

const mockData = [
  {
    Code: '',
    CustomerID: 0,
    Date: new Date(),
    DebtorID: 0,
    Expire: new Date(),
    IP: '111.111.11.11',
    Login: 'testlogin',
    ManagerID: 0,
    Name: 'Test Name',
    OrganizationID: 'id',
    Roles: ['USER'],
    StaffID: 0,
    UserID: 0,
  },
] as AuthResponseInterface[];

describe('AuthService', () => {
  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule],
      providers: [AuthService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([AuthService], (s) => {
    service = s;
  }));

  beforeEach(() => {
    let mockUsers = [...mockData];
    let mockUser = mockUsers[0];
    let userId = mockUser.UserID;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return auth user', () => {
      let data: LoginRequestInterface = {
        ip: '0.0.0.0',
        login: KeysConfig.login,
        password: KeysConfig.password
      }

      service
        .login(data)
        .subscribe(
          (resp) => expect(resp).toEqual(mockData),
          fail
        );

      // Receive GET request
      const req = httpTestingController.expectOne(environment.apiUrl + '/user/login');
      expect(req.request.method).toEqual('POST');
      // Respond with the mock heroes
      req.flush(mockData);
    });
  });
});
