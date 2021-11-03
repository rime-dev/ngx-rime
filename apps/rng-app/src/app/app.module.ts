import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ShellModule} from '@rng/ui/shell';
import {AppRoutingModule} from './app-routing.module';
import {UserAccountPopupModule} from '@rng/ui/user-account-popup';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ShellModule, UserAccountPopupModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
