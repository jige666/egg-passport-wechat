'use strict';

const debug = require('debug')('egg-passport-wechat');
const assert = require('assert');
const WechatStrategy = require('passport-weixin');

module.exports = app => {
  const config = app.config.passportWechat;
  config.passReqToCallback = true;
  assert(config.clientID, '[egg-passport-wechat] config.passportWechat.clientID required');
  assert(config.clientSecret, '[egg-passport-wechat] config.passportWechat.clientSecret required');

  // must require `req` params
  app.passport.use(
    'wechat',
    new WechatStrategy(
      config,
      (req, token, tokenSecret, params, profile, done) => {
        // format user
        const user = profile._json
        user.provider = 'wechat'
        debug('%s %s get user: %j', req.method, req.url, user);

        // let passport do verify and call verify hook
        app.passport.doVerify(req, user, done);
      }
    )
  );
};
