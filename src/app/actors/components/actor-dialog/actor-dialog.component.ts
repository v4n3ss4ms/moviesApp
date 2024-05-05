import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actor } from 'src/domain';

import { ActorLocalRepository } from 'src/repositories';
import { DialogComponent } from '../../../components';

export interface DialogData {
  actor: Actor;
}

@Component({
  selector: 'app-actor-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DialogComponent],
  templateUrl: './actor-dialog.component.html',
  styleUrls: ['./actor-dialog.component.scss'],
})
export class ActorDialogComponent {
  public submitted = false;
  public formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private actorRepository: ActorLocalRepository,
    private dialogRef: MatDialogRef<ActorDialogComponent>
  ) {}

  async add() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      await this.actorRepository.create(this.formGroup.value as any);
      this.dialogRef.close();
    }
  }
}
