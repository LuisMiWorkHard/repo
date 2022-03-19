import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TimelineModule } from 'primeng/timeline';
import { PasswordModule } from 'primeng/password';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlockuiComponent } from './blockui/blockui.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthInterceptorService } from './services/AuthInterceptorService';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ColorPickerModule } from 'primeng/colorpicker';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';

import localeesUs from '@angular/common/locales/es-US';
import { registerLocaleData } from '@angular/common';
import { IdentificarComponent } from './docente/identificar/identificar.component';
import { EditorComponent } from './envio-masivo/correo/editor/editor.component';
registerLocaleData(localeesUs, 'es-US');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlockuiComponent,
    LoginComponent,
    NotfoundComponent,
    IdentificarComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    MenubarModule,
    CardModule,
    ProgressBarModule,
    PanelModule,
    ProgressSpinnerModule,
    BlockUIModule,
    ToastModule,
    MenuModule,
    PanelMenuModule,
    DividerModule,
    ConfirmDialogModule,
    TableModule,
    ChipModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    PaginatorModule,
    TimelineModule,
    PasswordModule,
    ChartModule,
    TabViewModule,
    InputSwitchModule,
    SliderModule,
    InputNumberModule,
    ColorPickerModule,
    EditorModule,
    ToggleButtonModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      "radius": 60,
      "space": -14,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 14,
      "outerStrokeColor": "#348ac7",
      "outerStrokeGradientStopColor": "#4882c2",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 14,
      "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false
      /* "lazy": true */
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {
    provide: LOCALE_ID, useValue: 'es-US'
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
