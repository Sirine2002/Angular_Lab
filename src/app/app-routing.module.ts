import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolComponent } from './tool/tool.component';
import { ArticleComponent } from './article/article.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'create',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {path:'members',
    pathMatch:'full',
    component:MemberComponent
  },
  {path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {path:'login',
    pathMatch:'full',
    component:LoginComponent
  },
  {path:'edit/:id', //contenu dynamique
    pathMatch:'full',
    component:MemberFormComponent
  },
  {path:'dashboard', 
    pathMatch:'full',
    component:DashboardComponent
  },
  {path:'tools', 
    pathMatch:'full',
    component:ToolComponent
  },
  {path:'articles', 
    pathMatch:'full',
    component:ArticleComponent
  },
  {path:'events', 
    pathMatch:'full',
    component:EventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
