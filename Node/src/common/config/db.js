'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mongo',
  adapter: {
    mongo: {
      host: 'localhost',
      port: '27017',
      database: 'blog',
      user: 'root',
      password: 'root',
      prefix: '',
      encoding: 'utf8'
    }
  }
};