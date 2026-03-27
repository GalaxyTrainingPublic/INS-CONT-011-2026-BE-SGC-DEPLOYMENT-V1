import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Risk } from '../models/risk.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  private apiUrl = 'api/riesgos'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los registros
  getAllRisks(): Observable<Risk[]> {
    return this.http.get<Risk[]>(this.apiUrl);
  }

  getRiskById(id: number): Observable<Risk> {
  // Buscamos en el array local en lugar de hacer una petición HTTP
  const risk = this.risks.find(r => r.id === id);
  return of(risk as Risk);
}

updateRisk(updatedRisk: Risk): Observable<Risk> {
  const index = this.risks.findIndex(r => r.id === updatedRisk.id);
  if (index !== -1) {
    this.risks[index] = { ...updatedRisk };
  }
  return of(updatedRisk);
}

createRisk(risk: Risk): Observable<Risk> {
  // Generamos un ID basado en el último elemento para evitar duplicados
  const maxId = this.risks.length > 0 ? Math.max(...this.risks.map(r => r.id)) : 0;
  
  const newRisk: Risk = { 
    ...risk, 
    id: maxId + 1 
  };
  
  this.risks.push(newRisk);
  console.log('Lista actualizada en servicio:', this.risks); // Para debug
  return of(newRisk);
}

  // Eliminar un registro
  deleteRisk(id: number): Observable<void> {
    // Filtramos el array local para remover el elemento
    this.risks = this.risks.filter(r => r.id !== id);
    
    // Si usaras API real, descomenta la línea de abajo y borra la de arriba:
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
    return of(void 0); // Simulamos respuesta exitosa
  }

  private risks: Risk[] = [
    {
      id: 1,
      process: 'Análisis',
      subprocess: 'Gestión de documentos',
      task: 'Registro de documentos',
      type: 'Riesgo',
      laboratory: 'Metrología',
      description: 'Mal llenado de registros compartidos (Plataforma)',
      causes: 'Cambio en el flujo de trabajo en el Laboratorio de Microbiología y Biomedicina',
      consequences: 'Inadecuada trazabilidad documentaria',
      probability: 8,
      impact: 4,
      value: 32,
      level: 'Medio',
      status: 'Identificado',
      significant: true,
      opportunityPromoted: false
      
    },
    {
      id: 2,
      process: 'Análisis',
      subprocess: 'Ejecución del análisis',
      task: 'Amplificación',
      type: 'Riesgo',
      laboratory: 'Biomédica',
      description: 'Resultado inválido / no reportable',
      causes: 'Error en el equipo, por presencia de material particulado (polvo/ metales en el ambiente)',
      consequences: 'Reproceso',
      probability: 4,
      impact: 6,
      value: 24,
      level: 'Bajo',
      status: 'Identificado',
      significant: false,
      opportunityPromoted: false
      
    },
    {
      id: 3,
      process: 'Post análisis',
      subprocess: 'Informe de resultados',
      task: 'Verificación de resultados',
      type: 'Riesgo',
      description: 'En el Sgil Netlab V2 no se guarda la información de verificación de resultados',
      laboratory: 'Metrología',
      causes: 'Problemas de compatibilidad del Sgil Netlab V2 con el módulo de verificación de resultados',
      consequences: 'Volver a verificar porque el Sgil NetLab V2 no guarda la información',
      probability: 4,
      impact: 6,
      value: 24,
      level: 'Bajo',
      status: 'Identificado',
      significant: false,
      opportunityPromoted: false
    },
    {
      id: 4,
      process: 'Análisis',
      subprocess: 'Gestión de equipos / insumos',
      task: 'Adquisición de insumos con equipos automatizados',
      type: 'Oportunidad',
      laboratory: 'Metrología',
      description: 'Solicitar adquisición de insumos con equipos automatizados para alicuotado, extracción y amplificación',
      causes: 'Mejora en tiempo la ejecución del análisis de laboratorio',
      consequences: 'Reducción del tiempo de entrega de resultados',
      probability: 6,
      impact: 6,
      value: 36,
      level: 'Medio',
      status: 'Identificado',
      significant: false,
      opportunityPromoted: true
      
    }
  ];

  getRisks(): Observable<Risk[]> {
    return of(this.risks);
  }

  addRisk(risk: Risk): void {
    this.risks.push({
      ...risk,
      id: this.risks.length + 1
    });
  }
}