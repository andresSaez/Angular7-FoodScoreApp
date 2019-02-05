import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant-service/restaurant.service';
import { Title } from '@angular/platform-browser';
import { NgModel, NgForm } from '@angular/forms';
import { EditRestaurantDeactivateGuard } from 'src/app/guards/edit-restaurant-deactivate.guard';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { MatDialog } from '@angular/material';
import { of, Observable, from } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { catchError, map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'fs-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit, EditRestaurantDeactivateGuard {
  zoom = 10;
  newRest: Restaurant;
  daysOpen: boolean[] = (new Array(7)).fill(true);
  weekDay: number;
  cuisine: string;
  edit = false;
  guardado = false;
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  @ViewChild('fileImage') fileInput: ElementRef;
  @ViewChild('addForm') addForm: NgForm;

  constructor(
    private titleService: Title,
    private router: Router,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private geolocation: GeolocationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.weekDay = new Date().getDay();
    this.resetForm();
    if (!isNaN(id)) {
      this.edit = true;
      this.titleService.setTitle('Angular foodscore | Edit restaurant');
      this.restaurantService.getRestaurant(id).subscribe(
        restau => {
          this.newRest = restau;
          this.cuisine = this.newRest.cuisine.join(', ');
          this.newRest.daysOpen = this.newRest.daysOpen.map(d => +d);
          this.daysOpen = this.daysOpen.map((day, i) => this.newRest.daysOpen.includes(i) ? true : false);
        }
      );
    } else {
      this.titleService.setTitle('Angular foodscore | New restaurant');
      this.geolocation.getLocation().then(c => {
        this.newRest.lat = <any>c.latitude;
        this.newRest.lng = <any>c.longitude;
      }).catch(err => {
        this.newRest.lat = 0;
        this.newRest.lng = 0;
      });
    }
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newRest.image = <string>reader.result;
    });
  }

  addRestaurant() {
    this.prepararRestauranteParaGuardar();
    if (!this.edit) {
      this.restaurantService.addRestaurant(this.newRest).subscribe(
        rest => {
          this.daysOpen.fill(true);
          this.resetForm();
          this.router.navigate(['/restaurants']);
        },
        error => console.log(error)
      );
    } else {
      this.restaurantService.updateRestaurant(this.newRest).subscribe(
        rest => {
          this.daysOpen.fill(true);
          this.resetForm();
          this.guardado = true;
          this.router.navigate(['/restaurants']);
        }
      );
    }
  }

  prepararRestauranteParaGuardar() {
    this.newRest.daysOpen = this.daysOpen.reduce((days, isSelected, i) => isSelected ? [...days, i] : days, []);
    this.newRest.cuisine = this.cuisine.split(',');
    this.newRest.lat = +this.newRest.lat;
    this.newRest.lng = +this.newRest.lng;

    if (this.newRest.image.includes('restaurants')) {
      this.newRest.image = this.newRest.image.replace('img\\', 'img/');
    }
  }

  resetForm() {
    this.newRest = {
      name: '',
      image: '',
      cuisine: [],
      description: '',
      phone: '',
      daysOpen: [],
      lat: 0,
      lng: 0,
      address: ''
    };
    this.fileInput.nativeElement.value = '';
  }

  cancelForm() {
    this.router.navigate(['/restaurants']);
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }


  canDeactivate(): Observable<boolean> {
    if (this.addForm.dirty && this.addForm.valid && !this.guardado) {
      console.log(this.newRest);
      const modalRef = this.dialog.open(ConfirmModalComponent, {
        data: {title: 'Save changes', body: 'If you leave this page, all changes will be lost. Do you want to save changes?'},
        disableClose: true
      });

      return modalRef.afterClosed().pipe(switchMap(resp => {
        if (resp) {
          this.prepararRestauranteParaGuardar();
          return this.restaurantService.updateRestaurant(this.newRest).pipe(
            map(r => true),
            catchError(e => {
              alert('Error saving restaurant!');
              return of(false);
            })
          );
        } else {
          return of(true);
        }
      }),
      catchError(e => of(false)));
    }
    return of(true);
  }

  changePosition(result: Result) {
    this.newRest.lat = result.geometry.coordinates[1];
    this.newRest.lng = result.geometry.coordinates[0];
    this.newRest.address = result.place_name;
    console.log('New address: ' + result.place_name);
  }
}

