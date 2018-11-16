import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Show } from './show';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ShowService {

  private itemsUrl = 'https://hapi-practice-uodxjalzjs.now.sh/shows';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET items from the server */
  getItems (): Observable<Show[]> {
    return this.http.get<Show[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError('getItems', []))
      );
  }

  /** GET item by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: string): Observable<Show> {
    const url = `${this.itemsUrl}/id=${id}`;
    return this.http.get<Show[]>(url)
      .pipe(
        map(shows => shows[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} item id=${id}`);
        }),
        catchError(this.handleError<Show>(`getItem id=${id}`))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: string): Observable<Show> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Show>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Show>(`getItem id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new item to the server */
  addItem (show: Show): Observable<Show> {
    return this.http.post<Show>(this.itemsUrl, show, httpOptions).pipe(
      tap((show: Show) => this.log(`added item w/ id=${show._id}`)),
      catchError(this.handleError<Show>('addItem'))
    );
  }

  /** DELETE: delete the item from the server */
  deleteItem (show: Show | string): Observable<Show> {
    const id = typeof show === 'string' ? show : show._id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Show>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Show>('deleteItem'))
    );
  }

  /** PUT: update the item on the server */
  updateItem (show: Show): Observable<any> {
    const id = typeof show === 'string' ? show : show._id;
    const url = `${this.itemsUrl}/${id}`;
    return this.http.put(url, show, httpOptions).pipe(
      tap(_ => this.log(`updated item id=${show._id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}