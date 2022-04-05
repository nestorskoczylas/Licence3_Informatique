const createError = require('http-errors');
const url = require('url');

// catch 404 and forward to error handler
const notFound =
  (req, res, next) => {
    next(createError(404));
  };


// error handler
const handleError =
  (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { error : err, url : req.url } );
  };

module.exports.notFound = notFound;
module.exports.handleError = handleError;
