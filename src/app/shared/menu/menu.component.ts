import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta: string,
  nombre: string,
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    
    `
  ]
})
export class MenuComponent implements OnInit {

  menuItems : MenuItem[] = [
    {
      nombre: 'fullscreen',
      ruta: '/mapas/fullscreen'
    },
    {
      nombre: 'marcadores',
      ruta: '/mapas/marcadores'
    },
    {
      nombre: 'propiedades',
      ruta: '/mapas/propiedades'
    },
    {
      nombre: 'zoom-range',
      ruta: '/mapas/zoom-range'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
