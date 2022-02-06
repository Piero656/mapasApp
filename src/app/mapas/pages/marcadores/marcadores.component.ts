import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number,number];
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [

    `
      .mapa-container {
        width: 100%;
        height : 100%;
      }

      .list-group {
        position : fixed;
        top:20px;
        right: 20px;
        z-index: 99;
        cursor: pointer;
      }


    `

  ]
})
export class MarcadoresComponent implements AfterViewInit {

  mapa!: mapboxgl.Map;

  @ViewChild('mapa') divMapa! : ElementRef;

  zoomLevel : number = 15;
  center: [number,number] = [-77.01123294377817, -12.184342806051953];

  marcadores : MarcadorColor[] = [];


  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const marker = new mapboxgl.Marker()
    //                 .setLngLat( this.center )
    //                 .addTo(this.mapa);

    this.leerMarcadores();
                    
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

      this.marcadores.push({color,marker: nuevoMarcador});

      this.guardarMarcadores();

      nuevoMarcador.on('dragend', () => {
        this.guardarMarcadores();
      })

  }


  irMarcador( marcador : MarcadorColor ) {
    const {lng, lat} = marcador.marker!.getLngLat()
    this.center = [lng,lat];
    
    this.mapa.flyTo({
      center:this.center,
      zoom: 15
    });
  }

  guardarMarcadores () {

    const lngLatArr : MarcadorColor[]= [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro:[lng,lat]
      })

    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));


  }


  leerMarcadores () {

    if(!localStorage.getItem('marcadores')){
      return
    }

    const marcadores : MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! );

    marcadores.forEach( m => {
      const marker = new mapboxgl.Marker({
        color : m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa)


      this.marcadores.push({
        marker: marker,
        color: m.color
      })
      
      marker.on('dragend', () => {
        this.guardarMarcadores();
      })

    });


  }

  borrarMarcador ( index : number ) {
    console.log("borrar");
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index,1);
    this.guardarMarcadores();
  }





}
