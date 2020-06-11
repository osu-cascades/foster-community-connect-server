export class DonationForm {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public description: string,
        readonly form_type: string
      ) {  }
}
