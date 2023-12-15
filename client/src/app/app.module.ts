import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// Componentes principales
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainPageComponent } from './shared/main-page/main-page.component';

// Componentes del menú
import { MenuComponent } from './components/mainComponents/menu/menu.component';
import { DishesComponent } from './components/mainComponents/menu/dishes/dishes.component';
import { CarouselDishesComponent } from './components/mainComponents/menu/carousel-dishes/carousel-dishes.component';

import { CategoriesComponent } from './pages/home/components/categories/categories.component'; // Existen dos componentes con el mismo nombre
// import { CategoriesComponent } from './components/mainComponents/categories/categories.component';
// Adicionales
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeComponent } from './pages/home/home.component';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatBadgeModule } from '@angular/material/badge'
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Modales
import { MatDialogModule } from '@angular/material/dialog';

// Otros Útiles
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

// Animations Tailwind
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { DishesBoxComponent } from './pages/home/components/dishes-box/dishes-box.component';
import { CartComponent } from './pages/cart/cart.component';

// Services
import { CartService } from './services/cart.service';
import { BarBytesService } from './services/bar-bytes.service';
import { LoginComponent } from './pages/login/login.component';
import { DishesModalComponent } from './pages/home/modals/dishes-modal/dishes-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    // Componentes principales
    SidebarComponent,
    HeaderComponent,
    MainPageComponent,

    // Componentes del menú
    MenuComponent,
    DishesComponent,
    CarouselDishesComponent,
    // CategoriesComponent,

    // Componentes Home
    HomeComponent,
    ProductsHeaderComponent,
    CategoriesComponent,
    DishesBoxComponent,
    CartComponent,

    // Componente Login
    LoginComponent,
     DishesModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Módulo para hacer peticiones HTTP
    HttpClientModule,

    // Módulo para el carrusel
    CarouselModule,

    // Angular Material
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatFormFieldModule,

    // Modales
    MatDialogModule,
    // Otros Útiles
    FormsModule,

    BrowserAnimationsModule,
  ],
  providers: [CartService, BarBytesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
