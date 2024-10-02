import * as Yup from "yup";

//validations
export const RouteMgrSchema = Yup.object().shape({
  route: Yup.string().required("Route required."),
  start_date_time: Yup.string().required("Start Date Time required."),
  busNo: Yup.string().required("Bus No required."),
});
