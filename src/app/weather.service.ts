import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {MessageService} from './message.service';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    constructor(private http: HttpClient,
                private messageService: MessageService) {
    }

    getWeatherByCity(city: string) {
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5867283e650712605600cf5126588bc0&units=metric`).pipe(
            catchError(this.handleError<any>('getWeatherByCity', []))
        );
    }

    fiveDayForecast(city: string) {
        return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5867283e650712605600cf5126588bc0&units=metric`);
    }

    private log(message: string) {
        this.messageService.add(`${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: better job of transforming error for user consumption
            this.log('Not found. Please, check the city exist');

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
