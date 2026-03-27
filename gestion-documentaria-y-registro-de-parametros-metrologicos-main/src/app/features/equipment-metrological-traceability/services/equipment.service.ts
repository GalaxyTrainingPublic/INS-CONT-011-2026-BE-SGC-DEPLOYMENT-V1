import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'api/equipments'; // Ajustar a tu endpoint de Spring Boot
  
  // Para manejo de estado local (opcional)
  private equipmentsSubject = new BehaviorSubject<Equipment[]>([]);
  equipments$ = this.equipmentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todos los equipos
  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl);
  }

  // Obtener por ID
  getById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo equipo (Modal)
  create(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.apiUrl, equipment);
  }

  // Actualizar equipo
  update(id: string, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/${id}`, equipment);
  }

  // Eliminar equipo
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Carga masiva desde Excel
   * @param file Archivo .xlsx
   */
  importFromExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/import`, formData);
  }

  // Mock de datos para desarrollo inicial
  getMockData(): Equipment[] {
    return [
      {
        id: '1',
        internalCode: 'EQ-2026-001',
        campus: 'Sede Central',
        laboratory: 'Metrología',
        specificLocation: 'Sala de Pesaje A1',
        name: 'Balanza Analítica',
        description: 'Balanza de alta precisión para microgramos',
        patrimonialCode: '7408050001',
        brand: 'Mettler Toledo',
        model: 'XPR205',
        series: 'B9928374',
        entryDateTime: new Date(),
        category: 'Medición',
        status: 'Operativo',
        imageUrl: 'assets/img/equipments/balanza.jpg'
      }
    ];
  }
}