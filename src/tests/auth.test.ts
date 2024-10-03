import { expect } from 'chai';
import sinon from 'sinon';
import * as authService from '../service/auth';
import { login } from '../controller/auth';
import httpStatusCodes from 'http-status-codes';

import { Request } from '../interface/request';
import { Response, NextFunction} from 'express';


describe('Auth Controller - login', () => {
    let req:Request, res:Response, next:NextFunction;

    beforeEach(() => {
        req = { body: { username: 'test', password: 'password' } };
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    // it('should return 200 and user data when login is successful', async () => {
        const userData = { id: 1, username: 'test' };
        sinon.stub(authService, 'login').resolves(userData);

        await login(req, res, next);

        expect(res.status).to.have.been.calledWith(httpStatusCodes.OK);
        expect(res.json).to.have.been.calledWith(userData);
    });

    it('should call next with an error when login fails', async () => {
        const error = new Error('Login failed');
        sinon.stub(authService, 'login').rejects(error);

        await login(req, res, next);

        expect(next).to.have.been.calledWith(error);
    });

    it('should return 400 when username is missing', async () => {
        req.body.username = undefined;
        sinon.stub(authService, 'login');

        await login(req, res, next);

        expect(res.status).to.have.been.calledWith(httpStatusCodes.BAD_REQUEST);
        expect(res.json).to.have.been.calledWith({ message: 'Username is required' });
    });

    it('should return 400 when password is missing', async () => {
        req.body.password = undefined;
        sinon.stub(authService, 'login');

        await login(req, res, next);

        expect(res.status).to.have.been.calledWith(httpStatusCodes.BAD_REQUEST);
        expect(res.json).to.have.been.calledWith({ message: 'Password is required' });
    });

    it('should return 401 when login credentials are invalid', async () => {
        sinon.stub(authService, 'login').resolves(null); // Simulate invalid credentials

        await login(req, res, next);

        expect(res.status).to.have.been.calledWith(httpStatusCodes.UNAUTHORIZED);
        expect(res.json).to.have.been.calledWith({ message: 'Invalid credentials' });
    });

    it('should handle unexpected errors from the auth service', async () => {
        const error = new Error('Unexpected error');
        sinon.stub(authService, 'login').rejects(error);

        await login(req, res, next);

        expect(next).to.have.been.calledWith(error);
    });

    it('should return 500 when the auth service throws a server error', async () => {
        const error = new Error('Internal Server Error');
        sinon.stub(authService, 'login').rejects(error);

        await login(req, res, next);

        expect(next).to.have.been.calledWith(error);
    });
});
