import { Match, User, Status, Tags } from '@prisma/client';

export interface Bet {
    id: string;
    prediction: string;
    betCoins: number;
    betProfits: number;
    createdAt: Date;
    updatedAt: Date;
    matchId: number;
    match: Match;
    userId: string;
    user: User;
    statusId: number;
    status: Status;
    Tags: Tags[];
}
