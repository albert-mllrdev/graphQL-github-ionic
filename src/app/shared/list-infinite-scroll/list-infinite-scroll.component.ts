import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-infinite-scroll',
  templateUrl: './list-infinite-scroll.component.html',
  styleUrls: ['./list-infinite-scroll.component.scss'],
})
export class ListInfiniteScrollComponent implements OnInit {
  @Input() loadMoreText!: string;
  @Output() loadMore = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  emitLoad(event: Event){
    this.loadMore.emit(event);
  }
}
