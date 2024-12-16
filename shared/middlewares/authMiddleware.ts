import { Request as ExpressRequest, Response, NextFunction } from 'express';

interface RequestI {
    jwt?: any;
    user?: any;
}
interface Request extends ExpressRequest, RequestI { }
interface ParameterI {
    guard?: string;
}

const middleware = (data: ParameterI = { guard: 'web' }) => (req: Request, res: Response, next: NextFunction) => {
    next();
}

export default middleware