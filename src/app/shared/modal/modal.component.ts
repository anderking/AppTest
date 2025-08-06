import { CommonModule, DecimalPipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalModel } from "@models/shared/modal.model";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DecimalPipe],
  selector: "app-modal",
  templateUrl: "./modal.component.html"
})
export class ModalComponent<T> implements OnInit {
  @Input() data: ModalModel<T>;
  @Output() deleteConfirmed: EventEmitter<any> = new EventEmitter<any>();
  @Output() resultCalculate: EventEmitter<number> = new EventEmitter<number>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  public numberOfDecimal: string = "2";
  public systemDecimal: string = "comma";

  ngOnInit() {
    console.log(this.data);
  }

  closeModal() {
    this.modalClosed.emit();
  }

  confirmDelete() {
    this.deleteConfirmed.emit(this.data.item);
  }

  resultEmit(result: number) {
    this.resultCalculate.emit(result);
  }
}
