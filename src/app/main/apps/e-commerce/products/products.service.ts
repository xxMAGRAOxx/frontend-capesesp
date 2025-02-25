import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class EcommerceProductsService implements Resolve<any>
{
    apiUrl: string = environment.api_url;
    products: any[];
    onProductsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts()
            ]).then(
                () => {
                    resolve(true);
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.apiUrl)
                .subscribe((response: any) => {
                    this.products = response.data;
                    this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Delete product
     *
     * @returns {Promise<any>}
     */
    remove(product: any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.apiUrl}/${product.codigo}`)
                .subscribe(() => {
                    const indice = this.products.indexOf(product);

                    if (indice !== -1) {
                      this.products.splice(indice, 1);
                    }
                    
                    this.onProductsChanged.next(this.products);

                    resolve(this.products);
                }, reject);
        });
    }
}
