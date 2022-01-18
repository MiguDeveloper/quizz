import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contador-inicial',
  templateUrl: './contador-inicial.component.html',
  styleUrls: ['./contador-inicial.component.css'],
})
export class ContadorInicialComponent implements OnInit, OnDestroy {
  contador = 3;
  private countdownTimerRef: any = null;

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    this.clearIntervalo();
  }

  ngOnInit(): void {
    this.playContadorInicial();
  }

  playContadorInicial() {
    this.countdownTimerRef = setInterval(() => {
      console.log(this.contador);
      if (this.contador === 0) {
        this.router.navigate(['/jugar/realizarQuizz']);
        return;
      }
      this.contador -= 1;
    }, 1000);
  }

  private clearIntervalo() {
    if (this.countdownTimerRef) {
      clearInterval(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }
}
