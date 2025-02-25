import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { Router } from '@angular/router';
import { TipoService } from './tipo.service';
import { GrupoService } from './grupo.service';
import { AreaService } from './area.service';
import { AtendimentoService } from './atendimento.service';

@Component({
    selector     : 'e-commerce-product',
    templateUrl  : './product.component.html',
    styleUrls    : ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EcommerceProductComponent implements OnInit, OnDestroy
{
    product: Product;
    pageType: string;
    productForm: FormGroup;
    tipos: any;
    grupos: any;
    areas: any;
    atendimentos: any;
    statuses: any = [
        {
            codigo: "1",
            descricao: "Ativo",
        },
        {
            codigo: "0",
            descricao: "Inativo",
        }
    ];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceProductService: EcommerceProductService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private router: Router,
        private tipoService: TipoService,
        private grupoService: GrupoService,
        private areaService: AreaService,
        private atendimentoService: AtendimentoService,
    )
    {
        // Set the default
        this.product = new Product();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update product on changes
        this._ecommerceProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {

                if ( product )
                {
                    this.product = new Product(product);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.product = new Product();
                }

                this.productForm = this.createProductForm();
            });

            this.tipos = this.tipoService.getTipos();

            this.grupos = this.grupoService.getGrupos();

            this.areas = this.areaService.getAreas();

            this.atendimentos = this.atendimentoService.getAtendimentos();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup
    {
        return this._formBuilder.group({
            codigo              : [this.product.codigo],
            descricao           : [this.product.descricao],
            descriweb           : [this.product.descricaoweb],    
            tipo                : [this.product.tipo.codigo],
            grupo               : [this.product.grupo.codigo],
            area                : [this.product.area.codigo],
            atendimento         : [this.product.atendimento.codigo],
            ativo               : [this.product.ativo.codigo],
        });
    }

    /**
     * Save product
     */
    saveProduct(): void
    {
        const data = this.productForm.getRawValue();
        
        this._ecommerceProductService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Demanda salva com sucesso!', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                this.router.navigate(['/apps/demandas/lista']);
            }).catch(() => {
                // Show the success message
                this._matSnackBar.open('Erro ao salvar demanda!', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add product
     */
    addProduct(): void
    {
        const data = this.productForm.getRawValue();

        this._ecommerceProductService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Demanda Criada Com Sucesso!', 'X', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                this.productForm.reset();
                // Change the location with new one
                this.router.navigate(['/apps/demandas/lista']);
                // this._location.go('/apps/demandas/detalhes/' + this.product.codigo);
            }).catch(() => {

                // Show the success message
                this._matSnackBar.open('Erro ao Criar Demanda!', 'X', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }
}
