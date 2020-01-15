import * as sinon from "sinon";
import * as faker from "faker";
// @ts-ignore
import http from "http";
import {expect} from "chai";
import {Server} from "../server";

const sandbox = sinon.createSandbox();
let server: Server;

describe('[instance.ts]', () => {
  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it('should create new Server', () => {
    // Arrange
    const handler = sandbox.spy();
    const server = new Server(handler);

    // Assert
    expect(server).to.be.instanceOf(Server);
  });

  it('should create a http instance with default options', () => {
    // Arrange
    const handler = sandbox.spy() as any;
    const stub = sandbox.stub(http, 'createServer');

    // Act
    new Server(handler);

    // Assert
    expect(stub.calledWithExactly(handler)).to.eq(true);
  });

  it('should start listening on provided port', () => {
    // Arrange
    const handler = sandbox.spy();
    const server = new Server(handler);
    const stub = sandbox.stub(server.instance, 'listen');

    // Act
    server.listen();

    // Assert
    expect(stub.calledWithExactly(8000, undefined)).to.eq(true);
  });

  it('should start listening on provided port and callback', () => {
    // Arrange
    const handler = sandbox.spy();
    const cb = sandbox.stub();
    const server = new Server(handler);
    const stub = sandbox.stub(server.instance, 'listen');

    // Act
    server.listen(cb);

    // Assert
    expect(stub.calledWithExactly(8000, cb)).to.eq(true);
  });

  it('should start listening on provided port, callback and hostname', () => {
    // Arrange
    const handler = sandbox.spy();
    const cb = sandbox.stub();
    const hostname = faker.random.word();
    const server = new Server(handler, {
      hostname
    });
    const stub = sandbox.stub(server.instance as any, 'listen');

    // Act
    server.listen(cb);

    // Assert
    expect(stub.calledWithExactly(8000, hostname, cb)).to.eq(true);
  });
});
