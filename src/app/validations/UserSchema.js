import Yup from "yup";

export default Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8),
});
