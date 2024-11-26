import { NgModule } from '@angular/core';
import { ProveClientSdk } from '@/src/app/core/prove/prove-client-sdk';
import { ProveApiService } from '@/src/app/core/prove/prove-service/prove-api.service';

@NgModule({
  exports: [ProveClientSdk, ProveApiService],
  providers: [ProveClientSdk, ProveApiService],
})
export class ProveModule {}
