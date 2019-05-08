import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Forecast} from '../forecast';
import {CurrentWeather} from '../current-weather';
import {WeatherService} from '../weather.service';
import {MessageService} from '../message.service';


@Component({
    selector: 'wa-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

    constructor(private ws: WeatherService, public messageService: MessageService) {
    }

    cityForecast: Forecast[] = [];
    myWeather: CurrentWeather;

    ngOnInit() {
    }

    onSubmit(forecastForm: NgForm) {
        this.cityForecast.splice(0, this.cityForecast.length);
        this.myWeather = new CurrentWeather('', '', '', '', '', '');
        this.messageService.clear();
        const city = forecastForm.value.forecastCity;
        if (city.length < 1) {
            this.messageService.add('Please, input city name');
            return false;
        }
        this.ws.getWeatherByCity(city).subscribe(
            (data: any) => {
                if (data.length === 0) {
                    return false;
                }
                this.myWeather = new CurrentWeather(
                    data.name,
                    data.main.temp,
                    data.weather[0].icon,
                    data.weather[0].description,
                    data.main.temp_max,
                    data.main.temp_min);
            });
        this.ws.fiveDayForecast(city).subscribe(
            (data: any) => {
                if (data.length === 0) {
                    return false;
                }
                data.list.filter((item, i) => {
                    if (i % 8 === 0) {
                        const temp = new Forecast(
                            item.dt_txt,
                            item.weather[0].icon,
                            item.main.temp_max,
                            item.main.temp_min);
                        this.cityForecast.push(temp);
                    }
                    return false;
                });
            });
    }

}
