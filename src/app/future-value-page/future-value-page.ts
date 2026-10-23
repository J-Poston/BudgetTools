import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-future-value-page',
  imports: [ReactiveFormsModule],
  templateUrl: './future-value-page.html',
  styleUrl: './future-value-page.css',
})
export class FutureValuePage {

  public pmt = signal<number>(0);
  public monthlyRate = signal<number>(0);
  public numPeriods = signal<number>(0);
  public presentValue = signal<number>(0);

  public futureValue = computed(() => {
    const p = this.pmt();
    const r = this.monthlyRate();
    const n = this.numPeriods();
    const pv = this.presentValue();
    
    let rawValue:number = 0;

    if(r === 0){
      rawValue = pv + (p * n);
    }

    const fvOfPrincipal = pv * Math.pow(1 + r, n);
    const fvOfAnnuity = p * ((Math.pow(1 + r, n) -1)/r);

    rawValue = fvOfPrincipal + fvOfAnnuity;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(rawValue);

  });

  public futureValueForm = new FormGroup({
    pmt: new FormControl<number>(0),
    rate: new FormControl<number>(0),
    periods: new FormControl<number>(0),
    presentValue: new FormControl<number>(0)
  });

  ngOnInit() {
    this.futureValueForm.valueChanges
      .subscribe(values => {
        this.pmt.set(values.pmt ?? 0);
        this.monthlyRate.set(values.rate ?? 0); 
        this.numPeriods.set(values.periods ?? 0);
        this.presentValue.set(values.presentValue ?? 0);
      });
  }

}
