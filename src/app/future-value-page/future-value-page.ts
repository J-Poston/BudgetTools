import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-future-value-page',
  imports: [ReactiveFormsModule],
  templateUrl: './future-value-page.html',
  styleUrl: './future-value-page.css',
})
export class FutureValuePage {

  public futureValueForm = new FormGroup({
    pmt: new FormControl<number>(1000, {nonNullable: true}),
    rate: new FormControl<number>(0.0025, {nonNullable: true}),
    periods: new FormControl<number>(60, {nonNullable: true}),
    presentValue: new FormControl<number>(30000, {nonNullable: true})
  });

  public formValues = computed(() => this.futureValueForm.value);

  public futureValue = computed(() => {

    const vals = this.formValues();
    
    const p = vals.pmt ?? 0;
    const r = vals.rate ?? 0;
    const n = vals.periods ?? 0;
    const pv = vals.presentValue ?? 0;
    
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

}
