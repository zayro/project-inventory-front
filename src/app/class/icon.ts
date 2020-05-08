import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

export class Icon {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'almundo',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/logo-almundo.svg'
      )
    );

  }
}
