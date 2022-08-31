import { Request, Response, NextFunction } from "express";
import joi from "joi";

const bodySchema = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
});

export async function bodyValidation(req: Request, res: Response, next: NextFunction){
    try{
        const validation = bodySchema.validate(req.body);
  
        if (validation.error) {
            res.status(422).send(validation.error.message);
            return;
        }
        
        next();
    }catch(error){
        return res.send(error);
    }
}