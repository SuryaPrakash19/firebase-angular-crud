import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private auth: AuthService) {}
  logout() {
    this.auth.logout();
  }
}
