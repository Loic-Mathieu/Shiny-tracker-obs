import {Directive, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

/**
 * ========================
 * This directive was found here
 * https://medium.com/@shelkarvijay94/angular-mat-autocomplete-with-infinite-scroll-1caca9aebccf
 * ========================
 */

export interface IAutoCompleteScrollEvent {
	autoComplete: MatAutocomplete;
	scrollEvent: Event;
}

@Directive({
	selector: 'mat-autocomplete[optionsScroll]'
})
export class OptionsScrollDirective implements OnDestroy {

	@Input() thresholdPercent = .8;
	@Output('optionsScroll') scroll = new EventEmitter<IAutoCompleteScrollEvent>();
	onDestroy = new Subject();

	constructor(public autoComplete: MatAutocomplete) {
		this.autoComplete.opened.pipe(
			tap(() => {
				/** Note: When autocomplete raises opened, panel is not yet created (by Overlay)
				 *  Note: The panel will be available on next tick
				 *  Note: The panel wil NOT open if there are no options to display
				 */
				setTimeout(() => {
					/** Note: remove listner just for safety, in case the close event is skipped. */
					this.removeScrollEventListener();
					this.autoComplete.panel.nativeElement
						.addEventListener('scroll', this.onScroll.bind(this));
				});
			}),
			takeUntil(this.onDestroy)).subscribe();

		this.autoComplete.closed.pipe(
			tap(() => this.removeScrollEventListener()),
			takeUntil(this.onDestroy)).subscribe();
	}

	onScroll(event: any): void {
		if (this.thresholdPercent === undefined) {
			this.scroll.next({autoComplete: this.autoComplete, scrollEvent: event});
		} else {
			const threshold = this.thresholdPercent * 100 * event.target.scrollHeight / 100;
			const current = event.target.scrollTop + event.target.clientHeight;
			if (current > threshold) {
				this.scroll.next({autoComplete: this.autoComplete, scrollEvent: event});
			}
		}
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		this.onDestroy.complete();
		this.removeScrollEventListener();
	}

	private removeScrollEventListener(): void {
		if (this.autoComplete && this.autoComplete.panel && this.autoComplete.panel.nativeElement) {
			this.autoComplete.panel.nativeElement
				.removeEventListener('scroll', this.onScroll);
		}
	}
}
