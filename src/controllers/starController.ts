import * as starServices from "../services/starService.js";
import { Request, Response } from "express";

export async function postBattle(req: Request, res: Response){
    try{
        const firstUser: string = req.body.firstUser;
        const secondUser: string = req.body.secondUser;
        
        const battleResult = await starServices.battleResult(firstUser, secondUser);
        console.log(battleResult)
        return res.status(200).send(battleResult);
    }catch(error){
        return res.send(error);
    }
}