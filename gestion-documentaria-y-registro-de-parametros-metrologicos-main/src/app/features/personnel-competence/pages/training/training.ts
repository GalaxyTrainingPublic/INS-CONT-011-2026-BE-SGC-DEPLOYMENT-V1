import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PERSONNEL_OPTIONS } from '../../constants/personnel-options';

function getPaginatorEsIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  paginatorIntl.nextPageLabel = 'Página siguiente';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) return `0 de ${length}`;
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  return paginatorIntl;
}

type ProgramSituation = 'Programada' | 'En ejecución' | 'Finalizada';
type Attendance = 'Asistió' | 'Faltó' | 'Pendiente';

@Component({
  selector: 'app-training',
  standalone: true,
  templateUrl: './training.html',
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorEsIntl() }],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})
export class Training implements AfterViewInit {
  displayedIndividualColumns: string[] = ['person', 'trainingType', 'trainingName', 'institution', 'hours', 'evidence', 'url', 'actions'];
  displayedProgramColumns: string[] = ['trainingName', 'startDate', 'endDate', 'situation', 'totalSlots', 'enrolledCount', 'actions'];

  searchIndividual = '';
  searchProgram = '';
  selectedSituation = 'all';
  situationOptions: ProgramSituation[] = ['Programada', 'En ejecución', 'Finalizada'];
  trainingTypeOptions: string[] = ['Interna', 'Externa', 'Inducción', 'Entrenamiento', 'Reentrenamiento'];
  availablePersonnel: string[] = [...PERSONNEL_OPTIONS];
  private individualSearchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private programSearchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  individualDataSource = new MatTableDataSource([
    {
      id: 1,
      person: 'Juan Pérez',
      trainingType: 'Interna',
      trainingName: 'Gestión de calidad ISO 9001',
      institution: 'INS - CNSP',
      hours: 24,
      evidence: 'Diploma-ISO9001.pdf',
      url: ''
    },
    {
      id: 2,
      person: 'María López',
      trainingType: 'Externa',
      trainingName: 'Bioseguridad aplicada',
      institution: 'Universidad Nacional Mayor de San Marcos',
      hours: 16,
      evidence: '',
      url: 'https://example.org/certificado-bioseguridad'
    }
  ]);

  programDataSource = new MatTableDataSource([
    {
      id: 101,
      trainingName: 'Programa anual de bioseguridad',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      startDate: '08/04/2026',
      endDate: '25/04/2026',
      situation: 'Programada',
      totalSlots: 30,
      enrolledCount: 2
    },
    {
      id: 102,
      trainingName: 'Programa de ética e imparcialidad',
      laboratory: 'Laboratorio de Alimentación y Nutrición (CENAN)',
      startDate: '01/03/2026',
      endDate: '15/03/2026',
      situation: 'Finalizada',
      totalSlots: 20,
      enrolledCount: 20
    }
  ]);

  programParticipants: Record<number, any[]> = {
    101: [
      { person: 'Juan Pérez', attendance: 'Asistió', grade: 85, certificate: 'Cert-JP.pdf' },
      { person: 'María López', attendance: 'Pendiente', grade: null, certificate: '' }
    ],
    102: [
      { person: 'Carlos Ruiz', attendance: 'Asistió', grade: 78, certificate: 'Cert-CR.pdf' }
    ]
  };

  selectedProgram: any = null;
  selectedProgramParticipants: any[] = [];
  enrollmentPerson = 'Juan Pérez';
  enrollmentAttendance: Attendance = 'Pendiente';
  enrollmentGrade: number | null = null;
  enrollmentCertificate = '';

  showIndividualModal = false;
  showProgramModal = false;
  showEnrollmentModal = false;
  showInfoModal = false;
  infoTitle = '';
  infoMessage = '';

  newIndividual = {
    person: '',
    trainingType: 'Interna',
    trainingName: '',
    institution: '',
    hours: 1,
    evidence: '',
    url: ''
  };

  newProgram = {
    trainingName: '',
    laboratory: 'Laboratorio de Salud Pública (CNSP)',
    startDate: '',
    endDate: '',
    situation: 'Programada' as ProgramSituation,
    totalSlots: 20
  };

  selectedEvidenceFileName = '';
  @ViewChild('individualEvidenceInput') individualEvidenceInput!: ElementRef<HTMLInputElement>;
  @ViewChild('programPaginator') programPaginator!: MatPaginator;
  @ViewChild('individualPaginator') individualPaginator!: MatPaginator;

