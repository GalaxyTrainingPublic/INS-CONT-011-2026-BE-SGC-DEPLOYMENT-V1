export interface ActionPlan {
  id: number;
  action: string;
  responsible: string;
  dueDate: string;
  status: 'Pendiente' | 'En proceso' | 'cerrado';
  
  // Gestión de Evidencias (SGC ISO 17025)
  evidenceName?: string;   // Nombre del archivo para mostrar en la tabla
  evidenceUrl?: string;    // Link de descarga (si viene del backend)
  evidenceFile?: File;     // El archivo físico (para el momento de la subida)
}