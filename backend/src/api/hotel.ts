import express from "express";
import {
	getAllHotels,
	getHotelById,
	createHotel,
	deleteHotel,
	updateHotel,
	getHotelBookings,
	getHotelsByUserId,
} from "../application/hotel";
import { isAuthenticated } from "./middlewares/authentication-middleware";
import { isAdmin } from "./middlewares/authorization-middleware";

const hotelsRouter = express.Router();

hotelsRouter.route("/").get(getAllHotels).post(createHotel);
hotelsRouter.route("/bookings").get(getHotelBookings);
hotelsRouter.route("/user").get(getHotelsByUserId);
hotelsRouter
	.route("/:id")
	.get(getHotelById)
	.delete(deleteHotel)
	.put(updateHotel);


export default hotelsRouter;
