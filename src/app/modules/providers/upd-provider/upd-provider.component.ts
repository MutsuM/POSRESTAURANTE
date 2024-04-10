import { Component, OnInit } from '@angular/core';
import { URL } from '../../../core/helpers/url';
import { PrefixUrl } from '../../../core/constants/index';
import { fields } from '../../../core/helpers/validateFields';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../../../core/services/Provider.service';
import { ProviderDTO } from '../../../core/interfaces/ProviderDTO';
import { PaymentDTO } from '../../../core/interfaces/PaymentDTO'
import { PaymentService } from '../../../core/services/Payment.services';
import { ProviderTransformer, ProvidersTransformer } from '../../../core/transformers/ProviderTransformer';
import { PaymentTransformer, PaymentsTransformer } from 'src/app/core/transformers/PaymentTransformer';
@Component({
  selector: 'app-upd-provider',
  templateUrl: './upd-provider.component.html',
  styleUrls: ['./upd-provider.component.css']
})
export class UpdProviderComponent implements OnInit {

  Prefix = PrefixUrl;



  payments: PaymentDTO[] = [];
  providers: ProviderDTO = { name: '', telephone: '', email: '', contactPerson: '', notes: '', };
  msgPayment: string = '';
  paymentId: any = 0;
  validates: [] = [];

  providerId: string = this.url.latestUrl();

  constructor(
    private url: URL,
    private providerService: ProviderService,
    private paymentService: PaymentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProvider();
    this.getPayments();
  }

  getProvider() {
    this.providerService.getById(Number(this.providerId)).subscribe(
      (response: any) => {
        this.providers = ProvidersTransformer([response])[0];
        this.paymentId = this.providers.weyToPay?.paymentId;
      }
    );
  }

  getPayments() {
    this.paymentService.get().subscribe(
      (response: any) => {
        this.payments = PaymentsTransformer(response);
      }
    );
  }

  saveProvider() {
    const response: any = fields(this.providers);
    this.msgPayment = this.paymentId == 0 ? 'Field is required' : '';
    this.validates = (!response) ? [] : response;
    if (!response && this.msgPayment === '') {
      this.providerService.save(ProviderTransformer(this.providers)).subscribe(
        (response: any) => {
          this.toastr.success('Provider update successfully');
          this.cleanForm();
        }
      );
    }
  }

  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }


  selectedFormaPago() {
    this.providers = {
      ...this.providers,
      weyToPay: {
        paymentId: Number(this.paymentId)
      }
    }
  }

  cleanForm() {
    this.providers = {
      name: '',
      telephone: '',
      email: '',
      contactPerson: '',
      notes: '',
    };
    this.paymentId = 0;
  }

}
