import { MenuParent } from "../../../models/menu-model";

export const menu: MenuParent[] = [
  {
    label: 'Inicio',
    abrev: 'Inicio',
    icon: 'ph-light  ph-house',
    path: 'inicio/general'
  },
  {
    label: 'Gestión Documentaria',
    abrev: 'Documentos',
    icon: 'ph-light ph-folder',
    items: [
      {
        label: 'Panel',
        path: '/document-management/dashboard'
      },
      {
        label: 'Lista de documentos',
        path: '/document-management/list'
      },
      {
        label: 'Distribución',
        path: '/document-management/distribution'
      },
      {
        label: 'Gestión de registros',
        path: '/document-management/records-management'
      },
      {
        label: 'Documentos externos',
        path: '/document-management/external-documents'
      },
      {
        label: 'Informes de auditoría',
        path: '/document-management/reports-audit'
      }
    ]
  },
  {
    label: 'Riesgos y Oportunidades',
    abrev: 'Riesgos',
    icon: 'ph-light ph-warning',
    items: [
      {
        label: 'Panel',
        path: '/risks-opportunities/dashboard'
      },
      {
        label: 'Listado de riesgos',
        path: '/risks-opportunities/list'
      },
      {
        label: 'Trazabilidad',
        path: '/risks-opportunities/traceability'
      },
      {
        label: 'Monitoreo',
        path: '/risks-opportunities/monitoring'
      },
      {
        label: 'Reportes',
        path: '/risks-opportunities/reports'
      }
    ]
  },
  {
    label: 'Equipos y Trazabilidad Metrológica',
    abrev: 'Equipos',
    icon: 'ph-light ph-binoculars',
    items: [
      {
        label: 'Panel',
        path: '/equipment-metrological-traceability/dashboard'
      },

      // EQUIPMENT
      {
        label: 'Equipos',
        children: [
          {
            label: 'Inventario de equipos',
            path: '/equipment-metrological-traceability/equipment/registry'
          },
          {
            label: 'Detalle',
            path: '/equipment-metrological-traceability/equipment/detail/1'
          }
        ]
      },

      // CALIBRATION
      {
        label: 'Calibración',
        children: [
          {
            label: 'Programación',
            path: '/equipment-metrological-traceability/calibration/schedule'
          },
          {
            label: 'Ejecución',
            path: '/equipment-metrological-traceability/calibration/execution'
          },
          {
            label: 'Certificados',
            path: '/equipment-metrological-traceability/calibration/certificates'
          }
        ]
      },

      // MAINTENANCE
      {
        label: 'Mantenimiento',
        children: [
          {
            label: 'Preventivo',
            path: '/equipment-metrological-traceability/maintenance/preventive'
          },
          {
            label: 'Correctivo',
            path: '/equipment-metrological-traceability/maintenance/corrective'
          }
        ]
      },

      // OTROS
      {
        label: 'Trazabilidad',
        path: '/equipment-metrological-traceability/traceability'
      },
      {
        label: 'Materiales / Patrones',
        path: '/equipment-metrological-traceability/materials-standards'
      },
      {
        label: 'Reportes',
        path: '/equipment-metrological-traceability/reports'
      }
    ]
  },
  {
    label: 'Personal y Competencia',
    abrev: 'Personal',
    icon: 'ph-light ph-users',
    items: [
      {
        label: 'Panel',
        path: '/personnel-competence/dashboard'
      },
      {
        label: 'Lista de personal',
        path: '/personnel-competence/personnel-list'
      },
      {
        label: 'Alertas',
        path: '/personnel-competence/alerts'
      },
      {
        label: 'Documentos',
        path: '/personnel-competence/documents'
      },
      {
        label: 'Capacitación',
        path: '/personnel-competence/training'
      },
      {
        label: 'Evaluación de competencia',
        path: '/personnel-competence/competence-evaluation'
      },
      {
        label: 'Autorización',
        path: '/personnel-competence/authorization'
      },
      {
        label: 'Reevaluación',
        path: '/personnel-competence/reevaluation'
      }
    ]
  },
  {
    label: 'Indicadores',
    abrev: 'Indicadores',
    icon: 'ph-light ph-chart-donut',
  },
  {
    label: 'Maestro',
    abrev: 'Maestro',
    icon: 'ph-light ph-gear-six',
  }
];
