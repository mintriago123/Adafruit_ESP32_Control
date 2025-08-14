import { Request, Response, NextFunction } from 'express';
import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

export function typeScriptMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req.path.endsWith('.ts')) {
    const filePath = path.join('public', req.path);
    
    if (fs.existsSync(filePath)) {
      try {
        const result = esbuild.transformSync(fs.readFileSync(filePath, 'utf8'), {
          loader: 'ts',
          target: 'es2020',
          format: 'esm',
        });
        
        res.type('application/javascript');
        res.send(result.code);
        return;
      } catch (error) {
        console.error('Error transpiling TypeScript:', error);
        res.status(500).send('Error transpiling TypeScript');
        return;
      }
    }
  }
  
  next();
}
