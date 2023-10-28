import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewsService } from '../../service/news.service';
import { NewsInterface } from '../../type/news.interface';
import { OrganizationService } from '../../service/organization.service';
import { MibModalService } from '../../shared/mib-modal';
import { OrganizationInterface } from '../../type/organization.interface';
import { Router } from '@angular/router';
import { Defender } from 'src/app/shared/classes/common/defender.class';

@Component({
  selector: 'home.html',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
  ) { }

  ngOnInit() {
    this.fillNews();
    this.fillPartners();
    this.financeForm = this.fb.group({
      organization: ['', [Validators.required, this._noWhitespaceValidator]],
      name: ['', [Validators.required, this._noWhitespaceValidator]],
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

    let organizationInterface: OrganizationInterface = {
      Comment: Defender.defendValue(this.financeForm.value?.comment),
      Email: Defender.defendValue(this.financeForm.value?.email),
      Inn: Defender.defendValue(this.financeForm.value?.inn),
      IsAccept: this.financeForm.value?.isAccept,
      Organization: Defender.defendValue(this.financeForm.value?.organization),
      Person: Defender.defendValue(this.financeForm.value?.name),
      Phone: Defender.defendValue(this.financeForm.value?.phone),
    };

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

  private fillPartners(): void {
    this.partners = [
      './assets/public/partners/ozon.png',
      './assets/public/partners/lukoil.png',
      './assets/public/partners/mts.png',
      './assets/public/partners/nlmk.png',
      './assets/public/partners/diksi.png',
      './assets/public/partners/familia.png',
      './assets/public/partners/inmarko.png',
      './assets/public/partners/katren.png',
      './assets/public/partners/lamoda.png',
      './assets/public/partners/lenta.png',
      './assets/public/partners/leroy.png',
      './assets/public/partners/mega.png',
      './assets/public/partners/metro.png',
      './assets/public/partners/mvideo.png',
      './assets/public/partners/mysnov.png',
      './assets/public/partners/nestle.png',
      './assets/public/partners/obi.png',
      './assets/public/partners/ok.png',
      './assets/public/partners/petrovich.png',
      './assets/public/partners/post.png',
      './assets/public/partners/protek.png',
      './assets/public/partners/stroylandiya.png',
      './assets/public/partners/tvoydom.png',
      './assets/public/partners/unilever.png',
      './assets/public/partners/vimpel.png',
      './assets/public/partners/vseinstrumenti.png',
      './assets/public/partners/x5.png'
    ];
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private _noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
