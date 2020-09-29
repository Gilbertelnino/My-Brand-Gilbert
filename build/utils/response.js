"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onError = exports.onSuccess = void 0;

var onSuccess = function onSuccess(res, status, message, data) {
  return res.status(status).json({
    status: status,
    message: message,
    data: data
  });
};

exports.onSuccess = onSuccess;

var onError = function onError(res, status, error) {
  return res.status(status).json({
    status: status,
    error: error
  });
};

exports.onError = onError;
//# sourceMappingURL=response.js.map