import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.css']
})
export class AddEpisodeComponent implements OnInit {

  private title: string;
  private description: string;

  constructor() { }

  ngOnInit() {
  }

}
