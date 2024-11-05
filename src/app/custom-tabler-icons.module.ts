import { NgModule } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

@NgModule({
  imports: [TablerIconsModule.pick(TablerIcons)],
  exports: [TablerIconsModule], // Export the module to be used in other components
})
export class CustomTablerIconsModule {}