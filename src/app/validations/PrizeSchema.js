import Yup from "yup";

export default Yup.object({
  name: Yup.string().max(100).required(),
});
