import express from "express";
import {
	createBooking,
	deleteBooking,
	getAllBookings,
	getAllBookingsForHotelId,
	getAllBookingsForUserId,
	getBookingById,
	getBookingsForOwnerId,
} from "../application/booking";
import { isAuthenticated } from "./middlewares/authentication-middleware";

const bookingRouter = express.Router();

bookingRouter
	.route("/")
	.post(isAuthenticated, createBooking)
	.get(getAllBookings);

bookingRouter.route("/user").get(getAllBookingsForUserId);

bookingRouter.route("/owner").get(getBookingsForOwnerId);

bookingRouter.route("/:id").get(getBookingById).delete(deleteBooking);

bookingRouter.route("/hotels/:hotelId").get(getAllBookingsForHotelId);

// Add the new route here

export default bookingRouter;
