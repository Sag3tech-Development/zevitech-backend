export const FormStep01PrepareUserData = (body: any) => {
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    state: body.state,
    city: body.city,
    address: body.address,
    zipCode: body.zipCode,
    emailAddress: body.emailAddress,
    phoneNumber: body.phoneNumber,
    landlineNumber: body.landlineNumber || null,
    preferredContactTime: body.preferredContactTime || null,
  };
};
