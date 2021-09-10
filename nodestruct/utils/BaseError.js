class BaseError extends Error {
 constructor (statusCode,msg, data, description) {
 super(description)

 Object.setPrototypeOf(this, new.target.prototype)
 this.statusCode = statusCode
 this.msg = msg
 this.data = data
 Error.captureStackTrace(this)
 }
}

module.exports = BaseError