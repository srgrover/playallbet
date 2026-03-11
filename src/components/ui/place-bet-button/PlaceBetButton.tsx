
'use client';

import { Button } from "@/components/shadcn/ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Bet, Choice, Event } from "@/interfaces";
import { Check } from "lucide-react";
import { PlaceBetDialog } from "../place-bet-dialog/PlaceBetDialog";
import { useEffect, useState } from "react";

interface Props {
    event: Event,
    selection: Choice,
    finalized: boolean,
    index: number,
    userCoins: number;
    userBet?: Bet | null
    onBetPlaced: (newBet: Bet) => void; // Add this line
}

export function PlaceBetButton({ event, selection, finalized, index, userCoins, userBet, onBetPlaced }: Props) {
    const eventResult: string | null = finalized ? event.homeScore.display > event.awayScore.display ? '1' : event.homeScore.display < event.awayScore.display ? '2' : 'X' : null;
    const [open, setOpen] = useState(false);

    console.log({ userBet })

    const handlePlaceBet = (newBet: Bet) => {
        onBetPlaced(newBet); // Call the handler from the parent
        setOpen(false);
    }

    const [numerator, denominator] = selection.fractionalValue.split('/').map(Number);
    const result = ((numerator / denominator) + 1);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button key={index} variant="outline" size={"lg"} disabled={finalized} className={`w-full flex justify-start
                    ${eventResult && eventResult === selection.name.toUpperCase() ? '!text-green-500' : ''}
                    ${userBet && userBet.prediction.toUpperCase() === selection.name.toUpperCase() ? '!bg-[#21a4d8] !text-white' : ''}
                    ${userBet && userBet.prediction.toUpperCase() === selection.name.toUpperCase() && finalized && userBet.prediction === eventResult ? 'bg-green-500! text-white!' : ''}
                    `}
                    style={{ paddingTop: '30px', paddingBottom: '30px', 
                    border: `${eventResult && eventResult === selection.name.toUpperCase() ? '3px solid #99D15C' : ''}`,
                    color: `${userBet && userBet.prediction.toUpperCase() === selection.name.toUpperCase() ? '#ffffff !important' : 'initial'}` }}>
                    <div className={`col-span-1 w-full flex justify-between gap-4 text-lg `}>
                        <span className="flex justify-start font-raleway-bold text-gray-500 w-full">
                            <div className="flex justify-around items-center font-raleway-bold text-gray-500 w-10">
                                <span className="rounded-full overflow-hidden border-2 w-7 h-7 border-gray-200 flex justify-center items-center">
                                    {
                                        (eventResult && eventResult === selection.name.toUpperCase()) &&
                                        <span className="rounded-full h-7 w-7 border-2 border-[#99D15C] flex justify-center items-center">
                                            <Check size={24} color="#99D15C" />
                                        </span>
                                    }

                                    {
                                        (userBet) && (userBet?.prediction.toUpperCase() === selection.name.toUpperCase()) &&
                                        <span className="rounded-full h-8 w-8 border-0 bg-[#1b87b3] flex justify-center items-center">
                                            <Check size={24} color="#FFFFFF" />
                                        </span>
                                    }
                                </span>
                            </div>
                            <label className={`flex justify-between items-center py-3 px-4 w-full gap-2 ${userBet && (userBet?.prediction.toUpperCase() === selection.name.toUpperCase()) ? '!text-white' : ''} ${!finalized ? 'cursor-pointer' : ''}`}>
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
