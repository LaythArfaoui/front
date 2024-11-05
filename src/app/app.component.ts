import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AVAX RESTAURANT';

  // Observable for checking if the current device is a handset (mobile)
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay() // Ensures efficient subscription
    );

  // Constructor to inject BreakpointObserver service
  constructor(private breakpointObserver: BreakpointObserver) {}

  // ngOnInit is where we implement custom breakpoints logic
  ngOnInit(): void {
    const CUSTOM_BREAKPOINTS = {
      smallScreen: '(max-width: 600px)',
      mediumScreen: '(min-width: 601px) and (max-width: 1024px)',
      largeScreen: '(min-width: 1025px)'
    };

    this.breakpointObserver.observe([
      CUSTOM_BREAKPOINTS.smallScreen,
      CUSTOM_BREAKPOINTS.mediumScreen,
      CUSTOM_BREAKPOINTS.largeScreen
    ]).subscribe(result => {
      if (result.breakpoints[CUSTOM_BREAKPOINTS.smallScreen]) {
        console.log('Small screen detected');
        // Apply logic for small screens (e.g., mobile)
      } else if (result.breakpoints[CUSTOM_BREAKPOINTS.mediumScreen]) {
        console.log('Medium screen detected');
        // Apply logic for medium screens (e.g., tablet)
      } else if (result.breakpoints[CUSTOM_BREAKPOINTS.largeScreen]) {
        console.log('Large screen detected');
        // Apply logic for large screens (e.g., desktop)
      }
    });
  }
}
