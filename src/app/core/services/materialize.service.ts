import { Injectable, ElementRef } from '@angular/core';
import * as M from 'materialize-css';

@Injectable({
  providedIn: 'root',
})
export class MaterializeService {
  constructor() {}

  initializeFloatingButton(ref: ElementRef): void {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  initializeModal(ref: ElementRef) {
    return M.Modal.init(ref.nativeElement);
  }

  toast(message: string): void {
    M.toast({html: message})
  }

  updateTextInput(): void {
    M.updateTextFields();
  }
}
