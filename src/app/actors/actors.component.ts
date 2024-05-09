import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActorFilters } from 'src/domain';
import { ActorDialogComponent } from './components';
import { GetActorsCollectionQry } from '../../application';
import { ActorsStoreService } from '../services/actors-store.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-actors',
  standalone: true,
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
  imports: [
    AsyncPipe
  ]
})
export class ActorsComponent {
  private filter: ActorFilters = { name: '' };
  actors$ = this.actorsStoreService.actors$;

  constructor(
    private getActorsCollectionQry: GetActorsCollectionQry,
    private actorsStoreService: ActorsStoreService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getMoviesCollection();
  }

  async getMoviesCollection() {
    const actors = await this.getActorsCollectionQry.execute('1', this.filter);
    this.actorsStoreService.setActors(actors);
  }

  async onSearchChange(e: Event) {
    this.filter.name = (e.target as HTMLInputElement).value;
    await this.getMoviesCollection();
  }

  addNew() {
    this.dialog
      .open(ActorDialogComponent, {
        minWidth: '300px',
      })
      .afterClosed()
      .subscribe(async () => {
        await this.getMoviesCollection();
      });
  }
}
