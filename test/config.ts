import { NodeEnv } from '../enums/config';

process.env.NODE_ENV = NodeEnv.TEST;

// Configure chai-as-promised
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(sinonChai);
