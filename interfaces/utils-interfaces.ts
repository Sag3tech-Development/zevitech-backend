export interface EmailOptionsInteface {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}
