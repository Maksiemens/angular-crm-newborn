import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  @Input() isLoading!: boolean;
  @Input() error!: string | null;
  @Output() submitted = new EventEmitter<any>();
  public form!: FormGroup;
  get f() {
    return this.form.controls;
  }
  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
