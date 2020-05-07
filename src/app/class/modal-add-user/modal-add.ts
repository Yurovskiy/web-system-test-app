import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ngbd-modal-add',
    templateUrl: './modal-add.html',
    styleUrls: ['modal-add.scss'],
    providers: [NgbModalConfig, NgbModal]
})
// tslint:disable-next-line: component-class-suffix
export class NgbdModalAdd {

    public profileForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        role: new FormControl('', Validators.required)
    });

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private dataService: DataService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    open(content: any) {
        this.modalService.open(content);
    }

    public addNewUser(): void {
        this.dataService.addNewUser(this.profileForm.value);
    }

}
