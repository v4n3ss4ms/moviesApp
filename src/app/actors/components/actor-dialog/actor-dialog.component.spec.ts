import { render, fireEvent, screen } from '@testing-library/angular';
import { ActorDialogComponent } from './actor-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateActorCmd } from '../../../../application';
import { createMock } from '@testing-library/angular/jest-utils';

describe('ActorDialogComponent', () => {
  const createActorCmd = createMock(CreateActorCmd);
  createActorCmd.execute = jest.fn();

  it('should display error message when form is submitted and name is not provided', async () => {
    await render(ActorDialogComponent, {
      componentProviders: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CreateActorCmd, useValue: createActorCmd }
      ],
    });

    const addBtn = screen.getByText('Add!');
    fireEvent.click(addBtn);

    expect(screen.getByText('* Please, Name is required')).toBeTruthy();
  });

  it('should call create actor use case', async () => {
    const AN_ACTOR = 'AN_ACTOR';
    const dialogRef = createMock(MatDialogRef);
    dialogRef.close = jest.fn();

    await render(ActorDialogComponent, {
      componentProviders: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: CreateActorCmd, useValue: createActorCmd }
      ],
    });

    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.input(nameInput, { target: { value: AN_ACTOR } });

    const addBtn = screen.getByText('Add!');
    fireEvent.click(addBtn);

    expect(createActorCmd.execute).toHaveBeenCalledWith({ name: AN_ACTOR });
  });
});
