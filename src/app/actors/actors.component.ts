import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Actor } from 'src/domain';
import { ActorLocalRepository } from 'src/repositories';
import { DialogComponent } from './components/dialog/dialog.component';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent {
  actors: Actor[] = [];
  private search = '';

  constructor(
    private actorRepository: ActorLocalRepository,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.actors = await this.actorRepository.getAll('1');
  }

  async onSearchChange(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
    this.actors = await this.actorRepository.getAll('1', {
      name: this.search,
    });
  }

  addNew() {
    this.dialog
      .open(DialogComponent, {
        minWidth: '300px',
      })
      .afterClosed()
      .subscribe(async () => {
        this.actors = await this.actorRepository.getAll('1', {
          name: this.search,
        });
      });
  }
}
