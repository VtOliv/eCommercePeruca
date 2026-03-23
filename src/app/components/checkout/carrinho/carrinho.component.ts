import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnChanges, inject, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services & Models
import { StorageService } from 'src/app/services/storage.service';
import { Carrinho } from 'src/app/model/carrinho';
import { Cupom } from 'src/app/model/cupom';
import { RequisicoesService } from 'src/app/services/requisicoes.service';

// NGX-Bootstrap
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, ModalModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit, OnChanges, OnDestroy {
  private storage = inject(StorageService);
  private modalService = inject(BsModalService);
  private requisicoes = inject(RequisicoesService);
  private destroy$ = new Subject<void>();

  // Propriedades com Tipagem Estrita
  public carrinho: Carrinho[] = [];
  public subTotal: number = 0;
  public cupomAtivo: Cupom | null = null;
  public cupons: Cupom[] = [];
  public valorCupom: number = 0;
  public modalRef?: BsModalRef;

  @Input() frete: number = 0;
  @Output() enviarCupom = new EventEmitter<Cupom>();

  ngOnInit(): void {
    this.atualizarDadosCarrinho();
    this.carregarCupons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se o frete mudar, ou se precisarmos forçar um recálculo
    if (changes['frete']) {
      this.atualizarDadosCarrinho();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private carregarCupons(): void {
    this.requisicoes.getCupons()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.cupons = data,
        error: (err) => console.error('Erro ao carregar cupons', err)
      });
  }

  public atualizarDadosCarrinho(): void {
    const dados = this.storage.recuperarCarrinho();
    this.carrinho = dados ?? [];
    this.calcularSubTotal();
  }

  private calcularSubTotal(): void {
    this.subTotal = this.carrinho.reduce((acc, item) => {
      // O "?" garante que se o produto ou valor for nulo, o app não trave
      const valor = item.produto?.valorProduto ?? 0;
      return acc + (item.quantidade * valor);
    }, 0);
  }

  public abrirModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  public adicionarCupom(cupom: Cupom): void {
    this.cupomAtivo = cupom;
  }

  public mandarCupom(cupom: Cupom): void {
    this.modalRef?.hide();
    this.enviarCupom.emit(cupom);
  }
}