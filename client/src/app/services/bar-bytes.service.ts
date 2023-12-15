import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Dishes } from '../models/Dishes.model';

const API_BASE_URL = 'http://localhost:4000/api';
@Injectable({
  providedIn: 'root'
})
export class BarBytesService {

  constructor(private httpClient: HttpClient) { }

  getAllDishes(limit = '12', sort = 'desc', category?: Array<{ _id: string; nombre: string; }>, search?: string): Observable<Array<Dishes>> {
    let queryParams = `?sort=${sort}&limit=${limit}`;
    // condicional para filtrar por categorias
    if (category) {
      queryParams += `&categoriaNombre=${category.map(cat => cat.nombre).join(',')}`;
    }
    // condicional para filtrar por busqueda
    if (search) {
      queryParams += `&search=${search}`;
    }

    return this.httpClient.get<any[]>(`${API_BASE_URL}/platos${queryParams}`).pipe(
      map(platos => platos.map(plato => ({
        id: plato._id, 
        title: plato.nombre,
        price: plato.precio,
        category: plato.categoriaId.map((cat: { nombre: string; }) => cat.nombre),
        description: plato.descripcion,
        image: plato.img
      })))
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<any[]>(`${API_BASE_URL}/categories`).pipe(
      map(categorias => categorias.map(categoria => categoria.nombre))
    );

  }


}
