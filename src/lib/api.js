import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "http://localhost:3000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await window?.Clerk?.session?.getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: `hotels`,
        method: "POST",
        body: hotel,
      }),
    }), // create hotel
    createBooking: builder.mutation({
      query: (booking) => ({
        url: `bookings`,
        method: "POST",
        body: booking,
      }),
    }), // create a new booking
    getHotels: builder.query({
      query: () => `hotels`,
    }), // all hotels
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`,
    }), // hotel by id

    getMyHotels: builder.query({
      query: () => `hotels/user`,
    }), // get own hotels

    getHotelBookings: builder.query({
      query: () => `hotels/bookings`,
    }), // get hotels with it's bookings (hotel owner)

    getBookings: builder.query({
      query: () => `bookings/user`,
    }), // get booking with hotel (client) => mockBookings

    getBookingsWithHotels: builder.query({
      query: () => `bookings/owner`,
    }), // get booking with hotel (owner) => mockBookings
  }),
});

export const {
  useGetHotelsQuery,
  useGetMyHotelsQuery,
  useGetBookingsWithHotelsQuery,
  useGetHotelByIdQuery,
  useGetHotelBookingsQuery,
  useGetBookingsQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
} = api;
