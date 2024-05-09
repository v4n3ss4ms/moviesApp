import { createMock } from '@testing-library/angular/jest-utils';
import {
  CreateMovieCmd,
  DeleteMovieCmd,
  EditMovieCmd,
  GetActorsCollectionQry
} from '../../../../application';
import { fireEvent, render, screen } from '@testing-library/angular';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieDialogComponent } from './movie-dialog.component';

const A_ACTORS_COLLECTION_RESPONSE = [
  {
    'name': 'AN_ACTOR',
    'id': 'AN_ID'
  },
  {
    'name': 'ANOTHER_ACTOR',
    'id': 'ANOTHER_ID'
  },];

const A_MOVIE = {
  'id': 'AN_ID',
  'title': 'A_TITLE',
  'year': 1995,
  'rate': 9,
  'actors': ['AN_ACTOR']
};

const ANOTHER_TITLE = 'ANOTHER_TITLE';
const A_YEAR = 1995;

describe('MovieDialogComponent', () => {
  const createMovieCmd = createMock(CreateMovieCmd);
  createMovieCmd.execute = jest.fn();
  const editMovieCmd = createMock(EditMovieCmd);
  editMovieCmd.execute = jest.fn();
  const getActorsCollectionQry = createMock(GetActorsCollectionQry);
  getActorsCollectionQry.execute = jest.fn().mockReturnValue(A_ACTORS_COLLECTION_RESPONSE);
  const deleteMovieCmd = createMock(DeleteMovieCmd);
  deleteMovieCmd.execute = jest.fn();

  it('should display error message when form is submitted and title is not provided', async () => {
    await render(MovieDialogComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CreateMovieCmd, useValue: createMovieCmd },
        { provide: EditMovieCmd, useValue: editMovieCmd },
        { provide: GetActorsCollectionQry, useValue: getActorsCollectionQry },
        { provide: DeleteMovieCmd, useValue: deleteMovieCmd },
      ],
    });

    const saveBtn = screen.getByText('Save!');
    saveBtn.click();

    expect(await screen.findByText('* Please, Title is required')).toBeTruthy();
  });

  it('should call delete movie use case', async () => {
    const dialogRef = createMock(MatDialogRef);
    dialogRef.close = jest.fn();

    await render(MovieDialogComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { movie: A_MOVIE } },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: CreateMovieCmd, useValue: createMovieCmd },
        { provide: EditMovieCmd, useValue: editMovieCmd },
        { provide: GetActorsCollectionQry, useValue: getActorsCollectionQry },
        { provide: DeleteMovieCmd, useValue: deleteMovieCmd },
      ],
    });

    const deleteBtn = await screen.findByText('Delete!');
    deleteBtn.click();

    expect(deleteMovieCmd.execute).toHaveBeenCalled();
  });

  it('should call edit movie use case', async () => {
    const dialogRef = createMock(MatDialogRef);
    dialogRef.close = jest.fn();

    await render(MovieDialogComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { movie: A_MOVIE } },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: CreateMovieCmd, useValue: createMovieCmd },
        { provide: EditMovieCmd, useValue: editMovieCmd },
        { provide: GetActorsCollectionQry, useValue: getActorsCollectionQry },
        { provide: DeleteMovieCmd, useValue: deleteMovieCmd },
      ],
    });

    const titleInput = screen.getByPlaceholderText('title');
    fireEvent.input(titleInput, { target: { value: ANOTHER_TITLE } });

    const saveBtn = screen.getByText('Save!');
    saveBtn.click();

    expect(editMovieCmd.execute).toHaveBeenCalledWith('AN_ID',{
      title: ANOTHER_TITLE,
      year: 1995,
      actors: ['AN_ACTOR'],
    });
  });

  it('should call create movie use case', async () => {
    const dialogRef = createMock(MatDialogRef);
    dialogRef.close = jest.fn();

    await render(MovieDialogComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: CreateMovieCmd, useValue: createMovieCmd },
        { provide: EditMovieCmd, useValue: editMovieCmd },
        { provide: GetActorsCollectionQry, useValue: getActorsCollectionQry },
        { provide: DeleteMovieCmd, useValue: deleteMovieCmd },
      ],
    });

    const titleInput = screen.getByPlaceholderText('title');
    fireEvent.input(titleInput, { target: { value: ANOTHER_TITLE } });
    const yearInput = screen.getByPlaceholderText('year');
    fireEvent.input(yearInput, { target: { value: A_YEAR } });
    const saveBtn = screen.getByText('Save!');
    saveBtn.click();

    expect(createMovieCmd.execute).toHaveBeenCalledWith({
      title: ANOTHER_TITLE,
      year: 1995,
      actors: [],
    });
  });
});
