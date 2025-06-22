import { Request, Response } from "express";

export const unknownRouteHandler = (req: Request, res: Response) => {
    res.status(404).json({
        message: 'Validation failed',
        success: false,
        error: {
            name: 'ValidationError',
            errors: {
                path: {
                    message: `The route ${req.originalUrl} does not exist on this server.`,
                    name: 'PathError',
                    properties: {
                        message: `The route ${req.originalUrl} does not exist on this server.`,
                        type: 'not_found',
                    },
                    kind: 'not_found',
                    path: req.originalUrl,
                    value: null
                }
            }
        }
    });
};