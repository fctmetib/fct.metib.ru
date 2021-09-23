import { ProgressBarModule } from 'primeng/progressbar';
import { NgModule } from '@angular/core';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { MibFileUploaderComponent } from './components/mib-file-uploader/mib-file-uploader.component';

@NgModule({
  imports: [ProgressBarModule],
  exports: [HeaderPageComponent, MibFileUploaderComponent],
  declarations: [HeaderPageComponent, MibFileUploaderComponent],
})
export class SharedModule { }
