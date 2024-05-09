import { createMock } from '@testing-library/angular/jest-utils';
import { EditMovieCmd } from '../../../../application';
import { fireEvent, render, screen } from '@testing-library/angular';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RateDialogComponent } from './rate-dialog.component';

const AN_ID = 'AN_ID'
const A_RATE = 8;

const A_MOVIE = {
  'id': AN_ID,
  'title': 'A_TITLE',
  'year': 1995,
  'actors': ['AN_ACTOR']
};

describe('RateDialogComponent',()=>{
  const editMovieCmd = createMock(EditMovieCmd);
  editMovieCmd.execute = jest.fn();

  it('should display error message when form is submitted and rate is not provided', async () => {
    await render(RateDialogComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { movie: A_MOVIE }  },
        { provide: MatDialogRef, useValue: {} },
        { provide: EditMovieCmd, useValue: editMovieCmd },
      ],
    });

    const saveBtn = screen.getByText('Rate!');
    saveBtn.click();

    expect(await screen.findByText('* Please enter a valid rate [0 - 10]')).toBeTruthy();
  });

  it('should display error message when form is submitted and rate is not in range', async () => {
    await render(RateDialogComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { movie: A_MOVIE }  },
        { provide: MatDialogRef, useValue: {} },
        { provide: EditMovieCmd, useValue: editMovieCmd },
      ],
    });

    const titleInput = screen.getByPlaceholderText('rate');
    fireEvent.input(titleInput, { target: { value: 88 } });
    const saveBtn = screen.getByText('Rate!');
    saveBtn.click();

    expect(await screen.findByText('* Please enter a valid rate [0 - 10]')).toBeTruthy();
  });

  it('should call edit movie use case', async () => {
    const dialogRef = createMock(MatDialogRef);
    dialogRef.close = jest.fn();

    await render(RateDialogComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { movie: A_MOVIE }  },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: EditMovieCmd, useValue: editMovieCmd },
      ],
    });

    const titleInput = screen.getByPlaceholderText('rate');
    fireEvent.input(titleInput, { target: { value: A_RATE } });

    const saveBtn = screen.getByText('Rate!');
    saveBtn.click();

    expect(editMovieCmd.execute).toHaveBeenCalledWith(AN_ID,{
      rate: A_RATE,
    });
  });
})
