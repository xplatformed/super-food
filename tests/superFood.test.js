const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../app');
const { SuperFood } = require('../models/superFood.model');

// create dummy super food data to populate a test database
const superfoods = [
  {
    _id: new ObjectID(),
    name: 'Lemon',
    benefits: 'iron good for red blood cells',
    nutrients: 'Energy 1286 kj 154 kj, Fat 0.9 g',
    treatments: 'reduces inflammation in the body linked to many illnesses',
    price: 15.0
  },
  {
    _id: new ObjectID(),
    name: 'Tumeric',
    benefits: 'iron good for red blood cells',
    nutrients: 'Energy 1286 kj 154 kj, Fat 0.9 g',
    treatments: 'reduces inflammation in the body linked to many illnesses',
    price: 11.99
  }
];

// testing lifecycle method .. in case superfood already exists in test database
beforeEach((done) => {
  SuperFood.deleteMany({})
    .then(() => SuperFood.insertMany(superfoods) // populate test db
    )
    .then(() => done());
});

describe('POST /superfoods', () => {
  it('should create new super food object ', (done) => {
    // data to send in test route
    const name = 'Beets';
    const benefits = 'iron good for red blood cells';
    const nutrients = 'Energy 1286 kj 154 kj, Fat 0.9 g';
    const treatments = 'reduces inflammation in the body linked to many illnesses';
    const price = 15.0;

    request(app)
      .post('/superfoods')
      .send({
        name, benefits, nutrients, treatments, price
      })
      .expect(200)
      .expect((res) => {
        // check what got stored in mongodb collection
        expect(res.body.name).toBe(name);
        expect(res.body.benefits).toBe(benefits);
        expect(res.body.nutrients).toBe(nutrients);
        expect(res.body.treatments).toBe(treatments);
        expect(res.body.price).toBe(price);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SuperFood.find({ name })
          .then((superfood) => {
            expect(superfood.length).toBeGreaterThan(0);
            expect(superfood[0].name).toBe(name);
            expect(superfood[0].benefits).toBe(benefits);
            expect(superfood[0].nutrients).toBe(nutrients);
            expect(superfood[0].treatments).toBe(treatments);
            expect(superfood[0].price).toBe(price);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create super food object with invalid body data', (done) => {
    request(app)
      .post('/superfood')
      .send({})
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SuperFood.find()
          .then((superfoods) => {
            expect(superfoods.length).toBeGreaterThan(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /superfoods', () => {
  it('should return all super food items', (done) => {
    request(app)
      .get('/superfoods')
      .expect(200)
      .expect((res) => {
        expect(res.body.superfoods.length).toBeGreaterThan(0);
      })
      .end(done);
  });
});

describe('GET /superfoods/:id', () => {
  it('should return super food item', (done) => {
    request(app)
      .get(`/superfoods/${superfoods[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.superfood.name).toBe(superfoods[0].name);
        expect(res.body.superfood.benefits).toBe(superfoods[0].benefits);
        expect(res.body.superfood.nutrients).toBe(superfoods[0].nutrients);
        expect(res.body.superfood.treatments).toBe(superfoods[0].treatments);
        expect(res.body.superfood.price).toBe(superfoods[0].price);
      })
      .end(done);
  });

  it('should return 404 if no super food item found', (done) => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/superfoods/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non object ids ', (done) => {
    request(app)
      .get('/superfoods/545')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /superfoods/:id', () => {
  it('should remove a super food item', (done) => {
    const hexId = superfoods[0]._id.toHexString();
    request(app)
      .delete(`/superfoods/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.superfood._id).toBe(hexId); // eslint-disable-line no-underscore-dangle
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        SuperFood.findById(hexId).then((superfood) => {
          expect(superfood).toBeFalsy();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if super food item not found', (done) => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/superfood/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/superfoods/545')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /superfoods/:id', () => {
  it('should update super food item', (done) => {
    const hexId = superfoods[0]._id.toHexString();
    const benefits = 'First super food is now updated with new content';

    request(app)
      .patch(`/superfoods/${hexId}`)
      .send({
        benefits
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.superfood.benefits).toBe(benefits);
      })
      .end(done);
  });

  it('should return 404 if object id not valid', (done) => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .patch(`/superfood/${hexId}`)
      .expect(404)
      .end(done);
  });
//     it('should return 404 if object id is invalid', (done) => {
//         request(app)
//             .delete('/superfoods/545')
//             .expect(404)
//             .end(done);
//     });
});

