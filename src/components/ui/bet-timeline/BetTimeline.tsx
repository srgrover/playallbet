import { Ghost } from "lucide-react"

import {
    Timeline,
    TimelineBody,
    TimelineHeader,
    TimelineIcon,
    TimelineItem,
    TimelineSeparator,
    EmptyComponent,
    Button,
    Card,
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components"
import { Bet } from "@/interfaces";
import { getEventTimestampFormat } from "@/app/utils";

interface Props {
    userBets: Bet[];
}

export async function TimelineWithIcon({ userBets }: Props) {
    if (!userBets || userBets.length === 0) {
        return (
            <EmptyComponent
                title={'No activity yet'}
                description={'Be the first to place a bet!'}
                icon={<Ghost size={24} />}
                action={<Button variant="secondary" size="sm">Start to bet</Button>}
            />
        );
    };

    return (
        <Timeline color="secondary" orientation="vertical">
            {
                userBets.map(bet => {
                    const homeTeam = bet.match.homeTeam;
                    const awayTeam = bet.match.awayTeam;

                    return (
                        <TimelineItem key={bet.id}>
                            <TimelineHeader>
                                <TimelineSeparator />
                                <TimelineIcon>
                                    <Ghost className="h-4 w-4" />
                                </TimelineIcon>
                                <span className="text-xs">
                                    {bet.createdAt.toDateString()}
                                </span>
                            </TimelineHeader>
                            <TimelineBody className="-translate-y-1.5 ml-4 pl-4">
                                <Card className="mt-2 p-4">
                                    <div className="flex justify-start gap-3 items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">{homeTeam?.name}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">-</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">{awayTeam?.name}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm">Bet for: <span className="font-bold">{bet.prediction === '1' ? homeTeam?.name : bet.prediction === '2' ? awayTeam?.name : 'Draw'}</span></p>
                                        <p className="text-sm">Bet amount: <span className="font-bold">{bet.betCoins}</span> coins</p>
                                    </div>
                                </Card>
                            </TimelineBody>
                        </TimelineItem>
                    )
                })
            }
        </Timeline>
    )
}
