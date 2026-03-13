'use client';

import { Button } from "@/components/shadcn/ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Bet, Choice, Event } from "@/interfaces";
import { PlaceBetDialog } from "../place-bet-dialog/PlaceBetDialog";
import { useState } from "react";
import { Check, X } from "lucide-react";
import cn from 'classnames';

interface Props {
    event: Event,
    selection: Choice,
    finalized: boolean,
    index: number,
    userCoins: number;
    userBet?: Bet | null
    onBetPlaced: (newBet: Bet) => void;
}

export function PlaceBetButton({ event, selection, finalized, index, userCoins, userBet, onBetPlaced }: Props) {
    const eventResult: string | null = finalized ? (event.homeScore.normaltime > event.awayScore.normaltime ? '1' : event.homeScore.normaltime < event.awayScore.normaltime ? '2' : 'X') : null;
    const [open, setOpen] = useState(false);

    const handlePlaceBet = (newBet: Bet) => {
        onBetPlaced(newBet);
        setOpen(false);
    }

    const [numerator, denominator] = selection.fractionalValue.split('/').map(Number);
    const result = ((numerator / denominator) + 1);

    const hasUserBetOnThis = userBet?.prediction.toUpperCase() === selection.name.toUpperCase();
    const isWinningOutcome = finalized && eventResult === selection.name.toUpperCase();
    const isCorrectBet = hasUserBetOnThis && isWinningOutcome;
    const isLosingBet = hasUserBetOnThis && finalized && !isWinningOutcome;

    const buttonClasses = cn(
        'w-full', 'flex', 'justify-start', 'text-lg', 'px-3',
        {
            '!bg-[#2bb792] !text-white': isCorrectBet,
            '!bg-[#f67364] !text-white': isLosingBet,
            '!bg-[#21a4d8] !text-white': hasUserBetOnThis && !finalized,
        }
    );

    const iconClasses = cn(
        'rounded-full', 'overflow-hidden', 'border-2', 'w-7', 'h-7', 'flex', 'justify-center', 'items-center',
        {
            '!bg-[#199570] !text-white': isCorrectBet,
            '!bg-[#cd2222] !text-white': isLosingBet,
            '!bg-[#21a4d8] !text-white': hasUserBetOnThis && !finalized,
        }
    );

    const buttonStyle = {
        paddingTop: '30px',
        paddingBottom: '30px',
        border: isWinningOutcome ? '3px solid #99D15C' : (isLosingBet ? '3px solid #ef4444' : ''),
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button key={index} variant="outline" size={"lg"} disabled={finalized} className={buttonClasses} style={buttonStyle}>
                    <div className="col-span-1 w-full flex justify-between gap-4">
                        <span className="flex justify-start font-raleway-bold w-full">
                            <div className="flex justify-around items-center font-raleway-bold w-10">
                                <span className={iconClasses}>
                                    {isCorrectBet &&
                                        <span className="rounded-full h-7 w-7 border-2 border-[#2bb792] flex justify-center items-center">
                                            <Check size={24} color="#2bb792" />
                                        </span>
                                    }
                                    {isLosingBet &&
                                        <span className="rounded-full h-7 w-7 border-2 border-[#cd2222] flex justify-center items-center">
                                            <X size={24} color="#ffffff" />
                                        </span>
                                    }
                                    {(hasUserBetOnThis && !finalized) &&
                                        <span className="rounded-full h-8 w-8 border-0 bg-[#1b87b3] flex justify-center items-center">
                                            <Check size={24} color="#FFFFFF" />
                                        </span>
                                    }
                                </span>
                            </div>
                            <label className={cn('flex justify-between items-center py-3 px-4 w-full gap-2', { '!text-white': hasUserBetOnThis }, !finalized ? 'cursor-pointer' : '')}>
                                <span>{selection.name === '1' ? event.homeTeam.name : selection.name.toUpperCase() === 'X' ? 'Empate' : event.awayTeam.name}</span>
                                <span>{result.toFixed(2)}</span>
                            </label>
                        </span>
                    </div>
                </Button>
            </DialogTrigger>
            <PlaceBetDialog event={event} selection={selection} userCoins={userCoins} handlePlaceBet={handlePlaceBet} />
        </Dialog>
    );
}
