import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'camera',
        children: [
          {
            path: '',
            loadChildren: '../camera/camera.module#CameraPageModule'
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            loadChildren: '../status/status.module#StatusPageModule'
          }
        ]
      },
      {
        path: 'call',
        children: [
          {
            path: '',
            loadChildren: '../call/call.module#CallPageModule'
          }
        ]
      },
      {
        path: 'Chats',
        children: [
          {
            path: '',
            loadChildren: '../chats/chats.module#ChatsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/Chats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/Chats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
