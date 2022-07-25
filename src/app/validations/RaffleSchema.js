import Yup from "yup";

export default Yup.object({
  title: Yup.string().max(100).required(),
  description: Yup.string().max(200).required(),
  quotaExpirationInDays: Yup.date().required(),
  quotaPrice: Yup.number().required(),
  categoryId: Yup.number().integer().required(),
  quotaQuantity: Yup.number().integer().positive(),
  allowedQuotasPerPurchase: Yup.number().integer().positive(),
  firstImageId: Yup.number().integer(),
  secondImageId: Yup.number().integer(),
  thirdImageId: Yup.number().integer(),
});
