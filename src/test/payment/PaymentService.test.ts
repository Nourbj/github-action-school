import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const mockPayment: PaymentDetails = { amount: 500, currency: 'x', method:PaymentMethod.CreditCard,cardNumber:'123' };
    //TODO: Create moc kProcessPaymentResponse object containing success status and a fake transactiondId
    const MockProcessPaymentResponse ={status: 'success', transactionId: 'txn_1234567890' };
      //TODO: Mock processPayment implementation

      paymentAdapterMock.processPayment.mockImplementation ((status: string ,transactionId: string ) => MockProcessPaymentResponse);
    // Act
    const result = paymentService.makePayment(mockPayment);
    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse

    expect(MockProcessPaymentResponse.status).toEqual('success');
    // Check that processPayment inside makePayment has been called with paymentDetails
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(mockPayment);
  });

  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const mockPayment: PaymentDetails = { amount: 500, currency: 'x', method:PaymentMethod.CreditCard,cardNumber:'123' };

    //TODO: Create mockProcessPaymentResponse object containing failure status
    const MockProcessPaymentResponse ={status: 'failure', transactionId: 'txn_1234567890' };

    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation ((status: string ,transactionId: string ) => MockProcessPaymentResponse);

    // Act & Assert
    expect(() => paymentService.makePayment(mockPayment)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const NegativePaymentDetails: PaymentDetails = { 
      amount: -500, 
      currency: 'USD', 
      method: PaymentMethod.CreditCard, 
      cardNumber: '12345' 
    };

    // Act & Assert
    expect(() => paymentService.makePayment(NegativePaymentDetails)).toThrow('Invalid payment amount');
  });
});
