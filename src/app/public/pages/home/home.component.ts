import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewsService } from '../../service/news.service';
import { NewsInterface } from '../../type/news.interface';
import { OrganizationService } from '../../service/organization.service';
import { MibModalService } from '../../shared/mib-modal';
import { OrganizationInterface } from '../../type/organization.interface';
import { Router } from '@angular/router';
import { Defender } from 'src/app/shared/classes/common/defender.class';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public display: boolean = false;
  public financeForm: FormGroup;

  public isRequestLoading: boolean = false;

  public news: NewsInterface[];
  public partners: string[] = [];
  private subscription$: Subscription = new Subscription();

  constructor(
    private mibModalService: MibModalService,
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fillNews();
    this.fillPartners();
    this.financeForm = this.fb.group({
      organization: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      inn: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: [''],
      isAccept: false,
    });

    this.financeForm.controls['organization'].setErrors(null);
    this.financeForm.controls['name'].setErrors(null);
    this.financeForm.controls['phone'].setErrors(null);
    this.financeForm.controls['inn'].setErrors(null);
    this.financeForm.controls['email'].setErrors(null);
  }

  showDialog() {
    this.financeForm.reset();
    this.display = true;
  }

  public onReadHandler(id: string) {
    this.router.navigate([`news/${id}`]);
  }

  public isFinanceFormValid(): boolean {
    if (this.financeForm.value.isAccept && this.financeForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  public sendFinanceRequest(id: string) {
    if (!this.isFinanceFormValid() || this.isRequestLoading) {
      return;
    }

    this.isRequestLoading = true;

    let organizationInterface: OrganizationInterface =  {
      Comment: Defender.defendValue(this.financeForm.value?.comment),
      Email:  Defender.defendValue(this.financeForm.value?.email),
      Inn:  Defender.defendValue(this.financeForm.value?.inn),
      IsAccept: this.financeForm.value?.isAccept,
      Organization:  Defender.defendValue(this.financeForm.value?.organization),
      Person:  Defender.defendValue(this.financeForm.value?.name),
      Phone: Defender.defendValue(this.financeForm.value?.phone)
    }

    this.subscription$.add(
      this.organizationService
        .send(organizationInterface)
        .subscribe((response) => {
          this.display = false;
          this.financeForm.reset();
        })
    );
  }

  fillNews() {
    this.subscription$.add(
      this.newsService.getNews(10).subscribe((responseNews) => {
        this.news = responseNews;
      })
    );
  }

  private fillPartners() {

    this.partners = [
      '../../../../assets/public/partners/new/billa.png',
      '../../../../assets/public/partners/new/diksi.png',
      '../../../../assets/public/partners/new/familia.jpg',
      '../../../../assets/public/partners/new/inmarko.png',
      '../../../../assets/public/partners/new/katren.png',
      '../../../../assets/public/partners/new/lamoda.png',
      '../../../../assets/public/partners/new/lenta.png',
      '../../../../assets/public/partners/new/leroy.png',
      '../../../../assets/public/partners/new/mega.png',
      '../../../../assets/public/partners/new/metro.jpg',
      '../../../../assets/public/partners/new/mvideo.png',
      '../../../../assets/public/partners/new/mysnov.png',
      '../../../../assets/public/partners/new/nestle.png',
      '../../../../assets/public/partners/new/obi.png',
      '../../../../assets/public/partners/new/ok.png',
      '../../../../assets/public/partners/new/petrovich.png',
      '../../../../assets/public/partners/new/post.png',
      '../../../../assets/public/partners/new/protek.png',
      '../../../../assets/public/partners/new/stroylandiya.png',
      '../../../../assets/public/partners/new/tvoydom.png',
      '../../../../assets/public/partners/new/unilever.png',
      '../../../../assets/public/partners/new/vimpel.png',
      '../../../../assets/public/partners/new/vseinstrumenti.png',
      '../../../../assets/public/partners/new/x5.png'
    ];
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
