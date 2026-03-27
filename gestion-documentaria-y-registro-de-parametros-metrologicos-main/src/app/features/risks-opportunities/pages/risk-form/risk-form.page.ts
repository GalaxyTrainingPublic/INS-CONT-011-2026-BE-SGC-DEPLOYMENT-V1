import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importante para el formulario
import { RiskService } from '../../services/risk.service';
import { Risk, RiskLevel } from '../../models/risk.model';


@Component({
  selector: 'app-risk-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './risk-form.page.html',
  styleUrls: ['./risk-form.page.scss']
})
export class RiskFormPage implements OnInit {
  risk: Risk = this.initRisk();
  // Objeto que se vincula al formulario
  public calculateAllMetrics(): void {
  // Aseguramos que siempre haya números
  const p = this.risk.probability || 0;
  const i = this.risk.impact || 0;
  
  this.risk.value = p * i;
  this.risk.level = this.calculateLevel(this.risk.value);

  this.risk.significant = (this.risk.type === 'Riesgo' && 
                          ['Medio', 'Alto', 'Muy alto'].includes(this.risk.level));

  this.risk.opportunityPromoted = (this.risk.type === 'Oportunidad' && 
                                  ['Alto', 'Muy alto'].includes(this.risk.level));
}

  private initRisk(): Risk {
    return {
      id: 0, process: '', subprocess: '', task: '',
      type: 'Riesgo', description: '', laboratory: 'Metrología',
      causes: '', consequences: '',
      probability: 0, impact: 0, value: 0,
      level: 'Bajo', status: 'Identificado',
      significant: false, opportunityPromoted: false
    };
  }

  isEditMode = false;
  loading = false;
  labs = ['Metrología', 'Biomédica', 'Ensayos', 'Química'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private riskService: RiskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadRisk(Number(id));
    }
  }

  loadRisk(id: number): void {
  this.loading = true;
  this.riskService.getRiskById(id).subscribe({
    next: (data) => {
      if (data) {
        this.risk = { ...data };
        // CRUCIAL: Recalcular métricas para que el UI se actualice
        this.calculateAllMetrics(); 
      } else {
        this.goBack();
      }
      this.loading = false;
    },
    error: (err) => {
      console.error('Error cargando riesgo:', err);
      this.goBack();
    }
  });
}

  onSubmit(): void {
  if (this.isEditMode) {
    this.riskService.updateRisk({ ...this.risk }).subscribe({
      next: () => this.goBack(),
      error: (err) => console.error(err)
    });
  } else {
    // Aseguramos que los cálculos ISO finales se guarden en el objeto
    this.calculateAllMetrics(); 
    
    this.riskService.createRisk({ ...this.risk }).subscribe({
      next: (res) => {
        console.log('Guardado:', res);
        this.goBack();
      },
      error: (err) => console.error(err)
    });
  }
}

  calculateLevel(value: number): RiskLevel {
    if (value < 32) return 'Bajo';
    if (value < 48) return 'Medio';
    if (value < 80) return 'Alto';
    return 'Muy alto';
  }

  goBack(): void {
    this.router.navigate(['/risks-opportunities/list']);
  }
}