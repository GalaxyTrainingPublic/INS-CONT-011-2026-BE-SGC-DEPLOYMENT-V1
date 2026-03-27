import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { Breadcrumb } from '../breadcrumb/breadcrumb';

interface Laboratorio {
  value: string;
  viewValue: string;
}

interface Sede {
  value: string;
  viewValue: string;
  laboratorios: Laboratorio[];
}

@Component({
  selector: 'app-navbar',
  imports: [Breadcrumb, MatFormField, MatLabel, MatSelect, MatOption],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Output() toggleSidebar = new EventEmitter<void>();
  sedeSeleccionada: string = '';
  laboratoriosFiltrados: Laboratorio[] = [];
  onSedeChange(value: string) {
    const sede = this.sedes.find(s => s.value === value);
    this.laboratoriosFiltrados = sede ? sede.laboratorios : [];
  }
sedes: Sede[] = [
  {
    value: 'chorrillos',
    viewValue: 'CNSP – Chorrillos',
    laboratorios: [
      { value: 'virus_inmunoprevenibles', viewValue: 'Virus Inmunoprevenibles' },
      { value: 'virus_transmision_sexual', viewValue: 'Virus de Transmisión Sexual' },
      { value: 'micobacterias', viewValue: 'Micobacterias' },
      { value: 'zoonosis_bacterianas', viewValue: 'Metaxénicas y Zoonosis Bacterianas' },
      { value: 'zoonosis_virales', viewValue: 'Metaxénicas y Zoonosis Virales' },
      { value: 'biologia_molecular', viewValue: 'Biología Molecular' },
    ]
  },
  {
    value: 'jesus_maria',
    viewValue: 'CNSP – Jesús María',
    laboratorios: [
      { value: 'bacteriologia_clinica', viewValue: 'Bacteriología Clínica' },
      { value: 'bacteriologia_especial', viewValue: 'Bacteriología Especial' },
      { value: 'zoonosis_parasitarias', viewValue: 'Metaxénicas y Zoonosis Parasitarias' },
      { value: 'parasitologia_especial', viewValue: 'Parasitología Especial' },
      { value: 'micologia', viewValue: 'Micología' },
      { value: 'zoonosis_bacterianas', viewValue: 'Metaxénicas y Zoonosis Bacterianas' },
      { value: 'zoonosis_virales', viewValue: 'Metaxénicas y Zoonosis Virales' },
      { value: 'plataforma_bm', viewValue: 'Plataforma de Biología Molecular' },
      { value: 'anatomia_patologica', viewValue: 'Anatomía Patológica' },
      { value: 'patologia_clinica', viewValue: 'Patología Clínica' },
    ]
  },
  {
    value: 'iquitos',
    viewValue: 'CNSP – Iquitos',
    laboratorios: [
      { value: 'cietrop', viewValue: 'CIETROP (Enfermedades Tropicales)' },
    ]
  }
];

}
