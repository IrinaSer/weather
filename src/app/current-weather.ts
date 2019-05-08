import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CurrentWeather {
  constructor(public cityName: string,
              public temp: string,
              public icon: string,
              public weatherKing: string,
              public tempMax: string,
              public tempMin: string) {}
}
