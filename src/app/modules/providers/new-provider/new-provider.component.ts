import { Component, OnInit } from '@angular/core';
import { PaymentDTO } from '../../../core/interfaces/PaymentDTO';
import { ProviderDTO } from '../../../core/interfaces/ProviderDTO';
import { PrefixUrl } from '../../../core/constants/index';
import { fields } from '../../../core/helpers/validateFields';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../core/services/Payment.services';
import { ProviderService } from '../../../core/services/Provider.service';
import { ProviderTransformer } from '../../../core/transformers/ProviderTransformer';
import { PaymentTransformer,PaymentsTransformer } from 'src/app/core/transformers/PaymentTransformer';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.css']

})
export class NewProviderComponent implements OnInit {

  Prefix = PrefixUrl;

  provider: ProviderDTO = {
    name: '',
    telephone: '',
    email: '',
    contactPerson: '',
    notes: '',
  };

  payments: PaymentDTO[] = [];
  providers: ProviderDTO[] = [];
  msgPayment: string = '';
  paymentId: number = 0;
  validates: [] = [];

  constructor(
    private paymentService: PaymentService,
    private providerService: ProviderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  saveProvider() {
    const response: any = fields(this.provider);
    this.msgPayment = this.paymentId == 0 ? 'Field is required' : '';
    this.validates = (!response) ? [] : response;
    if (!response && this.msgPayment === '') {
      this.providerService.save(ProviderTransformer(this.provider)).subscribe(
        (response: any) => {
          this.toastr.success('Provider created successfully');
          this.cleanForm();
        }
      );
    }
  }


  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }

  getPayments() {
    this.paymentService.get().subscribe(
      (response: any) => {
        this.payments = PaymentsTransformer(response);
      }
    );
  }

  selectedFormaPago() {
    this.provider = {
      ...this.provider,
      weyToPay: {
        paymentId: Number(this.paymentId)
      }
    }
  }

  cleanForm() {
    this.provider = {
      name: '',
      telephone: '',
      email: '',
      contactPerson: '',
      notes: '',
    };
    this.paymentId = 0;

  }

}
