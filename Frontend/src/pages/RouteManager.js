import { Col, Row, Card, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { RouteMgrSchema } from "../schemas/RouteMgrSchema";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { notify } from "../components/custom/ToastMessage";
import { BsSearch } from "react-icons/bs";
import DateTimePicker from "react-datetime-picker";
import Table from "../components/custom/CustomTable";
import { useSort } from "@table-library/react-table-library/sort";
import moment from "moment/moment";
import CustomModal from "../components/custom/CustomModal";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  deleteBusRouteDetails,
  fetchAssignedBusRouteDetails,
  fetchBusDetails,
  fetchBusRoutes,
  saveAssignedBusRouteDetails,
  updateBusRouteDetails,
} from "../services/busService";
import { debounce } from "../utils/index";

function RouteManager() {
  const initialData = {
    route: "",
    start_date_time: "",
    busNo: "",
    from: "",
    to: "",
  };
  const defaultState = "Add";
  const [initialValues, setValues] = useState(initialData);
  const [routeData, setRouteData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [busDetails, setBusDetails] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [currentState, setCurrentState] = useState(defaultState);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const printRef = useRef();

  // Fetch bus details and bus routes
  useEffect(() => {
    const fetchBusDetailsData = async () => {
      try {
        const response = await fetchBusDetails();
        setBusDetails(response.data.details);
      } catch (error) {
        console.error(`error`, error);
      }
    };
    const fetchBusRoutesData = async () => {
      try {
        const response = await fetchBusRoutes();
        setBusRoutes(response.data.details);
      } catch (error) {
        console.error(`error`, error);
      }
    };
    fetchBusDetailsData();
    fetchBusRoutesData();
    getAssignedBusRouteDetails();
  }, []);

  const getAssignedBusRouteDetails = async () => {
    try {
      const response = await fetchAssignedBusRouteDetails();
      setRouteData(response.data.details);
      setTableData(response.data.details);
    } catch (error) {
      console.error(`error`, error);
    }
  };
  // Submit handler
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      let response;
      const payload = {
        bus_no: values.busNo,
        route_id: values.route,
        start_date_time: values.start_date_time,
      };
      setSubmitting(true);
      if (currentState === "Add") {
        response = await saveAssignedBusRouteDetails(payload);
      } else {
        payload.id = values.id;
        response = await updateBusRouteDetails(payload);
      }
      setSubmitting(false);
      resetForm();
      setValues(initialData);
      setCurrentState(defaultState);
      getAssignedBusRouteDetails();
      notify("success", response.data.message);
    } catch (error) {
      commonErrorhandler(error);
      setSubmitting(false);
    }
  };

  // Search handler
  const onSearchHandler = (e) => {
    debounce(
      setTableData(
        e.target.value
          ? routeData.filter(
              (item) =>
                item.routeId.includes(e.target.value) ||
                item.busNo.includes(e.target.value) ||
                item.from.includes(e.target.value) ||
                item.to.includes(e.target.value)
            )
          : routeData
      ),
      500
    );
  };

  // Edit handler
  const onEditHandler = (item) => {
    setValues({
      ...item,
      route: item.route_id._id,
      busNo: item.bus_no._id,
      start_date_time: new Date(item.start_date_time),
    });
    setCurrentState("Update");
  };

  // Delete handler
  const onDeleteHandler = async () => {
    try {
      const response = await deleteBusRouteDetails(selectedItem.id);
      getAssignedBusRouteDetails();
      notify("success", response.data.message);
      setSelectedItem(null);
    } catch (error) {
      commonErrorhandler(error);
    }
  };

  // Common error handler
  const commonErrorhandler = (error) => {
    console.error(`error`, error);
    let errorMessage = "";
    if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = "Something went wrong";
    }
    notify("error", errorMessage);
  };

  // Handle route change
  const handleRouteChange = (routeId, setFieldValue) => {
    const bus = busRoutes.find((item) => item._id === routeId);
    setFieldValue("from", bus.from);
    setFieldValue("to", bus.to);
  };

  //Generate the report of route details
  const handleDownloadPdf = async () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [[
        "Route ID",
        "Bus No",
        "Date Time",
        "From",
        "To"
      ]],
      body: tableData.map(item => [
        item.routeId,
        item.busNo,
        moment(item.start_date_time).format("DD/MM/YYYY - hh:mm A"),
        item.from,
        item.to
      ])
    });
    doc.save(`report-${new Date().getTime()}.pdf`);
  };

  const sort = useSort(
    tableData,
    {},
    {
      sortFns: {
        ROUTE_ID: (array) => array.sort((a, b) => a.routeId - b.routeId),
        BUS_NO: (array) => array.sort((a, b) => a.busNo - b.busNo),
        DATE_TIME: (array) =>
          array.sort(
            (a, b) => Date(a.start_date_time) - Date(b.start_date_time)
          ),
        FROM: (array) => array.sort((a, b) => a.from - b.from),
        TO: (array) => array.sort((a, b) => a.to - b.to),
      },
    }
  );

  const COLUMNS = [
    {
      label: "Route ID",
      renderCell: (item) => item.routeId,
      sort: { sortKey: "ROUTE_ID" },
    },
    {
      label: "Bus No",
      renderCell: (item) => item.busNo,
      sort: { sortKey: "BUS_NO" },
    },
    {
      label: "DATE & TIME",
      renderCell: (item) =>
        moment(item.start_date_time).format("DD/MM/YYYY - hh:mm A"),
      sort: { sortKey: "DATE_TIME" },
    },
    {
      label: "From",
      renderCell: (item) => item.from,
      sort: { sortKey: "FROM" },
    },
    {
      label: "To",
      renderCell: (item) => item.to,
      sort: { sortKey: "TO" },
    },
    {
      label: "Action",
      renderCell: (item) => (
        <>
          <Button
            variant="primary"
            className="me-2"
            size="sm"
            onClick={() => onEditHandler(item)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setShow(true);
              setSelectedItem(item);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <Row className="px-5 pt-4">
      <Card body className="shadow p-3 mb-3 bg-white rounded">
        <Card.Title>
          <u>Routing Management</u>
        </Card.Title>
        <Col md={12}>
          <CustomModal
            setShow={setShow}
            show={show}
            submitBtnVariant="danger"
            submitAction={onDeleteHandler}
            cancelAction={() => setSelectedItem(null)}
          />
          <Formik
            validationSchema={RouteMgrSchema}
            onSubmit={submitHandler}
            initialValues={initialValues}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              handleBlur,
              setFieldValue,
              resetForm,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="route">
                      <Form.Label>Route</Form.Label>
                      <Form.Select
                        name="route"
                        value={values.route}
                        onChange={(e) => {
                          setFieldValue("route", e.target.value);
                          if (!e.target.value) {
                            setFieldValue("from", "");
                            setFieldValue("to", "");
                            return;
                          }
                          handleRouteChange(e.target.value, setFieldValue);
                        }}
                        isInvalid={touched.route && errors.route}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        {busRoutes.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.route_id}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.route}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="busNo">
                      <Form.Label>Bus No</Form.Label>
                      <Form.Select
                        name="busNo"
                        value={values.busNo}
                        onChange={handleChange}
                        isInvalid={touched.busNo && errors.busNo}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        {busDetails.map((item) => (
                          <option key={item.bus_no} value={item._id}>
                            {item.bus_no}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.busNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="start_date_time">
                      <Form.Label>Start Date Time</Form.Label>
                      <DateTimePicker
                        name="start_date_time"
                        id="start_date_time"
                        minDate={new Date()}
                        className={`form-control ${
                          touched.start_date_time &&
                          errors.start_date_time &&
                          `is-invalid`
                        }`}
                        showTimeSelect
                        value={values.start_date_time}
                        onChange={(e) => {
                          setFieldValue("start_date_time", e);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.start_date_time}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row hidden={!values.from}>
                  <Col md={4}>
                    <Form.Group controlId="from">
                      <Form.Label>From</Form.Label>
                      <Form.Control name="from" disabled value={values.from} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="to">
                      <Form.Label>To</Form.Label>
                      <Form.Control name="to" disabled value={values.to} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="d-flex justify-content-start">
                    <Button
                      hidden={
                        !(
                          values.route ||
                          values.busNo ||
                          values.start_date_time
                        )
                      }
                      variant="secondary"
                      type="reset"
                      onClick={() => {
                        setValues(initialData);
                        resetForm();
                        setCurrentState(defaultState);
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {currentState}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
        <hr />
        <Col md={12}>
          <Row className="mt-4 d-flex justify-content-between">
            <Col md={2}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search by Route Id/Bus no"
                  onChange={onSearchHandler}
                />
              </InputGroup>
            </Col>
            <Col md={2} >
              <Button variant="outline-warning" hidden={!tableData.length} onClick={handleDownloadPdf}>
                Download PDF
              </Button>
            </Col>
          </Row>
          <div ref={printRef}>
            <Table nodes={tableData} columns={COLUMNS} sort={sort} />
          </div>
        </Col>
      </Card>
    </Row>
  );
}

export default RouteManager;
