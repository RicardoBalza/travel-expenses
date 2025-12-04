import { Component, HostListener, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Declaración de variables globales
declare var AOS: any;
declare var GLightbox: any;
declare var Swiper: any;
declare var PureCounter: any;
declare var ISOTOPE: any;

interface SwiperConfig {
  [key: string]: any;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentYear: number = new Date().getFullYear();
  private scrollTop: HTMLElement | null = null;
  private mobileNavToggleBtn: HTMLElement | null = null;
  private navMenuLinks: NodeListOf<HTMLAnchorElement> | null = null;

  constructor() { }

  ngOnInit(): void {
    this.initializeElements();
    this.setupEventListeners();
  }

  ngAfterViewInit(): void {
    this.initializeLibraries();
    this.initializeAOS();
    this.initializeSwiper();
    this.initializeIsotope();
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  private initializeElements(): void {
    this.scrollTop = document.querySelector('.scroll-top');
    this.mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    this.navMenuLinks = document.querySelectorAll('.navmenu a');
  }

  private setupEventListeners(): void {
    // Toggle mobile navigation
    this.mobileNavToggleBtn?.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      this.mobileNavToggleBtn?.classList.toggle('bi-list');
      this.mobileNavToggleBtn?.classList.toggle('bi-x');
    });

    // Close mobile navigation when clicking on a nav link
    this.navMenuLinks?.forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          this.mobileNavToggleBtn?.classList.toggle('bi-list');
          this.mobileNavToggleBtn?.classList.toggle('bi-x');
        }
      });
    });

    // FAQ toggle
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const item = toggle.closest('.faq-item');
        item?.classList.toggle('faq-active');
      });
    });
  }

  private removeEventListeners(): void {
    // Cleanup event listeners if needed
  }

  private initializeLibraries(): void {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    // Initialize GLightbox
    if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
    }

    // Initialize PureCounter
    if (typeof PureCounter !== 'undefined') {
      new PureCounter({
        selector: '.purecounter',
        start: 0,
        duration: 2000,
        delay: 10,
        once: true,
        repeat: false,
        decimals: 0,
        legacy: true,
        filesizing: false,
        currency: false,
        separator: false
      });
    }
  }

  private initializeAOS(): void {
    // AOS refresh on window resize
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  }

  private initializeSwiper(): void {
    // Initialize Testimonials Swiper
    if (typeof Swiper !== 'undefined') {
      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      });
    }
  }

  private initializeIsotope(): void {
    // Initialize Isotope for portfolio filtering
    if (typeof ISOTOPE !== 'undefined') {
      const portfolioContainer = document.querySelector('.portfolio-container');
      if (portfolioContainer) {
        const portfolioIsotope = new ISOTOPE(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        const portfolioFilters = document.querySelectorAll('#portfolio-flters li');
        portfolioFilters.forEach((filter: Element) => {
          filter.addEventListener('click', (e: Event) => {
            e.preventDefault();
            portfolioFilters.forEach(el => el.classList.remove('filter-active'));
            filter.classList.add('filter-active');
            const filterValue = filter.getAttribute('data-filter');
            if (filterValue) {
              portfolioIsotope.arrange({ filter: filterValue });
            }
          });
        });
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.toggleScrollTop();
  }

  private toggleScrollTop(): void {
    if (window.scrollY > 100) {
      this.scrollTop?.classList.add('active');
    } else {
      this.scrollTop?.classList.remove('active');
    }
  }
}