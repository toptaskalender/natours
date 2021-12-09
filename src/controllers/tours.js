const { tourService } = require('../services');
const { 
  createOne,
  updateOne,
  deleteOne 
}                     = require('./base');
const {
  APIFeatures,
  catchAsync,
  AppError
}                     = require('../utils');

const getTours = catchAsync(async (req, res) => {
  const { query } = req;
  const features  = new APIFeatures(query);

  const filterBy        = features.filter();
  const sortBy          = features.sort();
  const fields          = features.createFields();
  const { skip, limit } = features.paginate();

  const tours = await tourService.find(filterBy, sortBy, fields, skip, limit);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

const getTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const tour = await tourService.findById(id);

  if (!tour) {
    return next(new AppError('Cannot find a tour with this id.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

const createTour = createOne(tourService);

const updateTour = updateOne(tourService);

const deleteTour = deleteOne(tourService);

const getToursStats = catchAsync(async (_, res) => {
  const stats = await tourService.getToursStats();

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

const getToursStatsMonthlyPerYear = catchAsync(async (req, res) => {
  const { year }  = req.params;
  const stats     = await tourService.getMonthlyStatsPerYear(year);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getToursStats,
  getToursStatsMonthlyPerYear
}