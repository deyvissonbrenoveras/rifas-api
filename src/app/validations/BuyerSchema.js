import Yup from "yup";

export default Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  raffleId: Yup.number().positive().required(),
});
