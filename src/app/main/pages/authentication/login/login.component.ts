import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    processing = false;
    rememberMe: boolean;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.rememberMe = localStorage.getItem('matricula') ? true : false;

        let loginForm = this._formBuilder.group({
            matricula: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
            password: ['', Validators.required],
            rememberMe: [this.rememberMe]
        });

        // Matrícula somente números
        loginForm.get('matricula').valueChanges.subscribe((value) => {
            loginForm.get('matricula').setValue(value.replace(/\D/g, ''), { emitEvent: false });
        });

        loginForm.updateValueAndValidity();

        this.loginForm = loginForm;
    }

    login(): void {
        if (this.loginForm.valid) {
            this.processing = true;
            this._fuseProgressBarService.show();

            let rememberMe = this.loginForm.get('rememberMe').value;
            if (rememberMe) {
                localStorage.setItem('matricula', this.loginForm.get('matricula').value);
            }

            const login = this.authService.login(this.loginForm.get('matricula').value, this.loginForm.get('password').value);
            
            this._fuseProgressBarService.hide();

            if(login) {
                this.router.navigate(['/apps/demandas/lista']);
            } else {
                this.snackBar.open('Matrícula ou senha inválida!', 'OK', {
                    verticalPosition: 'top',
                    duration        : 5000
                });
            }

            
            this.processing = false;           
            
        }
    }
}
