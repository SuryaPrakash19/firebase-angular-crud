import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user?.emailVerified) {
          localStorage.setItem('token', 'true');
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        localStorage.removeItem('token');
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Successfully Registered!');
        res.user?.sendEmailVerification().then(
          () => {
            this.router.navigate(['/verify-email']);
          },
          (err) => {
            alert('Unable to send verification mail to the user.');
          }
        );
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert('Something went wrong! Try again later!');
      }
    );
  }
  logout() {
    this.fireauth.signOut().then(
      () => {
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
