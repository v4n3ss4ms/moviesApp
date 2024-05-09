import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Actor } from 'src/domain';
import { ActorDialogComponent } from './components';
import { GetActorsCollectionQry } from '../../application';

@Component({
  selector: 'app-actors',
  standalone: true,
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent {
  actors: Actor[] = [];
  private search = '';

  constructor(
    private getActorsCollectionQry: GetActorsCollectionQry,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getActorsCollectionQry.execute('1').subscribe(actors => {
      this.actors = actors;
    });
  }

  onSearchChange(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
    const getActors = this.getActorsCollectionQry.execute('1', {
      name: this.search,
    }).subscribe(actors => {
      this.actors = actors;
      getActors.unsubscribe();
    });
  }

  addNew() {
    this.dialog
      .open(ActorDialogComponent, {
        minWidth: '300px',
      })
      .afterClosed()
      .subscribe(() => {
        const getActors = this.getActorsCollectionQry.execute('1', {
          name: this.search,
        }).subscribe(actors => {
          this.actors = actors;
          getActors.unsubscribe();
        });
      });
  }
}
