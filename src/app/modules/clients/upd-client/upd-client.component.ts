import { Component, OnInit } from '@angular/core';
import { URL } from '../../../core/helpers/url';
import { PrefixUrl } from '../../../core/constants/index';
import { ClientDTO } from '../../../core/interfaces/ClientDTO';
import { ClientService } from '../../../core/services/Client.service';
import { ClientTransformer, ClientsTransformer } from '../../../core/transformers/ClientTransformer';
import { fields } from '../../../core/helpers/validateFields';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upd-client',
  templateUrl: './upd-client.component.html',
  styleUrls: ['./upd-client.component.css']
})
export class UpdClientComponent implements OnInit {

  Prefix = PrefixUrl;

  clientId: string = this.url.latestUrl();
  client: ClientDTO = {
    clientId: 0,
    names: '',
    lastNameFat: '',
    lastNameMot: '',
    gender: '',
    telephone: '',
    email: '',
    province: '',
    dateBirth: '',
    identity: '',
    direction: '',
    city: '',
    postalCode: '',
    infoClinical: '',
    notes: '',
    sendSms: false,
    sendEmail: false,
    active: false,
  }
  validates: [] = [];
  constructor(
    private url: URL,
    private clientService: ClientService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.clientService.getById(Number(this.clientId)).subscribe(
      (response: any) => {
        this.client = ClientsTransformer([response])[0];
        this.client.dateBirth = this.client.dateBirth?.slice(0, -9)
        this.client.postalCode = '0',
          this.client.identity = '0'
      }
    );
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
      clientId: 0,
      names: '',
      lastNameFat: '',
      lastNameMot: '',
      gender: '',
      telephone: '',
      email: '',
      province: '',
      dateBirth: '',
      identity: '',
      direction: '',
      city: '',
      postalCode: '',
      infoClinical: '',
      notes: '',
      sendSms: false,
      sendEmail: false,
      active: false,
    };
  }

}

