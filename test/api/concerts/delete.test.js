const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Department #1', genre: 'rock', price: 25, day: 1, image: 'sth.jpg', freeTickets: 25 });
        await testConOne.save();
      });

    it('/:id should delete chosen document and return success', async () => {
      const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
      const deletedCon = await Concert.findOne({ _id: '5d9f1140f10a81216cfd4408' });
      expect(res.status).to.be.equal(200);
      expect(deletedCon).to.be.null;
    });
    after(async () => {
        await Concert.deleteMany();
    });
});