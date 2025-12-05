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
export class HomeComponent implements OnInit, OnDestroy {
   currentYear: number = new Date().getFullYear();
  activeTab: number = 1;
  activeFaqItem: number = 0;
  mobileNavOpen: boolean = false;
  activeSection: string = 'hero';

  ngOnInit(): void {
    this.initializeAOS();
    this.initializeFAQ();
    this.initializeMobileNav();
    this.initializeScrollTop();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // Initialize AOS (Animate On Scroll) - simulated
  private initializeAOS(): void {
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
      });
    }
  }

  // Handle tab switching for features
  switchTab(tabNumber: number): void {
    this.activeTab = tabNumber;
    // Refresh AOS if available
    if (typeof window !== 'undefined' && (window as any).AOS) {
      setTimeout(() => {
        (window as any).AOS.refresh();
      }, 100);
    }
  }

  // Initialize FAQ functionality
  private initializeFAQ(): void {
    // FAQ toggle will be handled by toggleFaqItem method
  }

  // Toggle FAQ items
  toggleFaqItem(index: number): void {
    this.activeFaqItem = this.activeFaqItem === index ? -1 : index;
  }

  // Initialize mobile navigation
  private initializeMobileNav(): void {
    // Mobile nav toggle will be handled by toggleMobileNav method
  }

  // Toggle mobile navigation
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  // Close mobile nav when a link is clicked
  closeMobileNav(): void {
    this.mobileNavOpen = false;
  }

  // Initialize scroll to top button
  private initializeScrollTop(): void {
    window.addEventListener('scroll', () => {
      this.handleScrollTop();
      this.updateActiveSection();
    });
  }

  // Handle scroll top button visibility
  handleScrollTop(): void {
    const scrollTop = document.getElementById('scroll-top');
    if (scrollTop) {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    }
  }

  // Update active section based on scroll position
  updateActiveSection(): void {
    const sections = ['hero', 'about', 'features', 'services', 'faq', 'contact'];
    const scrollPosition = window.scrollY + 200;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  // Scroll to top
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Smooth scroll for anchor links
  smoothScroll(event: Event, target: string): void {
    event.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMobileNav();
    }
  }
}