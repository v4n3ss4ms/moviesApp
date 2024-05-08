import { render, fireEvent, screen } from '@testing-library/angular';
import { ActorDialogComponent } from './actor-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateActorCmd } from '../../../../application';
import { createMock } from '@testing-library/angular/jest-utils';


describe('ActorDialogComponent', () => {

  it('should display error message when form is submitted and name is not provided', async () => {

    const createActorCmd = createMock(CreateActorCmd);
    createActorCmd.execute = jest.fn();

    await render(ActorDialogComponent, {
      componentProviders: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CreateActorCmd, useValue: createActorCmd}
      ],
    });

    const button = screen.getByText('Add!');
    fireEvent.click(button);

    expect(screen.getByText('* Please, Name is required')).toBeTruthy();
  });
});
