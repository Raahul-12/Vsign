import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
    MatButtonModule, MatIconModule, MatSnackBar, MatSnackBarModule, MatDialogModule, MatToolbarModule,
    MAT_DATE_LOCALE, MatProgressSpinnerModule, MatProgressBarModule, MatExpansionModule, MatTableModule, MatDatepickerModule, MatFormFieldModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDividerModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSortModule, MatTabsModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {
    FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule, FuseCountdownModule,
    FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule
} from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { NgxPrintModule } from 'ngx-print';
import { NgxFilesizeModule } from 'ngx-filesize';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { NotificationSnackBarComponent } from './notifications/notification-snack-bar/notification-snack-bar.component';
import { DatePipe } from '@angular/common';
import { NotificationDialogComponent } from './notifications/notification-dialog/notification-dialog.component';
import { WINDOW_PROVIDERS } from './window.providers';
import { AuthInterceptorService } from './services/auth-interceptor.service';
// import { PaymentModule } from './allModules/payment/payment.module';
import { BnNgIdleService } from 'bn-ng-idle';
import { InformationDialogComponent } from './notifications/information-dialog/information-dialog.component';
import { ASNReleaseDialogComponent } from './notifications/asnrelease-dialog/asnrelease-dialog.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDonutChartModule } from 'ngx-doughnut-chart';
import { ChartsModule } from 'ng2-charts';
import { AttachmentViewDialogComponent } from './notifications/attachment-view-dialog/attachment-view-dialog.component';
import { AttachmentDialogComponent } from './notifications/attachment-dialog/attachment-dialog.component';
import { VsignMainComponent } from './vsign-main/vsign-main.component';
import { DashboardComponent } from './allModules/dashboard/dashboard.component';
import { CategoryBuilderComponent } from './allModules/category-builder/category-builder.component';
import { DocumentComponent } from './allModules/document/document.component';
import { DocumentSearchComponent } from './allModules/document-search/document-search.component';
import { SigningComponent } from './allModules/signing/signing.component';
// import { ChatModule } from './allModules/chat/chat.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxUploaderModule } from 'ngx-uploader';

import { PopupcreateComponent } from './allModules/document/popupcreate/popupcreate.component';
import { SigndocumentComponent } from './allModules/signing/signdocument/signdocument.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SettingsComponent } from './allModules/master/settings/settings.component';
const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './allModules/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'pages',
        loadChildren: './allModules/pages/pages.module#PagesModule'
    },

    {
        path: 'visgn-dashboard',
        component: DashboardComponent
    },
    {
        path: 'createDoc',
        component: DocumentComponent
    },
    {
        path: 'doc-search',
        component: DocumentSearchComponent
    },
    {
        path: 'category-builder',
        component: CategoryBuilderComponent

    },
    {
        path: 'signDoc',
        component: SigningComponent
    },
    {
        path: 'popupcreate',
        component: PopupcreateComponent
    },
    // {
    //     path: 'asn',
    //     loadChildren: './allModules/asn/asn.module#ASNModule'
    // },
    // {
    //     path: 'poflip',
    //     loadChildren: './allModules/po-flip/po-flip.module#POFlipModule'
    // },
    // {
    //     path: 'gate',
    //     loadChildren: './allModules/gate/gate.module#GateModule'
    // },
    // {
    //     path: 'orderfulfilment',
    //     loadChildren: './allModules/order-fulfilment/order-fulfilment.module#OrderFulfilmentModule'
    // },
    {
        path: 'master',
        loadChildren: './allModules/master/master.module#MasterModule'
    },
    {
        path: 'configuration',
        loadChildren: './allModules/configurationn/configuration.module#ConfigurationModule'
    },
    {
        path: 'audit',
        loadChildren: './allModules/audit/audit.module#AuditModule'
    },
    // {
    //     path: 'invoice',
    //     loadChildren: './allModules/invoice/invoice.module#InvoiceModule'
    // },
    // {
    //     path: 'payment',
    //     loadChildren: './allModules/payment/payment.module#PaymentModule'
    // },
    // {
    //     path: 'fact',
    //     loadChildren: './allModules/fact/fact.module#FactModule'
    // },
    // {
    //     path: 'reports',
    //     loadChildren: './allModules/reports/reports.module#ReportsModule'
    // },
    // {
    //     path: 'customer',
    //     loadChildren: './allModules/customer/customer.module#CustomerModule'
    // },
    // {
    //     path: 'buyer',
    //     loadChildren: './allModules/buyer/buyer.module#BuyerModule'
    // },
    // {
    //     path: 'rfq',
    //     loadChildren: './allModules/rfq/rfq.module#RFQModule'
    // },
    // {
    //     path: 'subcon',
    //     loadChildren: './allModules/subcon/subcon.module#SubconModule'
    // },
    // {
    //     path: 'payment',
    //     loadChildren: './allModules/payment/payment.module#PaymentModule'
    // },
    // {
    //     path: 'quality',
    //     loadChildren: './allModules/quality/quality.module#QaulityModule'
    // },
    // {
    //     path: 'support',
    //     loadChildren: './allModules/support/support.module#SupportModule'
    // },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NotificationSnackBarComponent,
        NotificationDialogComponent,
        AttachmentDialogComponent,
        AttachmentViewDialogComponent,
        InformationDialogComponent,
        ASNReleaseDialogComponent,
        VsignMainComponent,
        DashboardComponent,
        SigningComponent,
        CategoryBuilderComponent,
        DocumentSearchComponent,
        DocumentComponent,
        PopupcreateComponent,
        SigndocumentComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, useHash: true }),

        TranslateModule.forRoot(),
        // NgMultiSelectDropDownModule.forRoot(),
        NgxFilesizeModule,
        SignaturePadModule,
        NgxDropzoneModule,

        // Material moment date module
        MatMomentDateModule,
        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        MatToolbarModule,
        MatExpansionModule,
        DragDropModule,
        NgxUploaderModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatDatepickerModule,
        // App modules
        LayoutModule,

        MatFormFieldModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,

        NgxChartsModule,
        NgxDonutChartModule,

        ChartsModule,

        FuseSharedModule,
        FuseSidebarModule,

        FuseCountdownModule,
        FuseHighlightModule,
        FuseMaterialColorPickerModule,
        FuseWidgetModule,
        // NgMultiSelectDropDownModule,

        FormsModule,
        NgxPrintModule,
        PdfJsViewerModule
        // ElementModule
        // AuditModule,
        // ChatModule
    ],
    providers: [
        DatePipe,
        WINDOW_PROVIDERS,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
        BnNgIdleService,
        TranslateService
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        NotificationDialogComponent,
        AttachmentDialogComponent,

        AttachmentViewDialogComponent,
        InformationDialogComponent,
        ASNReleaseDialogComponent,
        DocumentComponent,
        SigndocumentComponent
    ]
})
export class AppModule {
}
