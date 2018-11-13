import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  showModal = false;
  lessons: any = [];
  newLesson = {};

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.showModal = !this.showModal;
  }

}
