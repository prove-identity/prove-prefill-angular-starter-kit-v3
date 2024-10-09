import { NgModule } from '@angular/core';
import { DeviceGuard } from './device.guard';
import { DeviceService } from './device.service';

@NgModule({
  exports: [DeviceService, DeviceGuard],
  providers: [DeviceService, DeviceGuard],
})
export class DeviceModule {}
