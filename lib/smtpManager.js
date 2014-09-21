'use strict';

var MODULE_NAME = 'smtpManager';
var logger = require('log4js').getLogger(MODULE_NAME);
var conf = require('nconf');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


// Public functions ///////////////////////////////////////

module.exports.getConnection = function (username, password) {
	let options = {
		port: conf.get('smtp:port') || 25,
		host: conf.get('smtp:host') || 'localhost',
		secure: conf.get('smtp:secure') || false,
		auth: {
			user: username,
			pass: password
		},
		ignoreTLS: conf.get('smtp:ignoreTLS') || true,
		name: conf.get('smtp:host') || 'localhost',
		debug: true,
		authMethod: conf.get('smtp:authMethod') || 'PLAIN'

	};

	logger.debug('Create SMTP connection for username#' + username + ' with options (' + options + ')');
	return nodemailer.createTransport(smtpTransport(options));
};