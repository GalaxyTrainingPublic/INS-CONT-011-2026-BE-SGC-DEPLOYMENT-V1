export type NotifyType = 'success' | 'error' | 'warning' | 'info';

export const NOTIFY_MSG = {
  // Mensajes dinámicos
  DELETE_SUCCESS: (name: string) => `El registro "${name}" se eliminó correctamente.`,
  SAVE_SUCCESS: (name: string) => `Los datos de "${name}" se guardaron con éxito.`,

  // Mensajes estáticos (fijos)
  ERROR_AUTH: 'Usuario o contraseña incorrectos.',
  ERROR_GENERIC: 'Ocurrió un error inesperado. Intente de nuevo.',
  WARN_SESSION: 'Su sesión está por expirar.'
} as const;
