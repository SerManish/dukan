import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AlertService {
	sendAlert = new Subject<{ message: string, type: string, duration: number }>();

	//sendalert subject sends details of alert to the alertbar component
	alert(message, type = 'success', duration = 5000) {
		this.sendAlert.next({ message: message, type: type, duration: duration });
	}
}