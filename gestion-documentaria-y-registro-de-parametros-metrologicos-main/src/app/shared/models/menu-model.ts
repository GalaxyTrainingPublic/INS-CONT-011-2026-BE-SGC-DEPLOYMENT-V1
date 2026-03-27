
export interface MenuParent {
  label: string;            // Nombre que se muestra en la UI
  abrev?: string;           // Abreviación opcional
  icon?: string;            // Icono opcional
  path?: string;            // Ruta a la que apunta
  children?: MenuParent[];  // Submenú si tiene
  items?: MenuParent[];     // Otra opción de submenú, dependiendo de cómo organices tu menú
}
