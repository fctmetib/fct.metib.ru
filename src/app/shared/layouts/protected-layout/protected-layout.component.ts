import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.css'],
})
export class ProtectedLayoutComponent implements OnInit {
  opened: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
