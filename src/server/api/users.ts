import * as express from "express";
import { requiresAuth } from "express-openid-connect";

export const register = (app: express.Application) => {
    app.get('/profile', requiresAuth(), (req, res) => {
        res.send(JSON.stringify(req.oidc.user));
    });
};