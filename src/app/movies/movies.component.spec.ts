import { render, fireEvent, screen } from '@testing-library/angular';
import { MatDialogRef } from '@angular/material/dialog';
import { createMock } from '@testing-library/angular/jest-utils';
import { DeleteMovieCmd, GetMoviesCollectionQry } from "../../application";
import { MoviesComponent } from "./movies.component";
import { of } from 'rxjs';

const A_MOVIES_COLLECTION_RESPONSE = [
  {
    "id": "AN_ID",
    "title": "A_TITLE",
    "year": 1995,
    "rate": 9,
    "actors": ["AN_ACTOR"]
  }, {
    "id": "ANOTHER_ID",
    "title": "ANOTHER_TITLE",
    "year": 2000,
    "rate": 8,
    "actors": ["ANOTHER_ACTOR"]
  }];

const PARTIAL_TITLE = 'PARTIAL_TITLE';
const YEAR = 1967;
const RATE = 8;

describe('MoviesComponent', () => {
  const getMoviesCollectionQry = createMock(GetMoviesCollectionQry);
  getMoviesCollectionQry.execute = jest.fn().mockReturnValue(of(A_MOVIES_COLLECTION_RESPONSE));
  const deleteMovieCmd = createMock(DeleteMovieCmd);
  deleteMovieCmd.execute = jest.fn()

  it('should show movie list', async () => {
    await render(MoviesComponent, {
      componentProviders: [
        { provide: GetMoviesCollectionQry, useValue: getMoviesCollectionQry },
        { provide: DeleteMovieCmd, useValue: deleteMovieCmd },
        { provide: MatDialogRef, useValue: {} }
      ],
    });

    expect(await screen.findByText('A_TITLE')).toBeTruthy();
    expect(screen.getByText('AN_ACTOR')).toBeTruthy();
    expect(screen.getByText('ANOTHER_TITLE')).toBeTruthy();
    expect(screen.getByText('ANOTHER_ACTOR')).toBeTruthy();
  });

  it('should call get movies collection use case when user performs a search', async () => {
    await render(MoviesComponent, {
      componentProviders: [
        { provide: GetMoviesCollectionQry, useValue: getMoviesCollectionQry },
        { provide: DeleteMovieCmd, useValue: deleteMovieCmd },
        { provide: MatDialogRef, useValue: {} }
      ],
    });
    const inputTitle = await screen.findByPlaceholderText('Title');
    const inputYear = screen.getByPlaceholderText('Year');
    const inputRate = screen.getByPlaceholderText('Rate');
    fireEvent.keyUp(inputTitle, { target: { value: PARTIAL_TITLE } });
    fireEvent.keyUp(inputYear, { target: { value: YEAR } });
    fireEvent.keyUp(inputRate, { target: { value: RATE } });

    expect(getMoviesCollectionQry.execute).toHaveBeenLastCalledWith('1', {
      title: PARTIAL_TITLE,
      year: YEAR,
      rate: RATE
    });
  });
});
