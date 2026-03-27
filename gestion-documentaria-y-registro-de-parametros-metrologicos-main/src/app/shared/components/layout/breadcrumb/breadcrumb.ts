import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../../services/breadcrumb-service';


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styles: ``,
})
export class Breadcrumb{
  public breadcrumbService = inject(BreadcrumbService);
}
