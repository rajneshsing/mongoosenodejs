const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
const expect = chai.expect;
const server = require("../server.js");

chai.use(chaiHttp);

const request = chai.request(server).keepOpen();
/* For  Get alll todos*/
describe("GET User list", () => {
  let response;
  
  before(async () => {
    response = await request.get("/api/users");
  });
  it("Should send status code 200", (done) => {
      console.log(response);
      response.should.have.status(200);    
    done();
  });
  it("should send json data ", (done) => {  
    expect(response.body).to.be.an("Object");
    done();
  });
  
});

/* For  Post or create todo*/
  /*describe("Create Add user", () => {
    let response;
    
    before(async () => {
      response = await request.post("/api/adduser").send({
        "taskName": "Task5",
        "taskDescription": "This is very easy task but very very trick full"
    });
    });
    it("Should send status code 201", (done) => {
        response.should.have.status(201);    
      done();
    });
    it("Should return created data ", (done) => {  
      expect(response.body).to.be.an("Object");
      done();
    });
    
  });*/




