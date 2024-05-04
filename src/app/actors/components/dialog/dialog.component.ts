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

export interface DialogData {
  actor: Actor;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public submitted = false;
  public formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private actorRepository: ActorLocalRepository,
    private dialogRef: MatDialogRef<DialogComponent>
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
