import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
  use(req: Request, res: Response, next:NextFunction) {

    const authorization = req.headers.authorization

    console.log('[MIDDLEWARE]: Criando user no requisição.');

    if (authorization){
      req['user'] = {
        token:authorization,
        name: 'FULANO TESTE'
      }
    }

    // if(authorization){
    //   if(authorization === '123456'){
    //     console.log('Token valido');
    //     return next()
    //   }
    //   res.status(401).json({message: 'Token invalido'})
      
    // }

    next()
    
  }
}