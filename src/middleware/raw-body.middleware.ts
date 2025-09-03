// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class RawBodyMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     let data = Buffer.from('');
//     console.log('data >>', data);
//     req.on('data', (chunk) => {
//       data = Buffer.concat([data, chunk]);
//     });
//     req.on('end', () => {
//       (req as any).rawBody = data; // gắn rawBody vào request
//       next();
//     });
//   }
// }