  ngAfterViewInit() {
    this.individualDataSource.paginator = this.individualPaginator;
    this.programDataSource.paginator = this.programPaginator;

    this.individualDataSource.filterPredicate = (data: any, filter: string) => {
      const value = (filter || '').toLowerCase();
      return data.person.toLowerCase().includes(value)
        || data.trainingType.toLowerCase().includes(value)
        || data.trainingName.toLowerCase().includes(value)
        || data.institution.toLowerCase().includes(value);
    };

    this.programDataSource.filterPredicate = (data: any, filter: string) => {
      const parsed = JSON.parse(filter || '{}');
      const search = (parsed.search ?? '').toLowerCase();
      const situation = parsed.situation ?? 'all';
      const matchesSearch = data.trainingName.toLowerCase().includes(search)
        || data.startDate.toLowerCase().includes(search)
        || data.endDate.toLowerCase().includes(search);
      const matchesSituation = situation === 'all' || data.situation === situation;
      return matchesSearch && matchesSituation;
    };

    this.applyProgramFilters();
  }

  applyIndividualFilter(event: Event) {
    this.searchIndividual = (event.target as HTMLInputElement).value;
    if (this.individualSearchDebounceTimer) clearTimeout(this.individualSearchDebounceTimer);
    this.individualSearchDebounceTimer = setTimeout(() => {
      this.individualDataSource.filter = this.searchIndividual.trim().toLowerCase();
      if (this.individualDataSource.paginator) this.individualDataSource.paginator.firstPage();
    }, 250);
  }

  applyProgramFilter(event: Event) {
    this.searchProgram = (event.target as HTMLInputElement).value;
    if (this.programSearchDebounceTimer) clearTimeout(this.programSearchDebounceTimer);
    this.programSearchDebounceTimer = setTimeout(() => {
      this.applyProgramFilters();
    }, 250);
  }

  syncProgramFilters() {
    this.applyProgramFilters();
  }

  resetFilters() {
    this.searchIndividual = '';
    this.searchProgram = '';
    this.selectedSituation = 'all';
    if (this.individualSearchDebounceTimer) {
      clearTimeout(this.individualSearchDebounceTimer);
      this.individualSearchDebounceTimer = null;
    }
    if (this.programSearchDebounceTimer) {
      clearTimeout(this.programSearchDebounceTimer);
      this.programSearchDebounceTimer = null;
    }

    this.individualDataSource.filter = '';
    this.applyProgramFilters();

    if (this.individualDataSource.paginator) this.individualDataSource.paginator.firstPage();
    if (this.programDataSource.paginator) this.programDataSource.paginator.firstPage();
  }

  openIndividualModal() {
    this.newIndividual = {
      person: '',
      trainingType: 'Interna',
      trainingName: '',
      institution: '',
      hours: 1,
      evidence: '',
      url: ''
    };
    this.selectedEvidenceFileName = '';
    this.showIndividualModal = true;
  }

  pickIndividualEvidence() {
    this.individualEvidenceInput?.nativeElement.click();
  }

  onIndividualEvidenceSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;
    this.selectedEvidenceFileName = file.name;
    this.newIndividual.evidence = file.name;
    input.value = '';
  }

  confirmIndividualTraining() {
    if (!this.newIndividual.person.trim() || !this.newIndividual.trainingName.trim() || !this.newIndividual.institution.trim()) {
      this.openInfoModal('Validación', 'Completa personal, nombre de capacitación e institución.');
      return;
    }
    if (!this.newIndividual.evidence.trim() && !this.newIndividual.url.trim()) {
      this.openInfoModal('Validación', 'Registra evidencia con diploma o URL.');
      return;
    }

    this.individualDataSource.data = [
      {
        id: Date.now(),
        person: this.newIndividual.person.trim(),
        trainingType: this.newIndividual.trainingType,
        trainingName: this.newIndividual.trainingName.trim(),
        institution: this.newIndividual.institution.trim(),
        hours: Number(this.newIndividual.hours),
        evidence: this.newIndividual.evidence.trim(),
        url: this.newIndividual.url.trim()
      },
      ...(this.individualDataSource.data as any[])
    ];
    this.showIndividualModal = false;
    this.openInfoModal('Éxito', 'Registro individual de capacitación guardado.');
  }

  openProgramModal() {
    this.newProgram = {
      trainingName: '',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      startDate: '',
      endDate: '',
      situation: 'Programada',
      totalSlots: 20
    };
    this.showProgramModal = true;
  }

  confirmProgram() {
    if (!this.newProgram.trainingName.trim() || !this.newProgram.startDate || !this.newProgram.endDate) {
      this.openInfoModal('Validación', 'Completa nombre, fecha inicio y fecha término.');
      return;
    }

    const newProgramId = Date.now();
    this.programDataSource.data = [
      {
        id: newProgramId,
        trainingName: this.newProgram.trainingName.trim(),
        laboratory: this.newProgram.laboratory,
        startDate: this.formatDate(this.newProgram.startDate),
        endDate: this.formatDate(this.newProgram.endDate),
        situation: this.newProgram.situation,
        totalSlots: Number(this.newProgram.totalSlots),
        enrolledCount: 0
      },
      ...(this.programDataSource.data as any[])
    ];
    this.programParticipants[newProgramId] = [];
    this.showProgramModal = false;
    this.applyProgramFilters();
    this.openInfoModal('Éxito', 'Programación de capacitación registrada.');
  }

  openEnrollmentModal(program: any) {
    this.selectedProgram = program;
    this.selectedProgramParticipants = this.programParticipants[program.id] ?? [];
    this.enrollmentPerson = this.availablePersonnel[0];
    this.enrollmentAttendance = 'Pendiente';
    this.enrollmentGrade = null;
    this.enrollmentCertificate = '';
    this.showEnrollmentModal = true;
  }

  addEnrollment() {
    if (!this.selectedProgram) return;
    const participants = this.programParticipants[this.selectedProgram.id] ?? [];
    if (participants.some((item: any) => item.person === this.enrollmentPerson)) {
      this.openInfoModal('Validación', 'El personal ya está matriculado en esta capacitación.');
      return;
    }
    participants.push({
      person: this.enrollmentPerson,
      attendance: this.enrollmentAttendance,
      grade: this.enrollmentGrade,
      certificate: this.enrollmentCertificate.trim()
    });
    this.programParticipants[this.selectedProgram.id] = participants;
    this.selectedProgramParticipants = participants;
    this.updateProgramEnrolledCount(this.selectedProgram.id, participants.length);
  }

  removeEnrollment(person: string) {
    if (!this.selectedProgram) return;
    const participants = (this.programParticipants[this.selectedProgram.id] ?? []).filter((item: any) => item.person !== person);
    this.programParticipants[this.selectedProgram.id] = participants;
    this.selectedProgramParticipants = participants;
    this.updateProgramEnrolledCount(this.selectedProgram.id, participants.length);
  }

  viewIndividual(row: any) {
    this.openInfoModal(
      'Detalle de registro individual',
      `Personal: ${row.person}\nTipo: ${row.trainingType}\nCapacitación: ${row.trainingName}\nInstitución: ${row.institution}\nHoras: ${row.hours}\nEvidencia: ${row.evidence || 'No adjunta'}\nURL: ${row.url || 'No registrada'}`
    );
  }

  viewProgram(row: any) {
    this.openInfoModal(
      'Detalle de programación',
      `Capacitación: ${row.trainingName}\nInicio: ${row.startDate}\nTérmino: ${row.endDate}\nSituación: ${row.situation}\nTotal inscritos: ${row.totalSlots}\nInscritos: ${row.enrolledCount}`
    );
  }

  closeInfoModal() {
    this.showInfoModal = false;
  }

  closeProgramModal() {
    this.showProgramModal = false;
  }

  closeIndividualModal() {
    this.showIndividualModal = false;
  }

  closeEnrollmentModal() {
    this.showEnrollmentModal = false;
  }

  private openInfoModal(title: string, message: string) {
    this.infoTitle = title;
    this.infoMessage = message;
    this.showInfoModal = true;
  }

  private applyProgramFilters() {
    this.programDataSource.filter = JSON.stringify({
      search: this.searchProgram.trim().toLowerCase(),
      situation: this.selectedSituation
    });
    if (this.programDataSource.paginator) this.programDataSource.paginator.firstPage();
  }

  private updateProgramEnrolledCount(programId: number, enrolledCount: number) {
    this.programDataSource.data = (this.programDataSource.data as any[]).map((item) =>
      item.id === programId ? { ...item, enrolledCount } : item
    );
  }

  private formatDate(value: string) {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(value));
  }

  buildExternalUrl(value: string): string {
    const url = (value || '').trim();
    if (!url) return '#';
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }
}