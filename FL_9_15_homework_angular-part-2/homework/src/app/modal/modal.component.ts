import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Input() showModal: boolean;
  @Input() lessons: any = [];
  @Input() newLesson: any = {};

  ngOnInit() {
  }

  addLesson() {
    this.lessons.push(this.newLesson);
  }

  closeModal() {
    this.showModal = !this.showModal;
  }

}
