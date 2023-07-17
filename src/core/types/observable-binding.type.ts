import { BehaviorSubject, Observable } from 'rxjs';
import { Nullable } from '../utils/nullable';
import { isNullOrEmpty } from '../utils/is-null-or-empty';


export class ObservableBinding<T> {
  public validity = false;
  public previousValue: Nullable<T> = null;
  private readonly valueSubject: BehaviorSubject<Nullable<T>> = new BehaviorSubject<Nullable<T>>(null);
  public value$: Observable<Nullable<T>> = this.valueSubject.asObservable();
  public count = 0;


  public set value(val: Nullable<T>) {
    const current = this.valueSubject.getValue();
    this.previousValue = current;
    this.count++;
    this.valueSubject.next(val);
  }

  public get value(): Nullable<T> {
    return this.valueSubject.getValue();
  }

  constructor(val?: Nullable<T>) {
    if (!isNullOrEmpty(val)) {
      this.value = val;
    }   
  }

  public set(val: Nullable<T>) {
    this.value = val;
  }

  public reset(): void {
    this.value = this.defaultValue(this.value);
    this.validity = false;
  }

  private defaultValue(val: Nullable<T>): any {
    if (typeof val === 'string') { return ''; }
    if (typeof val === 'number') { return 0; }
    if (typeof val === 'boolean') { return false; }
    if (Array.isArray(val)) { return []; }
    return null;
  }
}