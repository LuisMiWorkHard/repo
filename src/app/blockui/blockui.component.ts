import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blockui',
  templateUrl: './blockui.component.html',
  styleUrls: ['./blockui.component.css']
})
export class BlockuiComponent implements OnInit {
  private loading: string = 'Procesando, espere por favor...';
  @Input() blocked: boolean = false;
  @Input() label: string = '';
  constructor() { }

  ngOnInit(): void {
    if (this.label == null) {
      this.label = this.loading;
    }
    if (this.label != null && this.label == '') {
      this.label = this.loading;
    }
  }

}
