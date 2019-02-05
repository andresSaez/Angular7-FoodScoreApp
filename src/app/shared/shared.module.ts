import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneCheckedDirective } from './validators/one-checked.directive';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    OneCheckedDirective,
    ConfirmModalComponent,
    StarRatingComponent
  ],
  exports: [
    OneCheckedDirective,
    ConfirmModalComponent,
    StarRatingComponent
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class SharedModule { }
