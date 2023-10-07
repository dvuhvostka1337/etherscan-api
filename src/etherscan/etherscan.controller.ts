import { Controller, Get, Query, ParseIntPipe, Res } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';
import { Response } from 'express';

@Controller('etherscan')
export class EtherscanController {
    constructor(private readonly etherscanService: EtherscanService) {}
    @Get('/address')
    async getMostSupplyAddress(
        @Res() res: Response,
        @Query('blocks', new ParseIntPipe({ optional: true })) blocks?: number
    ): Promise<{
        statusCode: number;
        error?: string;
        message?: string;
        data?: {
            address: string;
        };
    }> {
        try {
            if (!blocks) blocks = 100;
            const address = await this.etherscanService.getMostSupplyAddress(blocks);
            return res.json({
                statusCode: res.statusCode,
                data: { address }
            });
        } catch (error) {
            res.status(500);
            return res.json({
                statusCode: res.statusCode,
                error: 'Internal error',
                message: error.message
            });
        }
    }
}
