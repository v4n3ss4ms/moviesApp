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
import { DialogComponent } from '../../../components';
import { CreateActorCmd } from '../../../../application';

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
    private createActorCmd: CreateActorCmd,
    private dialogRef: MatDialogRef<ActorDialogComponent>
  ) {}

  add() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const createCmd = this.createActorCmd.execute(this.formGroup.value as Partial<Actor>).subscribe(()=>{
        createCmd.unsubscribe();
        this.dialogRef.close();
      });
    }
  }
}
