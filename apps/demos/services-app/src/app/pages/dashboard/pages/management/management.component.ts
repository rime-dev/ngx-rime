import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {User} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {StorageUploadTaskService} from '@rng/data-access/storage';
import {Feature} from 'ol';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import {Observable, of} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {RequestIfTrueDialogComponent} from '../../../../components/request-if-true-dialog/request-if-true-dialog.component';
import {Group} from '../../../../models/group.model';
import {GroupAddActivityDialogComponent} from './components/group-add-activity-dialog/group-add-activity-dialog.component';
import {GroupAddAdditionalInfoDialogComponent} from './components/group-add-additional-info-dialog/group-add-additional-info-dialog.component';
import {GroupAddEmailDialogComponent} from './components/group-add-email-dialog/group-add-email-dialog.component';
import {GroupAddLogoDialogComponent} from './components/group-add-logo-dialog/group-add-logo-dialog.component';
import {GroupAddNameDialogComponent} from './components/group-add-name-dialog/group-add-name-dialog.component';
import {GroupAddNifDialogComponent} from './components/group-add-nif-dialog/group-add-nif-dialog.component';
import {GroupAddPhoneDialogComponent} from './components/group-add-phone-dialog/group-add-phone-dialog.component';
import {GroupAddWebDialogComponent} from './components/group-add-web-dialog/group-add-web-dialog.component';

@Component({
  selector: 'rng-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  public tabSelected = 0;
  public center: number[] = [];
  public point$: Observable<any[]> = of([]);
  public group$: Observable<EntityState<Group>>;
  public users$: Observable<EntityState<User>[]>;
  public interactions = {
    dragPan: false,
    mouseWheelZoom: false,
    doubleClickZoom: false,
  };
  constructor(
    private dataService: DataService,
    private matDialog: MatDialog,
    private storageUploadTaskService: StorageUploadTaskService
  ) {
    this.group$ = this.dataService.select('Group').entities$.pipe(map((groups) => groups[0]));
    this.users$ = this.dataService.select('User').entities$;
    this.point$ = this.group$.pipe(
      map((group: EntityState<Group>) => [
        new Feature({
          geometry: new Point(fromLonLat(group.data.location.coordinates)),
        }),
      ]),
      delay(0),
      tap({
        next: (features: Feature<Point>[]) => this.setCenterOfMap(features),
      })
    );
  }
  setCenterOfMap(features: Feature<Point>[]) {
    const geometry = features[0].getGeometry();
    if (geometry) {
      this.center = geometry.getCoordinates();
    }
  }
  changeTab(event: number): void {
    this.tabSelected = event;
  }
  addAdditionalInfo(group: EntityState<Group>) {
    if (group) {
      this.matDialog
        .open(GroupAddAdditionalInfoDialogComponent, {
          data: {group},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .pipe(tap({next: (data: any) => this.appendAdditionalInfo(group, data)}))
        .subscribe();
    }
  }
  changeAdditionalInfo(group: EntityState<Group>, info: string, index: number) {
    if (group) {
      this.matDialog
        .open(GroupAddAdditionalInfoDialogComponent, {
          data: {group, info, index},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .pipe(tap({next: (data: any) => this.updateAdditionalInfo(group, index, data)}))
        .subscribe();
    }
  }

  changeName(group: any) {
    if (group) {
      this.matDialog
        .open(GroupAddNameDialogComponent, {
          data: {group},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data && data.name) {
            const data2 = {...group.data, name: data.name};
            const group2 = {...group, data: data2};
            this.dataService.select('Group').update(group2);
          }
        });
    }
  }
  changeEmail(group: any) {
    if (group) {
      this.matDialog
        .open(GroupAddEmailDialogComponent, {
          data: {group},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data && data.email) {
            const data2 = {...group.data, email: data.email};
            const group2 = {...group, data: data2};
            this.dataService.select('Group').update(group2);
          }
        });
    }
  }
  changePhone(group: any) {
    if (group) {
      this.matDialog
        .open(GroupAddPhoneDialogComponent, {
          data: {group},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data && data.phone) {
            const data2 = {...group.data, phone: data.phone};
            const group2 = {...group, data: data2};
            this.dataService.select('Group').update(group2);
          }
        });
    }
  }
  changeWeb(group: any) {
    if (group) {
      this.matDialog
        .open(GroupAddWebDialogComponent, {
          data: {group},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data && data.web) {
            const data2 = {...group.data, web: data.web};
            const group2 = {...group, data: data2};
            this.dataService.select('Group').update(group2);
          }
        });
    }
  }
  changeNif(group: any) {
    if (group) {
      this.matDialog
        .open(GroupAddNifDialogComponent, {
          data: {group},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data && data.nif) {
            const data2 = {...group.data, nif: data.nif};
            const group2 = {...group, data: data2};
            this.dataService.select('Group').update(group2);
          }
        });
    }
  }
  changeActivity(group: any) {
    if (group) {
      this.matDialog
        .open(GroupAddActivityDialogComponent, {
          data: {group},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data && data.activities) {
            const data2 = {...group.data, activities: data.activities};
            const group2 = {...group, data: data2};
            this.dataService.select('Group').update(group2);
          }
        });
    }
  }
  addLogo(group: any) {
    this.matDialog
      .open(GroupAddLogoDialogComponent, {
        data: {path: 'groups', document: group.id},
      })
      .afterClosed()
      .subscribe((documentsURL) => {
        this.addDocuments(group, documentsURL);
      });
  }
  removeLogo(group: any) {
    this.matDialog
      .open(RequestIfTrueDialogComponent, {
        minWidth: '33vw',
      })
      .afterClosed()
      .subscribe((request) => {
        if (request) {
          this.storageUploadTaskService.delete(group.data.logo);
          const data2 = {...group.data, logo: null};
          const group2 = {...group, data: data2};
          this.dataService.select('Group').update(group2);
        }
      });
  }
  private addDocuments(group: any, documents: any[]) {
    if (documents && documents.length > 0) {
      if (group.data.logo) {
        this.storageUploadTaskService.delete(group.data.logo);
      }
      const data2 = {...group.data, logo: documents[0].url};
      const group2 = {...group, data: data2};
      this.dataService.select('Group').update(group2);
    }
  }
  private appendAdditionalInfo(group: any, data: any) {
    if (data && data.additionalInfo) {
      const additionalInfo = [...group.data.additionalInfo];
      additionalInfo.push(data.additionalInfo);
      const data2 = {...group.data, additionalInfo};
      const group2 = {...group, data: data2};
      this.dataService.select('Group').update(group2);
    }
  }
  private updateAdditionalInfo(group: any, index: number, data: any) {
    if (data && data.additionalInfo) {
      let additionalInfo = [...group.data.additionalInfo];
      additionalInfo = additionalInfo.map((info1: string, i: number) =>
        i === index ? data.additionalInfo : info1
      );
      const data2 = {...group.data, additionalInfo};
      const group2 = {...group, data: data2};
      this.dataService.select('Group').update(group2);
    }
  }
}
