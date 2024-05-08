import { render, fireEvent, screen } from '@testing-library/angular';
import { MatDialogRef } from '@angular/material/dialog';
import { createMock } from '@testing-library/angular/jest-utils';
import { GetActorsCollectionQry } from "../../application";
import { ActorsComponent } from "./actors.component";
import { of } from 'rxjs';

const A_ACTORS_COLLECTION_RESPONSE = [
  {
    "name": "AN_ACTOR",
    "id": "AN_ID"
  },
  {
    "name": "ANOTHER_ACTOR",
    "id": "ANOTHER_ID"
  },];

describe('ActorsComponent', () => {
  const getActorsCollectionQry = createMock(GetActorsCollectionQry);
  getActorsCollectionQry.execute = jest.fn().mockReturnValue(of(A_ACTORS_COLLECTION_RESPONSE));

  it('should show actors list', async () => {
    await render(ActorsComponent, {
      componentProviders: [
        { provide: GetActorsCollectionQry, useValue: getActorsCollectionQry },
        { provide: MatDialogRef, useValue: {} }
      ],
    });

    expect(await screen.findByText('AN_ACTOR')).toBeTruthy();
  });

  it('should call get actors collection use case when user performs a search', async () => {
    const AN_ACTOR = 'AN_ACTOR';

    await render(ActorsComponent, {
      componentProviders: [
        { provide: GetActorsCollectionQry, useValue: getActorsCollectionQry },
        { provide: MatDialogRef, useValue: {} }
      ],
    });

    const input = await screen.findByPlaceholderText('Search');
    fireEvent.keyUp(input, { target: { value: AN_ACTOR } });

    expect(getActorsCollectionQry.execute).toHaveBeenLastCalledWith('1', { name: AN_ACTOR });
  });
});
