import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grader-table',
  templateUrl: './grader-table.component.html',
  styleUrls: ['./grader-table.component.sass']
})
export class GraderTableComponent implements OnInit {
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
