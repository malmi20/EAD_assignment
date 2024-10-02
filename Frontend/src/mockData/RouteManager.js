export const busDetailsMockData = {
  data: {
    details: [
      {
        _id: "65288ae0bf49fa4c6316801c",
        bus_no: "NB-2035",
        driver_id: "D2035",
        driver_name: "Nimal",
        createdAt: "2023-10-13T00:10:08.965Z",
        updatedAt: "2023-10-13T00:10:08.965Z",
        __v: 0,
      },
      {
        _id: "6528eb43272dda045249b4a8",
        bus_no: "GH-8547",
        driver_id: "H58658",
        driver_name: "kusal",
        createdAt: "2023-10-13T07:01:23.721Z",
        updatedAt: "2023-10-13T07:01:23.721Z",
        __v: 0,
      },
      {
        _id: "6529c1e56a50ddff82bf9e84",
        bus_no: "nb-2037",
        driver_id: "D2049",
        driver_name: "lala",
        createdAt: "2023-10-13T22:17:09.879Z",
        updatedAt: "2023-10-13T22:17:09.879Z",
        __v: 0,
      },
    ],
  },
  status: 200,
};
export const busRoutesMockData = {
  data: {
    details: [
      {
        _id: "6527a4c7bc75b8a42476e8e2",
        route_id: "138",
        from: "Colombo",
        to: "Nugegoda",
      },
      {
        _id: "65281329305b3bf3b4edd287",
        route_id: "100",
        from: "Colombo",
        to: "Negombo",
      },
    ],
  },
  status: 200,
};

export const assignedBusRouteDetailsMockData = {
  data: {
    details: [
      {
        id: "6529424c25228c7d3594ffca",
        busNo: "NB-2035",
        routeId: "138",
        from: "Colombo",
        to: "Nugegoda",
        start_date_time: "2023-10-13T13:12:39.373Z",
        bus_no: {
          _id: "65288ae0bf49fa4c6316801c",
          bus_no: "NB-2035",
        },
        route_id: {
          _id: "6527a4c7bc75b8a42476e8e2",
          route_id: "138",
          from: "Colombo",
          to: "Nugegoda",
        },
      },
      {
        id: "65296a003ca047cfdff7c4ca",
        busNo: "NB-2035",
        routeId: "100",
        from: "Colombo",
        to: "Negombo",
        start_date_time: "2023-10-13T18:30:00.000Z",
        bus_no: {
          _id: "65288ae0bf49fa4c6316801c",
          bus_no: "NB-2035",
        },
        route_id: {
          _id: "65281329305b3bf3b4edd287",
          route_id: "100",
          from: "Colombo",
          to: "Negombo",
        },
      },
    ],
  },
  status: 200,
};

export const saveAssignedBusRouteDetailsMockData = {
  data: {
    message: "Bus Route Details Assigned Successfully.",
    details: {
      bus_no: "65288ae0bf49fa4c6316801c",
      route_id: "65281329305b3bf3b4edd287",
      start_date_time: "2023-10-26T18:30:00.000Z",
      _id: "652a5e38abf777da51e5f5e4",
      __v: 0,
    },
  },
  status: 200,
};

export const updateBusRouteDetailsMockData = {
  data: {
    message: "Bus Route Details Updated Successfully.",
    details: {
      _id: "6529424c25228c7d3594ffca",
      bus_no: "6528eb43272dda045249b4a8",
      route_id: "6527a4c7bc75b8a42476e8e2",
      start_date_time: "2023-10-13T13:12:39.373Z",
      __v: 0,
    },
  },
  status: 200,
};
