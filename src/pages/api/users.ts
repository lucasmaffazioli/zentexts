import { NextApiRequest, NextApiResponse } from "next"

// eslint-disable-next-line import/no-anonymous-default-export
export default (request:NextApiRequest, response:NextApiResponse) => {
	const users = [
		{id:1, name: 'Lucas'},
		{id:2, name: 'Daniel'},
		{id:3, name: 'Débora'},
	]
	
	return response.json(users)
}