import { expect } from 'chai';
import express from 'express';
import http from 'http';
import request from 'supertest';
import proxyServer from './server.js';


let targetServer;

describe('Express HTTP Proxy Server', () => {
  before((done) => {
    // Target server to check headers
    const app = express();
    app.get('/', (req, res) => {
      // Verify that the header was added by the proxy
      const addedByProxy = req.headers['x-added-by-proxy'];
      res.status(200).send(`Header added by proxy: ${addedByProxy}`);
    });

    targetServer = http.createServer(app);
    targetServer.listen(9000, done);
  });

  after((done) => {
    targetServer.close(() => {
      proxyServer.close(done);
    });
  });

  it('should add custom header to proxy requests using onProxyReq', (done) => {
    request(proxyServer)
      .get('/api')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Ensure that the header was added by the proxy
        expect(res.text).to.equal(`Header added by proxy: ProxyHeaderValue`);
        done();
      });
  });
});
