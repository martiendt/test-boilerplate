# Express API Boilerplate

## Overview

This is a boilerplate application for building REST APIs in Node.js using ES6 and Express. Helps you stay productive by following best practices.

## Features
- **Authentication & Authorization** using [Passport](http://www.passportjs.org/)
- **Code Linting** using [ESLint](http://eslint.org) and [Prettier](https://prettier.io/)
- **Compression** Using gzip compression with [Compression](https://github.com/expressjs/compression)
- **CORS** Cross-Origin Resource-Sharing enabled using [Cors](https://github.com/expressjs/cors)
- **Environment Variable** using [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)
- **Logging** using [Winston](https://github.com/winstonjs/winston) and [winston-daily-rotate-file
](https://www.npmjs.com/package/winston-daily-rotate-file)
- **Mail Delivery** using [NodeMailer](...)
- **NoSQL Database** using  [MongoDB](https://www.mongodb.com/)
- **Process Manager (development)** using [Nodemon](https://github.com/remy/nodemon)
- **Process Manager (production)** using [PM2](https://pm2.keymetrics.io/)
- **Secure HTTP Headers** using [Helmet](https://github.com/helmetjs/helmet)
- **Testing** using [Jest](https://jestjs.io/) [Supertest](https://www.npmjs.com/package/supertest) 
- **Validation** using [ValidatorJS](https://github.com/mikeerickson/validatorjs)
- **Rate Limitter** using [...](...)

- Auth Database (Refresh Token, Revoke)
- Server Auth
- Cron
- Cache
- Socketio, Redis
- Storage AWS s3 (Upload, Download, Stream, Delete)
- Image Processing
- Notification (Email / Wa / SMS)
- Import Export Excel
- Telescope
- Localization

## Getting Started

### Installation

### Quick Start

### Testing Email
When building complex applications then sooner or later you end up in a situation where you need to send emails from your application in test environment but do not want to accidentally spam anyone.

One solution would be to separate development email addresses and use only some specific testing address to send all mail to but a better approach would be to use a separate email catching service that accepts all messages like a normal transactional SMTP service would but instead of delivering these to destination, it only logs these messages.

There are several options for using such a service, Nodemailer has built-in support for Ethereal Email. You can create new testing account on the fly by using the createTestAccount method or from the Ethereal homepage.

Reference Links: 
https://nodemailer.com/smtp/testing/
https://ethereal.email/