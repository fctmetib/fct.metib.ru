import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, observable, Subscriber } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { NewsService } from '../../service/news.service'; 
import { NewsInterface } from '../../type/news.interface';
import { OrganizationService } from '../../service/organization.service';
import { MibModalService } from '../../shared/mib-modal';
import { OrganizationInterface } from '../../type/organization.interface';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public financeForm = this.fb.group({
    organization: [''],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    inn: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    comment: [''],
    isAccept: false,
  });

  constructor(
    private mibModalService: MibModalService,
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private ns: NewsService
  ) {}

  ngOnInit() {this.fillNews();}

  public isFinanceFormValid(): boolean {
    if (this.financeForm.value.isAccept && this.financeForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  public sendFinanceRequest(id: string) {
    let org: OrganizationInterface = this.financeForm.value;
    this.organizationService.send(org).subscribe(response=>{
      this.closeModal(id);
    });
  }

  openModal(id: string) {
    this.mibModalService.open(id);
   
  }

  closeModal(id: string) {
    this.mibModalService.close(id);
  }

  public news: Observable<NewsInterface>[];

  fillNews() {
    for(let i = 0; i< 10; i++) {
      this.news[i] = this.ns.getNews(1);
  }
  }
  //public news = this.newsService.getNewsList().subscribe();
 // let news: NewsInterface[] = this.ns.getNews(1).subscribe();
}
