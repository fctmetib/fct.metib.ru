import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewsService } from '../../service/news.service';
import { NewsInterface } from '../../type/news.interface';
import { OrganizationService } from '../../service/organization.service';
import { MibModalService } from '../../shared/mib-modal';
import { OrganizationInterface } from '../../type/organization.interface';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription$: Subscription = new Subscription();

  public financeForm = this.fb.group({
    organization: [''],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    inn: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    comment: [''],
    isAccept: false,
  });

  public news: NewsInterface[];

  constructor(
    private mibModalService: MibModalService,
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.fillNews();
  }

  public isFinanceFormValid(): boolean {
    if (this.financeForm.value.isAccept && this.financeForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  public sendFinanceRequest(id: string) {
    let organizationInterface: OrganizationInterface = this.financeForm.value;
    this.subscription$.add(
      this.organizationService
        .send(organizationInterface)
        .subscribe((response) => {
          this.closeModal(id);
          this.financeForm.reset();
        })
    );
  }

  openModal(id: string) {
    this.mibModalService.open(id);
  }

  closeModal(id: string) {
    this.mibModalService.close(id);
  }

  fillNews() {
    this.subscription$.add(
      this.newsService.getNews(10).subscribe((responseNews) => {
        this.news = responseNews;
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
