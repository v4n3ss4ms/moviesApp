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

    const button = screen.getByText('Add!');
    fireEvent.click(button);

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

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: AN_ACTOR } });

    const button = screen.getByText('Add!');
    fireEvent.click(button);

    expect(createActorCmd.execute).toHaveBeenCalledWith({ name: AN_ACTOR });
  });
});
