// import request from 'supertest';
const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const server = require('../../server.js');
// const { getStorage, Storage } = require('../../models/engine/storage.js');
const { SchoolController } = require('../../controllers/index.js');


describe('SCHOOL ROUTES', async () => {
  let sandbox;

  describe('AddSchool', () => {
    beforeEach(async () => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
  
    it('should return 400 if a name isn\'t given, name is empty and name is invalid', async () => {
      let res;
      let schoolData;

      // name not given
      schoolData = {
        address: 'No. 20, Falkole Street',
        latitude: 6.5131, 
        longitude: 3.3616
      };

      sandbox.stub(SchoolController, 'addSchool').callsFake((res) => {
        res.status(500).json({ message: "We have server error" });
      });

      res = await request(server)
        .post('/api/v1/addSchool')
        .send(schoolData);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', `name is a required field.`);

      // Empty name string is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, name: ""});

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "name is required.");

      // invalid name is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, name: 1234});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "name must be a string.");
    });
  
    it('should return 400 if a address isn\'t given, address is empty and address is invalid', async () => {
      let res;
      let schoolData;

      // address not given
      schoolData = {
        name: "Anglican Nursery and Primary School",
        latitude: 6.5131, 
        longitude: 3.3616
      };

      sandbox.stub(SchoolController, 'addSchool').callsFake((res) => {
        res.status(500).json({ message: "We have server error" });
      });

      res = await request(server)
        .post('/api/v1/addSchool')
        .send(schoolData);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', `address is a required field.`);

      // Empty address string is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, address: ""});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "address is required.");

      // invalid address is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, address: 1234});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "address must be a string.");
    });
  
    it('should return 400 if a latitude isn\'t given, latitude is empty, latitude has invalide decimal length and latitude is invalid', async () => {
      let res;
      let schoolData;

      // latitude not given
      schoolData = {
        name: "Anglican Nursery and Primary School",
        address: 'No. 20, Falkole Street',
        longitude: 3.3616
      };

      sandbox.stub(SchoolController, 'addSchool').callsFake((res) => {
        res.status(500).json({ message: "We have server error" });
      });

      res = await request(server)
        .post('/api/v1/addSchool')
        .send(schoolData);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', `latitude is a required field.`);

      // invalid latitude is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, latitude: "love"});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "latitude must be a number.");

      // invalid latitude is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, latitude: -100.567});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "latitude must be >= -90.");

      // invalid latitude is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, latitude: 100.567});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "latitude must be <= 90.");
    });

    it('should return 400 if a longitude isn\'t given, longitude is empty, longitude has invalide decimal length and longitude is invalid', async () => {
      let res;
      let schoolData;

      // longitude not given
      schoolData = {
        name: "Anglican Nursery and Primary School",
        address: 'No. 20, Falkole Street',
        latitude: 3.3616
      };

      sandbox.stub(SchoolController, 'addSchool').callsFake((res) => {
        res.status(500).json({ message: "We have server error" });
      });

      res = await request(server)
        .post('/api/v1/addSchool')
        .send(schoolData);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', `longitude is a required field.`);

      // invalid longitude is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, longitude: "love"});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "longitude must be a number.");

      // invalid longitude is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, longitude: -500.567});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "longitude must be >= -180.");

      // invalid longitude is passed
      res = await request(server)
      .post('/api/v1/addSchool')
      .send({ ...schoolData, longitude: 500.567});
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "longitude must be <= 180.");
    });

    it('should add a new school', async () => {
      const schoolData = {
        name: "Anglican Nursery and Primary School",
        address: 'No. 20, Falkole Street',
        latitude: 6.5131, 
        longitude: 3.3616
      };

      sandbox.stub(SchoolController, 'addSchool').callsFake((res) => {
        res.status(201).json({ message: "Registration Successful" });
      });
  
      const res = await request(server)
        .post('/api/v1/addSchool')
        .send(schoolData);
  
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', "School created successfully");
    });
  });


  describe('ListSchools', () => {
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
  
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 400 if a latitude isn\'t given, latitude is empty, and latitude is invalid', async () => {
      let res;
      let schoolQuery;

      // latitude not given
      schoolQuery = {
        longitude: 3.3616
      };

      sandbox.stub(SchoolController, 'addSchool').callsFake((res) => {
        res.status(500).json({ message: "We have server error" });
      });

      res = await request(server)
        .get(`/api/v1/listSchools?longitude=${schoolQuery.longitude}`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', `latitude is a required field.`);

      // invalid latitude is passed
      res = await request(server)
        .get(`/api/v1/listSchools?latitude="love"&longitude=${schoolQuery.longitude}`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "latitude must be a number.");

      // invalid latitude is passed
      res = await request(server)
        .get(`/api/v1/listSchools?latitude=-100.567&longitude=${schoolQuery.longitude}`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "latitude must be >= -90.");

      // invalid latitude is passed
      res = await request(server)
        .get(`/api/v1/listSchools?latitude=100.567&longitude=${schoolQuery.latitude}`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "latitude must be <= 90.");
    });

    it('should return 400 if a longitude isn\'t given, longitude is empty, and longitude is invalid', async () => {
      let res;
      let schoolQuery;

      // longitude not given
      schoolQuery = {
        latitude: 3.3616
      };

      sandbox.stub(SchoolController, 'addSchool').callsFake((res) => {
        res.status(500).json({ message: "We have server error" });
      });

      res = await request(server)
        .get(`/api/v1/listSchools?latitude=${schoolQuery.latitude}`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', `longitude is a required field.`);

      // invalid longitude is passed
      res = await request(server)
        .get(`/api/v1/listSchools?latitude=${schoolQuery.latitude}&longitude="love`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "longitude must be a number.");

      // invalid longitude is passed
      res = await request(server)
        .get(`/api/v1/listSchools?latitude=${schoolQuery.latitude}&longitude=-500.628`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "longitude must be >= -180.");

      // invalid longitude is passed
      res = await request(server)
        .get(`/api/v1/listSchools?latitude=${schoolQuery.latitude}&longitude=500.628`);
  
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', "longitude must be <= 180.");
    });

    it('should return schools with the provided user location', async () => {
      const schoolQuery = {
        latitude: 60.513167,
        longitude: 133.361667
      }

      sandbox.stub(SchoolController, 'listSchools').returns([
        {
          "id": "6ee65e42-7a31-43d5-8a58-35d9f70fc1ac",
          "name": "anglican nursery and primary school",
          "address": "off ap filling station, oju elegba, 98 ibidun st, surulere, lagos",
          "latitude": 66.5132,
          "longitude": 136.362,
          "createdAt": "2025-06-06T15:27:00.000Z",
          "updatedAt": "2025-06-06T15:27:00.000Z",
          "distance_km": 683.3669836731532
        },
        {
          "id": "ca1803e6-6dc8-46e6-a168-dd9b871fbe7f",
          "name": "saint jude primary school",
          "address": "off ap filling station, masha, 98 ibidun st, surulere, lagos",
          "latitude": 65.5132,
          "longitude": 135.362,
          "createdAt": "2025-06-06T15:34:39.000Z",
          "updatedAt": "2025-06-06T15:34:39.000Z",
          "distance_km": 564.9933065771924
        }
      ]);

      const res = await request(server)
        .get(`/api/v1/listSchools?latitude=${schoolQuery.latitude}&longitude=${schoolQuery.longitude}`);
      
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('message', 'Schools retrieved successfully');
      expect(res.body).to.have.property('data');
    });
  });
});
