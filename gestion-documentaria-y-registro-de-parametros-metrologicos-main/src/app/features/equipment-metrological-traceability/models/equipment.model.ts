export interface Equipment {
  id?: string;
  internalCode: string;       // N° CODIGO INTERNO
  campus: string;             // SEDE
  laboratory: string;         // LABORATORIO / AREA
  specificLocation: string;   // UBICACIÓN ESPECIFICA
  name: string;               // NOMBRE DEL EQUIPO
  description: string;        // DESCRIPCIÓN
  patrimonialCode: string;    // CODIGO PATRIMONIAL
  brand: string;              // MARCA
  model: string;              // MODELO
  series: string;             // SERIE
  entryDateTime: Date;        // Fecha y hora de ingreso
  category: string;           // Categoria (Analítico, Medición, etc.)
  status: EquipmentStatus;    // Estado
  imageUrl?: string;          // Imagen referencial
}

export type EquipmentStatus = 'Operativo' | 'En mantenimiento' | 'Fuera de servicio' | 'Baja';

export interface EquipmentFilter {
  term: string;
  lab: string;
  category: string;
  status: string;
}