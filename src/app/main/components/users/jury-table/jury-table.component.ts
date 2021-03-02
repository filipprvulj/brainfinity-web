import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-jury-table',
  templateUrl: './jury-table.component.html',
  styleUrls: ['./jury-table.component.sass']
})
export class JuryTableComponent implements OnInit {
  pageSize: number;
  pageIndex: number;
  resultsLength: number;
  dataSource
  displayedColumns

  constructor() { }

  ngOnInit(): void {
  }

  paginator(event) { }
}
