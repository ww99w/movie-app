import { MovieService, SearchType } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface videotype{
  id:string;
  name:string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})

export class MoviesPage implements OnInit {
  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.All;
  types: videotype[] = [];

   /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.types =  this.enumSelector(SearchType);
  }

  enumSelector(definition) {
    return Object.keys(definition)
      .map(key => ({ id: definition[key], name: key }));
  }

  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }

}
