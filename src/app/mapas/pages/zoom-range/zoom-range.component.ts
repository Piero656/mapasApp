import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height : 100%;
      }

      .row{

        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        position: fixed;
        padding: 10px;
        z-index: 999;
        width: 400px

      }

    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  mapa!: mapboxgl.Map;

  @ViewChild('mapa') divMapa! : ElementRef;

  zoomLevel : number = 15;
  center: [number,number] = [-77.01123294377817, -12.184342806051953];

  constructor() { }

  ngOnDestroy(): void {
      this.mapa.off('zoom', () => {});
      this.mapa.off('zoomend', () => {});
      this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoom', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.setZoom(18);
      }
    })

    this.mapa.on('move', (ev) => {
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    })

  }


  zoomIn() {
    this.mapa.zoomIn();

  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomCambio( zoomImput : string ){
    console.log(zoomImput);
    this.mapa.zoomTo(Number(zoomImput));
  }

}
