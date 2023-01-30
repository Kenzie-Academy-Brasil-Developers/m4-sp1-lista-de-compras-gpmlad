
import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            listIndex: {
                index: number,
                itemIndex?: number
            }
        }
    }
}