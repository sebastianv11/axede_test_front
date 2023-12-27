import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  citiesItems: any[] = [];
  constructor(private dashboardSvc: DashboardService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initCities();
  }
  initCities(): void {
    this.dashboardSvc.getCities().subscribe({
      next: (r: any) => {
        this.citiesItems = r.data;
      },
      complete: () => {
        this.snackBar.open('Ciudades cargadas correctamente', 'Ok', {
          duration: 2000
        });
      },
      error: (e: any) => {
        console.log(e);
        this.snackBar.open('Error al cargar las ciudades ', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  openDialogHotels(data: any): void {
    const dialogRef = this.dialog.open(HotelsDialogComponent, {
      maxHeight: '100vh',
      width: '90%',
      data: data
    });
  }
}

@Component({
  selector: 'app-hotels-dialog',
  templateUrl: './hotels-dialog.html',
  styleUrls: ['./dashboard.component.css']
})
export class HotelsDialogComponent implements OnInit{

  hotelsItems: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dashboardSvc: DashboardService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listHotelsByCity(this.data);
  }

  listHotelsByCity(id: any): void {
    this.dashboardSvc.getHotelsByCity(id).subscribe({
      next: (r: any) => {
        this.hotelsItems = r.data;
      },
      complete: () => {
        this.snackBar.open('Hoteles cargados correctamente', 'Ok', {
          duration: 2000
        });
      },
      error: (e: any) => {
        console.log(e);
        this.snackBar.open('Error al cargar hoteles ', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
}
