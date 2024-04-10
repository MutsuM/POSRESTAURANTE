import { Component, OnInit } from '@angular/core';
import { PrefixUrl } from '../../../core/constants/index';
import { ClientDTO } from '../../../core/interfaces/ClientDTO';
import { ClientTransformer, ClientsTransformer } from '../../../core/transformers/ClientTransformer';
import { fields } from '../../../core/helpers/validateFields';
import { ClientService } from '../../../core/services/Client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  Prefix = PrefixUrl;
  client: ClientDTO = {
    names: '',
    lastNameFat: '',
    lastNameMot: '',
    gender: 'M',
    telephone: '',
    email: '',
    province: '',
    dateBirth: '',
    identity: '0',
    direction: '',
    city: '',
    postalCode: '0',
    infoClinical: '',
    notes: '',
    sendSms: true,
    sendEmail: true,
    active: true,
  }
  validates: [] = [];
  constructor(
    private clientService: ClientService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }

  saveClient() {
    const response: any = fields(this.client);
    this.validates = (!response) ? [] : response;
    if (!response) {
      this.client.dateBirth = this.client.dateBirth + "T00:00:00"
      this.clientService.save(ClientTransformer(this.client)).subscribe(
        (response: any) => {
          this.toastr.success('Product update successfully');
          this.cleanForm();
        }
      );
    }
  }

  selectedGender() {
    this.client = {
      ...this.client,
      gender: this.client.gender
    }

  }

  cleanForm() {
    this.client = {
      names: '',
      lastNameFat: '',
      lastNameMot: '',
      gender: 'M',
      telephone: '',
      email: '',
      province: '',
      dateBirth: '',
      identity: '0',
      direction: '',
      city: '',
      postalCode: '0',
      infoClinical: '',
      notes: '',
      sendSms: false,
      sendEmail: false,
      active: false,
    };
  }
}
