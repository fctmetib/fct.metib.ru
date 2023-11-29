import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID, ViewChild
} from '@angular/core'
import {Router} from '@angular/router'
import {NotificationService} from './shared/services/notification.service'
import {HeaderComponent} from './shared/components/header/header.component';
import {Properties} from 'csstype';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  @ViewChild('header') header: HeaderComponent

  constructor(
    private router: Router,
    private notifyService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  get styles(): Properties {
    return {
      height: `calc(100vh - ${this.header?.height ?? 0}px)`
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
