const { 
  catchAsync,
  AppError
}               = require('../utils');

function getOne(service) {
  return catchAsync(async (req, res, next) => {
    const { id }  = req.params;
    const doc     = await service.findById(id);
  
    /**
     * 
     * Null or throwing error?
     * 
     */
    
    if (!doc) {
      return next(new AppError('Cannot find a document with this id.', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
}

function createOne(service) {
  return catchAsync(async (req, res) => {
    const { body }  = req;
    const doc       = await service.create(body);
  
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
}

function updateOne(service) {
  return catchAsync(async (req, res, next) => {
    const { body: data }  = req;
    const { id }          = req.params;  
  
    const doc = await service.update(id, data);
  
    if (!doc) {
      return next(new AppError('Cannot find a document with this id.', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
}

function deleteOne(service) {
  return catchAsync(async (req, res, next) => {
    const { id }  = req.params;
    const doc     = await service.delete(id);

    if (!doc) {
      return next(new AppError('Cannot find a document with this id.', 404));
    }
  
    res.status(204).json({
      message: 'success',
      data: null
    });
  });
}

module.exports = {
  getOne,
  createOne,
  updateOne,
  deleteOne
}