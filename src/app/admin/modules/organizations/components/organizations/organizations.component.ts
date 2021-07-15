import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageStoreService } from 'src/app/admin/shared/services/page-store.service';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationInterface } from 'src/app/admin/shared/types/organization.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'organizations',
  templateUrl: './organization.component.html',
})
export class OrganizationsComponent implements OnInit {
  public organizationList$: Observable<OrganizationInterface[]>;
  public filterForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private pageStoreService: PageStoreService,
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {
    this.pageStoreService.setPage({
      header: 'Организации',
      description: 'Найдите нужную для Вас организацию',
    });

    this.filterForm = this.formBuilder.group({
      search: '',
    });

    this.onChanges();
  }

  onChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        tap(() => (this.isLoading = true)),
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.organizationList$ = this.organizationService.getOrganizationList(
          value.search
        );
        this.isLoading = false;
      });
  }
}
