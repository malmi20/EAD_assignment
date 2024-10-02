import { Request } from "supertest";
import router from "../routes/bus/busRoutes"

const request = require('supertest')


escribe("POST /buses", () => {
    describe("given a bus no, driver id, driver name", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(router).post("/api/buses").send({
          busNo: "bus_no",
          driverID: "driver_id",
          driverName: "driver_name"
        })
        expect(response.statusCode).toBe(200)
      })
      test("should specify json in the content type header", async () => {
        const response = await request(router).post("/api/buses").send({
            busNo: "bus_no",
            driverID: "driver_id",
            driverName: "driver_name"
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
      
    })
  
    describe("when the bus no, driver id and driver name is missing", () => {
      test("should respond with a status code of 400", async () => {
        const bodyData = [
          {busNo: "bus_no"},
          {driverID: "driver_id"},
          {driverName: "driver_name"},
          {}
        ]
        for (const body of bodyData) {
          const response = await request(router).post("/api/buses").send(body)
          expect(response.statusCode).toBe(400)
        }
      })
    })

    describe("when the bus details are correctly fetch", () => {
        test("get bus api", async () => {
            await supertest(router).get('/api/buses').expect(200).then(result => {
                expect(result && result.body && typeof result.body === Object)
            })
        })
    })
  
  })