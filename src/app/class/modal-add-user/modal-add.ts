import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service';

import { IUser } from '../../models/user';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ngbd-modal-add',
    templateUrl: './modal-add.html',
    styleUrls: ['modal-add.scss'],
    providers: [NgbModalConfig, NgbModal]
})
// tslint:disable-next-line: component-class-suffix
export class NgbdModalAdd {

    public newUser: IUser = {
        name: '',
        email: '',
        role: '',
        password: ''
    };

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
        this.dataService.addNewUser(this.newUser);
        this.newUser.name = '';
        this.newUser.email = '';
        this.newUser.password = '';
    }

}
