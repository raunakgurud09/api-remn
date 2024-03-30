import {AnySchema} from "yup"
import { NextFunction, Request, Response } from "express";


const validateRequest = (schema:AnySchema) => async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        await schema.validate({
            body:req.body,
            query:req.query,
            params:req.params
        })
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

export default validateRequest