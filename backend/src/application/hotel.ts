import { ExpressRequestWithAuth } from "@clerk/express";
import { NextFunction, Response, Request } from "express";
import { createHotelDTO } from "../domain/dtos/hotel";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Hotel from "../infrastructure/schemas/Hotel";
import Booking from "../infrastructure/schemas/Booking";

export const getAllHotels = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
		return;
	} catch (error) {
		next(error);
	}
};

export const getHotelById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotelId = req.params.id;
		const hotel = await Hotel.findById(hotelId);
		if (!hotel) {
			throw new NotFoundError("Hotel not found");
		}
		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};

export const createHotel = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const newHotel = createHotelDTO.safeParse(req.body);

		// add validation here
		if (!newHotel?.success) {
			throw new ValidationError(newHotel?.error?.issues[0].message);
		}
		// const user = req?.auth;
		const user = { userId: "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX" };

		await Hotel.create({
			ownerId: user.userId,
			name: newHotel.data.name,
			location: newHotel.data.location,
			image: newHotel.data.image,
			description: newHotel.data?.description,
			roomTypes: newHotel.data.roomTypes,
			mealPlans: newHotel.data.mealPlans,
			amenities: newHotel.data?.amenities,
			contactInfo: newHotel.data.contactInfo,
		});
		res.status(201).send();
		return;
	} catch (error) {
		next(error);
	}
};

export const deleteHotel = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotelId = req.params.id;
		const hotel = await Hotel.findById(hotelId);

		if (!hotel) {
			throw new NotFoundError("Hotel not found");
		}

		await Hotel.findByIdAndDelete(hotelId);

		res.status(200).send();
		return;
	} catch (error) {
		next(error);
	}
};

export const updateHotel = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotelId = req.params.id;
		// const updatedHotel = req.body;

		const updatedHotel = createHotelDTO.safeParse(req.body);

		// add validation here
		if (!updatedHotel?.success) {
			throw new ValidationError(updatedHotel?.error?.issues[0].message);
		}
		const user = req?.auth;

		await Hotel.findByIdAndUpdate(hotelId, {
			ownerId: user.userId,
			...updatedHotel.data,
		});

		res.status(200).send();
		return;
	} catch (error) {
		next(error);
	}
};

export const getHotelBookings = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		// const userId = req.auth.userId;
		const userId = "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX";
		const hotels = await Hotel.find({ ownerId: userId });

		const hotelsWithBookings = await Promise.all(
			hotels.map(async (hotel) => {
				const bookings = await Booking.find({ hotelId: hotel._id });
				return {
					...hotel.toObject(),
					bookings,
				};
			})
		);

		// Sort hotels by the number of bookings in descending order
		hotelsWithBookings.sort((a, b) => b.bookings.length - a.bookings.length);

		res.status(200).json(hotelsWithBookings);
		return;
	} catch (error) {
		next(error);
	}
};

export const getHotelsByUserId = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.auth.userId;
		const hotels = await Hotel.find({ ownerId: userId });
		res.status(200).json(hotels);
		return;
	} catch (error) {
		next(error);
	}
};
