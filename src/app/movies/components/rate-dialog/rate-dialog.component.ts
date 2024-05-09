import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieDto } from 'src/domain';
import { DialogComponent } from '../../../components';
import { EditMovieCmd } from '../../../../application';
import { MoviesStoreService } from '../../../services';

export interface RateDialogData {
  movie: MovieDto;
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
    private editMovieCmd: EditMovieCmd,
    private moviesStoreService: MoviesStoreService,
    private dialogRef: MatDialogRef<RateDialogComponent>
  ) {
    this.formGroup.patchValue({ rate: this.data.movie.rate });
  }

  async rate() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const updatedMovie:MovieDto = await this.editMovieCmd.execute(
        this.data.movie.id,
        this.formGroup.value as Partial<MovieDto>
      );
      this.moviesStoreService.editMovie(this.data.movie.id,updatedMovie)
      this.dialogRef.close();
    }
  }
}
