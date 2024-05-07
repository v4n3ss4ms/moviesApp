import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActorLocalRepository } from 'src/repositories';
import { Actor, Movie } from 'src/domain';
import { DialogComponent } from '../../../components';
import { CreateMovieCmd, DeleteMovieCmd, EditMovieCmd } from '../../../../application';

export interface DialogData {
  movie: Movie;
}

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DialogComponent],
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent {
  public actors: Actor[] = [];
  public isEdit: boolean = false;
  public submitted: boolean = false;
  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl(0, []),
    actors: new FormControl([] as any, []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private createMovieCmd: CreateMovieCmd,
    private editMovieCmd: EditMovieCmd,
    private actorsService: ActorLocalRepository,
    private deleteMovieCmd: DeleteMovieCmd,
    private dialogRef: MatDialogRef<MovieDialogComponent>
  ) {
    this.formGroup.patchValue({ ...this.data.movie });
  }

  async ngOnInit() {
    this.actors = await this.actorsService.getAll('1');
    this.isEdit = !!this.data.movie?.id;
  }

  async submit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.isEdit) {
        await this.editMovieCmd.execute(
          this.data.movie.id,
          this.formGroup.value as any
        );
      } else {
        await this.createMovieCmd.execute(this.formGroup.value as any);
      }
      this.dialogRef.close();
    }
  }

  async delete() {
    await this.deleteMovieCmd.execute(this.data.movie.id);
    this.dialogRef.close();
  }
}
