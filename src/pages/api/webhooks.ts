import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log('evento recebido')
	console.log(req)
	console.log(res)

	res.status(200).json({ ok: true })
}
