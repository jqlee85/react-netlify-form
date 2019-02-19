"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var body, msg, notValid, _ref2, status, _msg;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						body = new FormData(this.form);

						if (!this.props.recaptcha) {
							_context.next = 8;
							break;
						}

						if (this.state.recaptchaValue) {
							_context.next = 7;
							break;
						}

						msg = "reCAPTCHA value not set";

						console.error(msg);
						this.props.onError(msg);
						return _context.abrupt("return", this.setState({
							loading: false,
							error: false,
							success: false,
							recaptchaError: true
						}));

					case 7:
						body.append("g-recaptcha-response", this.state.recaptchaValue);

					case 8:

						this.setState({
							loading: true,
							error: false,
							success: false,
							recaptchaError: false
						});

						_context.next = 11;
						return this.props.validate(body);

					case 11:
						notValid = _context.sent;

						if (!notValid) {
							_context.next = 14;
							break;
						}

						return _context.abrupt("return", this.setState({
							loading: false,
							error: true,
							success: false,
							recaptchaError: false
						}));

					case 14:

						this.props.onSubmit(body);

						_context.next = 17;
						return (0, _isomorphicFetch2.default)(this.props.action, {
							method: "POST",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							body: body
						});

					case 17:
						_ref2 = _context.sent;
						status = _ref2.status;

						if (!(status !== 200)) {
							_context.next = 24;
							break;
						}

						_msg = "Status code: " + status;

						console.error(_msg);
						this.props.onError(_msg);
						return _context.abrupt("return", this.setState({
							loading: false,
							error: true,
							success: false,
							recaptchaError: false
						}));

					case 24:
						this.onSuccess(body);

					case 25:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	function process() {
		return _ref.apply(this, arguments);
	}

	return process;
}(); /*global FormData:true*/
/*eslint no-undef: "error"*/