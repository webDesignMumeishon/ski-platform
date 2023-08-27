process.env.DATABASE_URL = 'postgres://postgres@localhost:5432/ski';
process.env.NODE_ENV = 'test';
process.env.TEST_SUITE = 'unit';

// Configure chai-as-promised
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(sinonChai);
