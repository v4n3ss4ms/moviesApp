import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieLocalRepository } from 'src/repositories';
import { Movie } from 'src/domain';
import { DialogComponent } from '../../../components';

export interface RateDialogData {
  movie: Movie;
}

@Component({
  selector: 'app-rate-dialog',
  standalone: true,
    imports: [ReactiveFormsModule, FormsModule, DialogComponent],
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss'],
})
export class RateDialogComponent {
  public submitted = false;
  public formGroup = new FormGroup({
    rate: new FormControl(0, [
      Validators.required,
      Validators.max(10),
      Validators.min(0),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RateDialogData,
    private moviesService: MovieLocalRepository,
    private dialogRef: MatDialogRef<RateDialogComponent>
  ) {
    this.formGroup.patchValue({ rate: this.data.movie.rate });
  }

  async rate() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      await this.moviesService.edit(
        this.data.movie.id.toString(),
        this.formGroup.value as any
      );
      this.dialogRef.close();
    }
  }
}
