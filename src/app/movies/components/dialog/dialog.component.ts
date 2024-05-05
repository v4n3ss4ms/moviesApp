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
import { MovieLocalRepository } from 'src/repositories';
import { Actor, Movie } from 'src/domain';

export interface DialogData {
  movie: Movie;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public actors: Actor[] = [];
  public submitted = false;
  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl(0, []),
    actors: new FormControl([] as any, []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private moviesService: MovieLocalRepository,
    private actorsService: ActorLocalRepository,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.formGroup.patchValue({ ...this.data.movie });
  }

  async ngOnInit() {
    this.actors = await this.actorsService.getAll('1');
  }

  async submit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.data.movie?.id) {
        await this.moviesService.edit(
          this.data.movie.id.toString(),
          this.formGroup.value as any
        );
      } else {
        await this.moviesService.create(this.formGroup.value as any);
      }
      this.dialogRef.close();
    }
  }

  async delete() {
    await this.moviesService.delete(this.data.movie.id.toString());
    this.dialogRef.close();
  }
}
